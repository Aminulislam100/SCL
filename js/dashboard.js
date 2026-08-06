// ============================================================
// DASHBOARD.JS
// ============================================================


// ============================================================
// LOGIN
// ============================================================

function checkLogin() {

    // If you already have your own login system,
    // keep that code here.

    console.log("Admin dashboard loaded");
}


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

        if (element) {
            element.classList.add("hidden");
        }

    });


    const selected = document.getElementById(section);

    if (selected) {
        selected.classList.remove("hidden");
    }


    // Update tabs

    const tabs = document.querySelectorAll(".tabs .tab");

    tabs.forEach(tab => {
        tab.classList.remove("tab-active");
    });


    const sectionMap = {
        noticeSection: 0,
        announcementSection: 1,
        eventSection: 2
    };


    const index = sectionMap[section];

    if (index !== undefined && tabs[index]) {
        tabs[index].classList.add("tab-active");
    }


    // Close mobile drawer

    const drawer = document.getElementById("admin-drawer");

    if (drawer) {
        drawer.checked = false;
    }

}


// ============================================================
// NOTICES
// ============================================================

function addNotice() {

    const titleElement =
        document.getElementById("noticeTitle");

    const textElement =
        document.getElementById("noticeText");


    if (!titleElement || !textElement) {
        console.error("Notice form elements not found.");
        return;
    }


    const title = titleElement.value.trim();
    const text = textElement.value.trim();


    if (!title || !text) {

        alert("Please enter both the notice title and notice details.");

        return;
    }


    addItem("notices", {

        id: Date.now(),

        title: title,

        text: text,

        date: new Date().toLocaleDateString()

    });


    titleElement.value = "";
    textElement.value = "";


    loadNotices();

    updateCounts();

}


// ============================================================
// LOAD NOTICES
// ============================================================

function loadNotices() {

    const box =
        document.getElementById("adminNotices");


    if (!box) {
        return;
    }


    box.innerHTML = "";


    const notices = getItems("notices");


    if (notices.length === 0) {

        box.innerHTML = `
            <div class="alert">
                <span>No notices published yet.</span>
            </div>
        `;

        return;
    }


    notices.forEach(notice => {

        box.innerHTML += `

            <div class="alert mt-3">

                <div class="flex-1">

                    <b>${notice.title}</b>

                    <p>${notice.text}</p>

                    <small class="opacity-60">
                        ${notice.date}
                    </small>

                </div>


                <button
                    onclick="removeItem('notices', ${notice.id})"
                    class="btn btn-error btn-sm">

                    Delete

                </button>

            </div>

        `;

    });

}


// ============================================================
// ANNOUNCEMENTS
// ============================================================

function addAnnouncement() {

    const titleElement =
        document.getElementById("announcementTitle");

    const textElement =
        document.getElementById("announcementText");


    if (!titleElement || !textElement) {
        console.error("Announcement form elements not found.");
        return;
    }


    const title = titleElement.value.trim();
    const text = textElement.value.trim();


    if (!title || !text) {

        alert("Please enter both the announcement title and details.");

        return;
    }


    addItem("announcements", {

        id: Date.now(),

        title: title,

        text: text

    });


    titleElement.value = "";
    textElement.value = "";


    loadAnnouncements();

    updateCounts();

}


// ============================================================
// LOAD ANNOUNCEMENTS
// ============================================================

function loadAnnouncements() {

    const box =
        document.getElementById("adminAnnouncements");


    if (!box) {
        return;
    }


    box.innerHTML = "";


    const announcements =
        getItems("announcements");


    if (announcements.length === 0) {

        box.innerHTML = `
            <div class="alert">
                <span>No announcements published yet.</span>
            </div>
        `;

        return;
    }


    announcements.forEach(item => {

        box.innerHTML += `

            <div class="alert mt-3">

                <div class="flex-1">

                    <b>${item.title}</b>

                    <p>${item.text}</p>

                </div>


                <button
                    onclick="removeItem('announcements', ${item.id})"
                    class="btn btn-error btn-sm">

                    Delete

                </button>

            </div>

        `;

    });

}


// ============================================================
// EVENTS
// ============================================================

function addEvent() {

    const titleElement =
        document.getElementById("eventTitle");

    const dateElement =
        document.getElementById("eventDate");

    const descriptionElement =
        document.getElementById("eventDescription");


    if (
        !titleElement ||
        !dateElement ||
        !descriptionElement
    ) {

        console.error("Event form elements not found.");

        return;
    }


    const title =
        titleElement.value.trim();

    const date =
        dateElement.value;

    const description =
        descriptionElement.value.trim();


    if (!title || !date) {

        alert("Please enter the event name and date.");

        return;
    }


    addItem("events", {

        id: Date.now(),

        title: title,

        date: date,

        description: description

    });


    titleElement.value = "";
    dateElement.value = "";
    descriptionElement.value = "";


    loadEvents();

    updateCounts();

}


// ============================================================
// LOAD EVENTS
// ============================================================

function loadEvents() {

    const box =
        document.getElementById("adminEvents");


    if (!box) {
        return;
    }


    box.innerHTML = "";


    const events =
        getItems("events");


    if (events.length === 0) {

        box.innerHTML = `
            <div class="alert">
                <span>No events published yet.</span>
            </div>
        `;

        return;
    }


    events.forEach(event => {

        box.innerHTML += `

            <div class="alert mt-3">

                <div class="flex-1">

                    <b>${event.title}</b>

                    <p>📅 ${event.date}</p>

                    <p>${event.description}</p>

                </div>


                <button
                    onclick="removeItem('events', ${event.id})"
                    class="btn btn-error btn-sm">

                    Delete

                </button>

            </div>

        `;

    });

}


// ============================================================
// DELETE
// ============================================================

function removeItem(type, id) {

    deleteItem(type, id);


    loadNotices();
    loadAnnouncements();
    loadEvents();

    updateCounts();

}


// ============================================================
// COUNTS
// ============================================================

function updateCounts() {

    const noticeCount =
        document.getElementById("noticeCount");

    const announcementCount =
        document.getElementById("announcementCount");

    const eventCount =
        document.getElementById("eventCount");


    if (noticeCount) {

        noticeCount.textContent =
            getItems("notices").length;

    }


    if (announcementCount) {

        announcementCount.textContent =
            getItems("announcements").length;

    }


    if (eventCount) {

        eventCount.textContent =
            getItems("events").length;

    }

}


// ============================================================
// INITIAL LOAD
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    loadNotices();

    loadAnnouncements();

    loadEvents();

    updateCounts();

});