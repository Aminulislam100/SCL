const admissionForm = document.getElementById("admissionForm");

if (admissionForm) {

    admissionForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const message = document.getElementById("message");

        // Show loading message
        message.innerHTML = `
            <div class="alert alert-info mt-5">
                Submitting your admission application...
            </div>
        `;


        const student = {

            name: document.getElementById("studentName").value.trim(),

            father: document.getElementById("fatherName").value.trim(),

            mother: document.getElementById("motherName").value.trim(),

            dob: document.getElementById("dob").value,

            gender: document.getElementById("gender").value,

            className: document.getElementById("className").value,

            phone: document.getElementById("phone").value.trim(),

            email: document.getElementById("email").value.trim(),

            address: document.getElementById("address").value.trim()

        };


        try {

            const response = await fetch("/api/admissions", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(student)

            });


            const result = await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message || "Failed to submit application."
                );

            }


            message.innerHTML = `
                <div class="alert alert-success mt-5">

                    <div>

                        <h3 class="font-bold">
                            Application Submitted!
                        </h3>

                        <div>
                            Your admission application has been
                            successfully submitted.
                        </div>

                    </div>

                </div>
            `;


            // Clear the form
            admissionForm.reset();


        } catch (error) {

            console.error(error);


            message.innerHTML = `
                <div class="alert alert-error mt-5">

                    <div>

                        <h3 class="font-bold">
                            Submission Failed
                        </h3>

                        <div>
                            ${error.message}
                        </div>

                    </div>

                </div>
            `;

        }

    });

}