// =====================================
// FIREBASE EVENTS
// =====================================

function displayEvents() {
    const container = document.getElementById("eventContainer");
    const latestContainer = document.getElementById("latestEvents");

    if (!container && !latestContainer) return;

    db.collection("events").onSnapshot(snapshot => {
        const events = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        events.sort((a, b) => {
            const timeA = a.createdAt?.toMillis?.() || 0;
            const timeB = b.createdAt?.toMillis?.() || 0;
            return timeB - timeA;
        });

        if (container) {
            container.innerHTML = "";

            if (events.length === 0) {
                container.innerHTML =
                    '<p class="text-center py-8">No events available.</p>';
            } else {
                events.forEach(event => {
                    const card = document.createElement("div");
                    card.className =
                        "card bg-base-100 shadow-md p-5 mb-4";

                    const title = document.createElement("h3");
                    title.className = "font-bold text-xl";
                    title.textContent = event.title || "";

                    const date = document.createElement("p");
                    date.className = "mt-2 text-primary";
                    date.textContent = "📅 " + (event.date || "");

                    const description = document.createElement("p");
                    description.className = "mt-2";
                    description.textContent = event.description || "";

                    card.append(title, date, description);
                    container.appendChild(card);
                });
            }
        }

        if (latestContainer) {
            latestContainer.innerHTML = "";

            events.slice(0, 3).forEach(event => {
                const card = document.createElement("div");
                card.className = "card bg-base-100 shadow-md p-4 mb-3";

                const title = document.createElement("h3");
                title.className = "font-bold";
                title.textContent = event.title || "";

                const date = document.createElement("p");
                date.className = "text-primary mt-2";
                date.textContent = "📅 " + (event.date || "");

                const description = document.createElement("p");
                description.className = "mt-2";
                description.textContent = event.description || "";

                card.append(title, date, description);
                latestContainer.appendChild(card);
            });
        }

    }, error => {
        console.error("Event loading error:", error);

        if (container) {
            container.textContent = "Unable to load events.";
        }
    });
}

displayEvents();