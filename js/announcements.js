
// Display Announcements


function displayAnnouncements(){


    let announcements = getItems("announcements");



    let container =
    document.getElementById("announcementContainer");



    if(container){


        container.innerHTML = "";



        if(announcements.length === 0){


            container.innerHTML = `


            <div class="card bg-base-100 shadow-xl">


            <div class="card-body">


            <h2 class="card-title">

            No Announcements Available

            </h2>


            <p>

            New announcements will appear here.

            </p>


            </div>


            </div>


            `;


        }



        announcements.forEach(item=>{


            container.innerHTML += `


            <div class="card bg-base-100 shadow-xl">


            <div class="card-body">


            <div class="badge badge-secondary">

            Announcement

            </div>


            <h2 class="card-title">

            ${item.title}

            </h2>



            <p>

            ${item.text}

            </p>



            </div>


            </div>


            `;



        });



    }





    let latest =
    document.getElementById("latestAnnouncements");



    if(latest){


        latest.innerHTML = "";



        announcements.slice(0,3).forEach(item=>{


            latest.innerHTML += `


            <div class="card bg-base-100 shadow">


            <div class="card-body">


            <h3 class="card-title">

            ${item.title}

            </h3>


            <p>

            ${item.text}

            </p>


            </div>


            </div>


            `;


        });


    }



}




displayAnnouncements();