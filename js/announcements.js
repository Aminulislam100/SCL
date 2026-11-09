// ============================================================
// ANNOUNCEMENTS.JS - PUBLIC FIREBASE VERSION
// ============================================================

let publicAnnouncementUnsubscribe = null;


function loadPublicAnnouncements() {

    const containers = [

        document.getElementById("announcementContainer"),
        document.getElementById("latestAnnouncements")

    ].filter(Boolean);

    if (!containers.length) return;

    containers.forEach(container => {
        container.textContent = "Loading announcements...";
    });

    if (publicAnnouncementUnsubscribe) {
        publicAnnouncementUnsubscribe();
    }

    publicAnnouncementUnsubscribe =
        db.collection("announcements").onSnapshot(

            snapshot => {

                const announcements = [];

                snapshot.forEach(doc => {

                    announcements.push({
                        id: doc.id,
                        ...doc.data()
                    });

                });

                announcements.sort((a, b) => {

                    const timeA = a.createdAt?.toMillis?.() || 0;
                    const timeB = b.createdAt?.toMillis?.() || 0;

                    return timeB - timeA;

                });

                containers.forEach(container => {

                    container.innerHTML = "";

                    if (announcements.length === 0) {

                        container.textContent =
                            "No announcements available.";

                        return;
                    }

                    announcements.forEach(item => {

                        const card = document.createElement("div");

                        card.className =
                            "card bg-base-100 shadow-xl mb-4";

                        const body = document.createElement("div");
                        body.className = "card-body";

                        const title = document.createElement("h2");
                        title.className = "card-title";
                        title.textContent =
                            item.title || "Announcement";

                        const description =
                            document.createElement("p");

                        description.textContent = item.text || "";

                        const date = document.createElement("small");
                        date.textContent = item.date || "";

                        body.append(title, description, date);

                        card.appendChild(body);

                        container.appendChild(card);

                    });

                });

            },

            error => {

                console.error(
                    "Public announcements error:",
                    error
                );

                containers.forEach(container => {

                    container.textContent =
                        "Unable to load announcements. Please try again later.";

                });

            }

        );
}


// ============================================================
// INITIAL LOAD
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    loadPublicAnnouncements();

});