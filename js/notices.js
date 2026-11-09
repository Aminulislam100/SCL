// =====================================
// FIREBASE NOTICES
// =====================================

function displayNotices() {
    const container = document.getElementById("noticeContainer");
    const latestContainer = document.getElementById("latestNotices");

    if (!container && !latestContainer) return;

    db.collection("notices").onSnapshot(snapshot => {
        const notices = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        notices.sort((a, b) => {
            const timeA = a.createdAt?.toMillis?.() || 0;
            const timeB = b.createdAt?.toMillis?.() || 0;
            return timeB - timeA;
        });

        if (container) {
            container.innerHTML = "";

            if (notices.length === 0) {
                container.innerHTML =
                    '<p class="text-center py-8">No notices available.</p>';
            } else {
                notices.forEach(notice => {
                    const card = document.createElement("div");
                    card.className = "card bg-base-100 shadow-md p-5 mb-4";

                    const title = document.createElement("h3");
                    title.className = "font-bold text-xl";
                    title.textContent = notice.title || "";

                    const text = document.createElement("p");
                    text.className = "mt-2";
                    text.textContent = notice.text || "";

                    const date = document.createElement("small");
                    date.className = "mt-3 text-gray-500";
                    date.textContent = notice.date || "";

                    card.append(title, text, date);
                    container.appendChild(card);
                });
            }
        }

        if (latestContainer) {
            latestContainer.innerHTML = "";

            notices.slice(0, 3).forEach(notice => {
                const card = document.createElement("div");
                card.className = "card bg-base-100 shadow-md p-4 mb-3";

                const title = document.createElement("h3");
                title.className = "font-bold";
                title.textContent = notice.title || "";

                const text = document.createElement("p");
                text.className = "mt-2";
                text.textContent = notice.text || "";

                const date = document.createElement("small");
                date.className = "text-gray-500 mt-2";
                date.textContent = notice.date || "";

                card.append(title, text, date);
                latestContainer.appendChild(card);
            });
        }

    }, error => {
        console.error("Notice loading error:", error);

        if (container) {
            container.textContent = "Unable to load notices.";
        }
    });
}

displayNotices();