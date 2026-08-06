// Display Events


function displayEvents(){


    let events = getItems("events");



    let container =
    document.getElementById("eventContainer");



    if(container){


        container.innerHTML = "";



        if(events.length === 0){


            container.innerHTML = `


            <div class="card bg-base-100 shadow-xl">


            <div class="card-body">


            <h2 class="card-title">

            No Events Available

            </h2>


            <p>

            Upcoming events will be added soon.

            </p>


            </div>


            </div>


            `;


        }



        events.forEach(event=>{


            container.innerHTML += `


            <div class="card bg-base-100 shadow-xl">


            <div class="card-body">


            <div class="badge badge-warning">

            Event

            </div>


            <h2 class="card-title">

            ${event.title}

            </h2>



            <p>

            📅 ${event.date}

            </p>



            <p>

            ${event.description}

            </p>



            </div>


            </div>


            `;


        });



    }





    let latest =
    document.getElementById("latestEvents");



    if(latest){


        latest.innerHTML = "";



        events.slice(0,3).forEach(event=>{


            latest.innerHTML += `


            <div class="card bg-base-100 shadow">


            <div class="card-body">


            <h3 class="card-title">

            ${event.title}

            </h3>


            <p>

            ${event.date}

            </p>


            <p>

            ${event.description}

            </p>


            </div>


            </div>


            `;


        });



    }



}




displayEvents();