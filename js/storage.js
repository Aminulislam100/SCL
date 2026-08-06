// ============================================================
// STORAGE.JS
// ============================================================

const DEFAULT_DATA = {
    notices: [],
    announcements: [],
    events: [],
    results: [],
    toppers: [],
    admissions: []
};


// ============================================================
// GET ALL DATA
// ============================================================

function getData() {

    const saved = localStorage.getItem("schoolData");

    if (!saved) {

        const initialData = {
            ...DEFAULT_DATA
        };

        localStorage.setItem(
            "schoolData",
            JSON.stringify(initialData)
        );

        return initialData;
    }

    try {

        const parsed = JSON.parse(saved);

        return {
            ...DEFAULT_DATA,
            ...parsed,

            notices: Array.isArray(parsed.notices)
                ? parsed.notices
                : [],

            announcements: Array.isArray(parsed.announcements)
                ? parsed.announcements
                : [],

            events: Array.isArray(parsed.events)
                ? parsed.events
                : [],

            results: Array.isArray(parsed.results)
                ? parsed.results
                : [],

            toppers: Array.isArray(parsed.toppers)
                ? parsed.toppers
                : [],

            admissions: Array.isArray(parsed.admissions)
                ? parsed.admissions
                : []
        };

    } catch (error) {

        console.error("Could not read school data:", error);

        return {
            ...DEFAULT_DATA
        };
    }
}


// ============================================================
// SAVE DATA
// ============================================================

function saveData(data) {

    localStorage.setItem(
        "schoolData",
        JSON.stringify(data)
    );

}


// ============================================================
// ADD
// ============================================================

function addItem(type, item) {

    const data = getData();

    if (!Array.isArray(data[type])) {
        data[type] = [];
    }

    data[type].push(item);

    saveData(data);
}


// ============================================================
// DELETE
// ============================================================

function deleteItem(type, id) {

    const data = getData();

    if (!Array.isArray(data[type])) {
        return;
    }

    data[type] = data[type].filter(
        item => String(item.id) !== String(id)
    );

    saveData(data);
}


// ============================================================
// GET
// ============================================================

function getItems(type) {

    const data = getData();

    if (!Array.isArray(data[type])) {
        return [];
    }

    return data[type];
}