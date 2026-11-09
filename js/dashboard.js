
// ============================================================
// DASHBOARD.JS
// NOTICES + ANNOUNCEMENTS + EVENTS: FIREBASE FIRESTORE
// ============================================================

let firebaseNotices = [];
let firebaseAnnouncements = [];
let firebaseEvents = [];

let noticeUnsubscribe = null;
let announcementUnsubscribe = null;
let eventUnsubscribe = null;


// ============================================================
// SECTION SWITCHING
// ============================================================

function showSection(section) {
    const sections = [
        "noticeSection",
        "announcementSection",
        "eventSection"
    ];

    sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.classList.add("hidden");
    });

    const selected = document.getElementById(section);
    if (selected) selected.classList.remove("hidden");

    const tabs = document.querySelectorAll(".tabs .tab");

    tabs.forEach(tab => tab.classList.remove("tab-active"));

    const sectionMap = {
        noticeSection: 0,
        announcementSection: 1,
        eventSection: 2
    };

    const index = sectionMap[section];

    if (index !== undefined && tabs[index]) {
        tabs[index].classList.add("tab-active");
    }

    const drawer = document.getElementById("admin-drawer");
    if (drawer) drawer.checked = false;
}


// ============================================================
// ADMIN LOGIN CHECK
// ============================================================

function checkAdminLogin() {
    if (!auth.currentUser) {
        alert("Admin login required. Please log in again.");
        window.location.href = "admin.html";
        return false;
    }

    return true;
}


// ============================================================
// SORTING
// ============================================================

function sortNewestFirst(items) {
    return items.sort((a, b) => {
        const timeA = a.createdAt?.toMillis?.() || 0;
        const timeB = b.createdAt?.toMillis?.() || 0;

        return timeB - timeA;
    });
}


// ============================================================
// NOTICES - FIREBASE
// ============================================================

async function addNotice() {
    const titleElement = document.getElementById("noticeTitle");
    const textElement = document.getElementById("noticeText");

    if (!titleElement || !textElement) return;

    const title = titleElement.value.trim();
    const text = textElement.value.trim();

    if (!title || !text) {
        alert("Please enter both notice title and details.");
        return;
    }

    if (!checkAdminLogin()) return;

    try {
        await db.collection("notices").add({
            title: title,
            text: text,
            date: new Date().toLocaleDateString(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        titleElement.value = "";
        textElement.value = "";

        alert("Notice published successfully!");

    } catch (error) {
        console.error("Firebase notice error:", error);
        alert("Notice could not be published: " + error.message);
    }
}


function loadNotices() {
    const box = document.getElementById("adminNotices");

    if (!box) return;

    box.textContent = "Loading notices...";

    if (noticeUnsubscribe) {
        noticeUnsubscribe();
    }

    noticeUnsubscribe = db.collection("notices").onSnapshot(
        snapshot => {
            firebaseNotices = [];

            snapshot.forEach(doc => {
                firebaseNotices.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            sortNewestFirst(firebaseNotices);

            renderAdminNotices();
            updateCounts();
        },

        error => {
            console.error("Firebase notice loading error:", error);
            box.textContent = "Could not load notices: " + error.message;
        }
    );
}


function renderAdminNotices() {
    const box = document.getElementById("adminNotices");

    if (!box) return;

    box.innerHTML = "";

    if (!firebaseNotices.length) {
        box.textContent = "No notices published yet.";
        return;
    }

    firebaseNotices.forEach(notice => {
        const card = document.createElement("div");
        card.className = "alert mt-3";

        const content = document.createElement("div");
        content.className = "flex-1";

        const title = document.createElement("b");
        title.textContent = notice.title || "";

        const description = document.createElement("p");
        description.textContent = notice.text || "";

        const date = document.createElement("small");
        date.textContent = notice.date || "";

        const button = document.createElement("button");
        button.className = "btn btn-error btn-sm";
        button.textContent = "Delete";

        button.onclick = () => removeItem("notices", notice.id);

        content.append(title, description, date);
        card.append(content, button);

        box.appendChild(card);
    });
}


// ============================================================
// ANNOUNCEMENTS - FIREBASE
// ============================================================

async function addAnnouncement() {
    const titleElement =
        document.getElementById("announcementTitle");

    const textElement =
        document.getElementById("announcementText");

    if (!titleElement || !textElement) return;

    const title = titleElement.value.trim();
    const text = textElement.value.trim();

    if (!title || !text) {
        alert("Please enter announcement title and details.");
        return;
    }

    if (!checkAdminLogin()) return;

    try {
        await db.collection("announcements").add({
            title: title,
            text: text,
            date: new Date().toLocaleDateString(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        titleElement.value = "";
        textElement.value = "";

        alert("Announcement published successfully!");

    } catch (error) {
        console.error("Firebase announcement error:", error);
        alert("Announcement could not be published: " + error.message);
    }
}


function loadAnnouncements() {
    const box = document.getElementById("adminAnnouncements");

    if (!box) return;

    box.textContent = "Loading announcements...";

    if (announcementUnsubscribe) {
        announcementUnsubscribe();
    }

    announcementUnsubscribe =
        db.collection("announcements").onSnapshot(
            snapshot => {
                firebaseAnnouncements = [];

                snapshot.forEach(doc => {
                    firebaseAnnouncements.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                sortNewestFirst(firebaseAnnouncements);

                renderAdminAnnouncements();
                updateCounts();
            },

            error => {
                console.error("Firebase announcement error:", error);
                box.textContent =
                    "Could not load announcements: " + error.message;
            }
        );
}


function renderAdminAnnouncements() {
    const box = document.getElementById("adminAnnouncements");

    if (!box) return;

    box.innerHTML = "";

    if (!firebaseAnnouncements.length) {
        box.textContent = "No announcements published yet.";
        return;
    }

    firebaseAnnouncements.forEach(item => {
        const card = document.createElement("div");
        card.className = "alert mt-3";

        const content = document.createElement("div");
        content.className = "flex-1";

        const title = document.createElement("b");
        title.textContent = item.title || "";

        const description = document.createElement("p");
        description.textContent = item.text || "";

        const date = document.createElement("small");
        date.textContent = item.date || "";

        const button = document.createElement("button");
        button.className = "btn btn-error btn-sm";
        button.textContent = "Delete";

        button.onclick = () =>
            removeItem("announcements", item.id);

        content.append(title, description, date);
        card.append(content, button);

        box.appendChild(card);
    });
}


// ============================================================
// EVENTS - FIREBASE
// ============================================================

async function addEvent() {
    const titleElement = document.getElementById("eventTitle");
    const dateElement = document.getElementById("eventDate");
    const descriptionElement =
        document.getElementById("eventDescription");

    if (!titleElement || !dateElement || !descriptionElement) return;

    const title = titleElement.value.trim();
    const date = dateElement.value;
    const description = descriptionElement.value.trim();

    if (!title || !date) {
        alert("Please enter event name and date.");
        return;
    }

    if (!checkAdminLogin()) return;

    try {
        await db.collection("events").add({
            title: title,
            date: date,
            description: description,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        titleElement.value = "";
        dateElement.value = "";
        descriptionElement.value = "";

        alert("Event published successfully!");

    } catch (error) {
        console.error("Firebase event error:", error);
        alert("Event could not be published: " + error.message);
    }
}


function loadEvents() {
    const box = document.getElementById("adminEvents");

    if (!box) return;

    box.textContent = "Loading events...";

    if (eventUnsubscribe) {
        eventUnsubscribe();
    }

    eventUnsubscribe = db.collection("events").onSnapshot(
        snapshot => {
            firebaseEvents = [];

            snapshot.forEach(doc => {
                firebaseEvents.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            sortNewestFirst(firebaseEvents);

            renderAdminEvents();
            updateCounts();
        },

        error => {
            console.error("Firebase event loading error:", error);
            box.textContent = "Could not load events: " + error.message;
        }
    );
}


function renderAdminEvents() {
    const box = document.getElementById("adminEvents");

    if (!box) return;

    box.innerHTML = "";

    if (!firebaseEvents.length) {
        box.textContent = "No events published yet.";
        return;
    }

    firebaseEvents.forEach(event => {
        const card = document.createElement("div");
        card.className = "alert mt-3";

        const content = document.createElement("div");
        content.className = "flex-1";

        const title = document.createElement("b");
        title.textContent = event.title || "";

        const date = document.createElement("p");
        date.textContent = "📅 " + (event.date || "");

        const description = document.createElement("p");
        description.textContent = event.description || "";

        const button = document.createElement("button");
        button.className = "btn btn-error btn-sm";
        button.textContent = "Delete";

        button.onclick = () => removeItem("events", event.id);

        content.append(title, date, description);
        card.append(content, button);

        box.appendChild(card);
    });
}


// ============================================================
// DELETE - FIREBASE
// ============================================================

async function removeItem(type, id) {
    const collectionNames = [
        "notices",
        "announcements",
        "events"
    ];

    if (!collectionNames.includes(type)) {
        return;
    }

    if (!checkAdminLogin()) return;

    if (!confirm("Are you sure you want to delete this " +
        type.slice(0, -1) + "?")) {
        return;
    }

    try {
        await db.collection(type).doc(String(id)).delete();

    } catch (error) {
        console.error("Firebase delete error:", error);
        alert("Could not delete item: " + error.message);
    }
}


// ============================================================
// COUNTS
// ============================================================

function updateCounts() {
    const noticeCount = document.getElementById("noticeCount");
    const announcementCount =
        document.getElementById("announcementCount");
    const eventCount = document.getElementById("eventCount");

    if (noticeCount) {
        noticeCount.textContent = firebaseNotices.length;
    }

    if (announcementCount) {
        announcementCount.textContent = firebaseAnnouncements.length;
    }

    if (eventCount) {
        eventCount.textContent = firebaseEvents.length;
    }
}


// ============================================================
// INITIAL LOAD
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
    loadNotices();
    loadAnnouncements();
    loadEvents();

    updateCounts();
});
