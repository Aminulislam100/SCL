
// Display Notices on Notice Page and Home Page


function displayNotices(){


    let notices = getItems("notices");



    let container =
    document.getElementById("noticeContainer");



    if(container){


        container.innerHTML = "";



        if(notices.length === 0){


            container.innerHTML = `

            <div class="card bg-base-100 shadow-xl">

            <div class="card-body">

            <h2 class="card-title">

            No Notices Available

            </h2>


            <p>

            New notices will be added soon.

            </p>


            </div>

            </div>

            `;


        }



        notices.forEach(notice => {


            container.innerHTML += `


            <div class="card bg-base-100 shadow-xl">


            <div class="card-body">


            <h2 class="card-title">

            ${notice.title}

            </h2>



            <p>

            ${notice.text}

            </p>



            <div class="badge badge-primary">

            ${notice.date}

            </div>



            </div>


            </div>



            `;


        });



    }




    let latest =
    document.getElementById("latestNotices");



    if(latest){


        latest.innerHTML = "";



        notices.slice(0,3).forEach(notice=>{


            latest.innerHTML += `


            <div class="card bg-base-100 shadow">


            <div class="card-body">


            <h3 class="card-title">

            ${notice.title}

            </h3>


            <p>

            ${notice.text}

            </p>


            </div>


            </div>


            `;



        });



    }



}




displayNotices();