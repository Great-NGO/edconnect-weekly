//STEP 4 - IMPLEMENT SIGNUP

//GET/api/programs
fetch('/api/programs')
    .then(async (response) => {
        let respData = await response.json(); // Await the response the API sends in a json format 
        // console.log(data);   //DATA REQUEST FROM THE SERVER

        let programs = document.getElementById('programs'); //Get the programs id
        //Loop through the data array (from the Api server) and showcase the program options from there
        respData.forEach((program) => {
            let option = document.createElement("option");
            option.value = program;
            option.text = program;
            if (programs) {
                programs.appendChild(option);
            }
        });
    });

//GET/api/graduationYears
fetch('/api/graduationYears') //Async and await
    .then(async (response) => {
        let respData = await response.json();
        console.log("The response data gotten from the graduationYears API is ", respData);   //DATA REQUEST FROM THE SERVER

        let graduationYears = document.getElementById('gradYear');
        //Loop through the data array (from the Api server ) and showcase the Graduation Years options from there
        respData.forEach((GradY) => {
            let option = document.createElement("option");
            option.value = GradY;
            option.text = GradY;

            if (graduationYears) {
                graduationYears.appendChild(option);
            }

        });

    });

//SIGNUP FORM LOGIC
let signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener('submit', handleFormSubmit)
}

function handleFormSubmit(event) {
    event.preventDefault();

    const InputData = {
        'firstname': document.getElementById('fn').value,
        'lastname': document.getElementById('ln').value,
        'email': document.getElementById('email').value,
        'password': document.getElementById('psw').value,
        'matricNumber': document.getElementById('matNo').value,
        'program': document.getElementById('programs').value,
        'graduationYear': document.getElementById('gradYear').value
    };

    console.log(InputData);

    fetch('/api/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(InputData)

    })
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((data) => {
            console.log("The data is:", data)
            if (data.status === "ok") {
                console.log("Success:", data);
                document.cookie = `uid = ${data.data.id};path=/;`;
                window.location.replace("index.html");
                // console.log("HURRAY IT's WORKING");
            }
            else if (data.status !== "ok") {

                let errMsg = data.errors;
                let errorDiv = document.createElement("div");

                errorDiv.className = "alert alert-danger";
                errorDiv.innerHTML = errMsg.join("<br>");   //NB: JOIN is a method which converts elements of an array into a string. You can add a separator using the join method
                let h2 = document.querySelector("h2");
                h2.insertAdjacentElement("afterend", errorDiv);
                console.log("SOMETHING IS WRONG :( ");
            }
        })
        .catch((error) => {
            console.log("Error: ", error)
        })
}

//STEP5 - UPDATE THE NAVBAR

/* Function explained:
Take the cookiename as parameter (cname).
Create a variable (name) with the text to search for (cname + "=").
Split document.cookie on semicolons into an array called ca (ca = document.cookie.split(';')).
Loop through the ca array (i=0;i<ca.length;i++), and read out each value c=ca[i]).
If the cookie is found (c.indexOf(name) == 0), return the value of the cookie (c.substring(name.length,c.length).
If the cookie is not found, return "" (REFERENCE: W3SCHOOLS)
.*/
//This function returns the value of the specified cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

//window.addEventListener('load',function(){}) === window.onload = function(){}; It is also the same thing as <element onload="myScript"> in an html
window.addEventListener('load', function () {

    if (getCookie(`uid`)) {

        fetch(`/api/users/${getCookie(`uid`)}`)
            .then((response) => {
                return response.json();

            })
            .then((data) => {
                console.log(data);

                console.log("ID: ", data.id);
                console.log("Firstname: ", data.firstname);

                let signUpLink = document.querySelectorAll("a.nav-link")[2];
                signUpLink.style.display = "none";

                let LoginLink = document.querySelectorAll("a.nav-link")[3];
                LoginLink.style.display = "none";

                let nameDisplay = document.getElementById("username");
                nameDisplay.innerText = `Hi, ${data.firstname}`;
                nameDisplay.setAttribute("style", "display: inline-block; color: #B5B5B5; padding-top: 8px;");


            })
            .then((checkData) => {
                //logout syntax
                let logout = document.getElementById("logout");
                logout.style.display = "inline-block";
                logout.addEventListener('click', function (evt) {
                    evt.preventDefault();
                    console.log("1");
                    document.cookie = `uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

                    window.location.href = "index.html";

                })
                return checkData;
            })
            .catch((err) => {
                console.log("The Error is: ", err)
            })

    }

})

//STEP 6 - IMPLEMENT LOGIN
let loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener('submit', loginFormSubmit)
}

function loginFormSubmit(event) {
    event.preventDefault();

    const FormData = {
        "email": document.getElementById("fEmail").value,
        "password": document.getElementById("fPsw").value
    }

    console.log(FormData);

    fetch('/api/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(FormData)

    })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log("The Data is: ", data)
            if (data.status === "ok") {
                console.log("Login Success: ", data)
                document.cookie = `uid = ${data.data.id}; path=/`;
                window.location.replace("index.html");
            }
            else if (data.status !== "ok") {
                let loginErrorDiv = document.createElement("div");
                loginErrorDiv.className = "alert alert-danger";
                loginErrorDiv.innerText = "Invalid email/password";
                let loginh1 = document.querySelector("#loginh1");
                loginh1.insertAdjacentElement("afterend", loginErrorDiv);
            }
        })
        .catch((err) => {
            console.log("This code has an error");
            console.log("The Error is: ", err);
        })

}

//STEP 7 - IMPLEMENT CREATE PROJECT & STEP 8 - RESTRICT PROJECT SUBMISSION TO LOGGED-IN USERS
const path = window.location.href;
if (path.includes("createProject.html")) {
    //Checking to see that the Path is on createProject.html

    if (!getCookie(`uid`)) {
        //If the User is not logged in i.e The Uid cookie doesn't exist then redirect to login.html
        window.location.replace("login.html");
    }
    else if (getCookie(`uid`)) {
        // If the User is logged in i.e The Cookie exists, perform the post request, save the users project and redirect to index.html. if the users data is wrong, display the errors
        let createProjectForm = document.getElementById("createProjectForm");

        if (createProjectForm) {
            createProjectForm.addEventListener('submit', createProjectFormSubmit)
        }

        function createProjectFormSubmit(evt) {
            evt.preventDefault();
            const createProjectFormData = {

                "name": document.getElementById("projName").value,
                "abstract": document.getElementById("projAbst").value,
                "authors": document.getElementById("pAuthors").value.split(','), // to split the array elements by a comma ','
                "tags": document.getElementById("projTags").value.split('#') //to split the array elements by a hashtag '#'
            }
            console.log(createProjectFormData);

            fetch('/api/projects', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createProjectFormData)
            })
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((data) => {
                    if (data.status === "ok") {
                        console.log("Project Creation Success: ", data)
                        window.location.replace("index.html");
                    }
                    else if (data.status !== "ok") {

                        let projErrMsg = data.errors;
                        let projErrDiv = document.createElement("div");

                        projErrDiv.className = "alert alert-danger";
                        projErrDiv.innerHTML = projErrMsg.join("<br>");
                        let projH3 = document.querySelector("#projH3");
                        projH3.insertAdjacentElement("afterend", projErrDiv);

                    }
                })
                .catch((err) => {
                    console.log("Error generated");
                    console.log("Error is: ", err)
                })
        }

    }

}

//STEP 9 - Update the project list on the Home Page
if (path.includes("index.html")) {


    fetch('/api/projects')
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {

            let pData = data;
            console.log(pData);

            // let fourProjects = pData.slice(-4); //get the last/recent 4 elements in the array NB: DOESN'T WORK WITH THE CYPRESS SERVER EDCONNECT USES TO TEST ITS CODE
           let fourProjects = pData.slice(0, 4); //get the first 4 elements in the array

            fourProjects.forEach((projectname) => {
                const showcase = document.querySelector(".showcase");

                console.log(projectname);
                console.log("PROJECT NAME: ", projectname.name, "PROJECT ID:", projectname.id);

                   //METHOD 1 - CREATING A GENERAL DIV, SETTING THE INNERHTML TO DISPLAY THE PROJECT AND ALL ITS PROPERTIES AND ADDING A CLICK EVENT LISTENER WHICH REDIRECTS TO VIEWPROJECT WITH A QUERY STRING? OF THE ID OF THE ACTUAL PROJECT

                    const cardDiv = document.createElement('div');
                    cardDiv.className = "col-md-3";
                    cardDiv.innerHTML = `

                    <div class = 'card' style="padding:20px"> 
                        <div class="card-block">
                            <h6 class="card-title" style="font-size: 20px; margin-bottom: 0px; color: dodgerblue"> ${projectname.name} </h6>
                            <small class="text-muted"> ${projectname.authors.join(',')} </small>
                            <p class="card-text"> ${projectname.abstract} </p>
                            <p style="color: dodgerblue"> ${projectname.tags.join('#')} </p>
                        </div>
                    </div>
                    `  ;
                    showcase.appendChild(cardDiv);

                    //When a project name is clicked, redirect to the View Project Page and replace the project id with the actual project id
                    cardDiv.addEventListener('click', function () {
                        window.location.href = `viewProject.html?id=${projectname.id}`;
                    }) 
                    //  return cardDiv; 


                // //METHOD 2 - CREATING AN ANCHOR TAG, SETTING ITS LINK(HREF) TO BE THAT OF THE VIEWPROJECT PAGE WITH THE QUERY STRING? OF THE ACTUAL PROJECET ID
                // const ancDiv = document.createElement('div');
                // ancDiv.className = "col-md-3";
                // const anc = document.createElement('a');
                // anc.href = `viewProject.html?id=${projectname.id}`; //Setting the href attribute to link to the ViewProject page and replace the project id with the actual project id

                // // anc.textContent = `${projectname.name}`;
                // anc.innerHTML = `
                //         <div class="card" style="padding: 20px">
                //         <div class="card-block">
                //             <h6 class="card-title" style="font-size: 20px; margin-bottom: 0px; color: dodgerblue"> ${projectname.name} </h6>
                //             <small class="text-muted"> ${projectname.authors.join(",")} </small>
                //             <p class="card-text"> ${projectname.abstract} </p>
                //             <p style="color: dodgerblue"> ${projectname.tags.join("#")} </p>
                //         </div>
                //     </div>
                //     `;
                // anc.setAttribute('style', 'text-decoration:none; color:black'); // To prevent the page from showing its default line or color
                // console.log(anc);
                // ancDiv.appendChild(anc);
                // showcase.appendChild(ancDiv);


            })
        })
        .catch((err) => {
            console.log("SOMETHING IS WRONG :( ");
            console.log(err);
        })

}

//STEP 10 - UPDATE VIEWPROJECT PAGE
if (path.includes("viewProject.html")) {
  
        let url_str = document.URL;     //the given url string. NB: document.URL property gives the current url of the browser window
        let url = new URL(url_str);     //create a new URL object from the url string 
        let search_params = url.searchParams;    //searchParams property is URLSearchParams object
        const id = search_params.get('id');   //We get the value of the id parameter and store it in a variable

        fetch(`/api/projects/${id}`)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                let vPData = data;
                console.log(vPData);
                console.log("The PROJECT ID gotten from the Create Project page is: ", vPData.id);
                console.log("The PROJECT name gotten from the Create Project page is: ", vPData.name);

                //Update Project name
                let projName = document.getElementById("project_name");
                console.log(projName);
                projName.innerText = `${vPData.name}`;
                projName.setAttribute('style', 'margin: 40px 0 20px 20px; font-size: 30px; font-weight:bold;')

                //Update Project Authors
                let projAuthors = document.getElementById("project_authors");

                // projAuthors.innerHTML = `
                //     <p> ${vPData.authors.join('<br>')} </p>
                // `;
                console.log(vPData.authors);
                for (let i = 0; i < vPData.authors.length; i++) {
                    projAuthors.innerHTML += "<p class='card-text' style='padding: 0px 5px'>" + ` ${vPData.authors[i]}` + "</p><hr>";

                }

                //Update Project Abstract
                let projAbst = document.getElementById("project_abstract");
                console.log(projAbst)

                projAbst.innerHTML = `

                <h3>Project Abstract</h3>
                <hr style="margin:0px">
                <p> ${vPData.abstract} </p>
            `;

                //Update Project Tags
                let projTags = document.getElementById("project_tags");
                projTags.innerHTML = `
                <small style="color: dodgerblue; font-size: 15px;">${vPData.tags.join('#')}</small>
            `;

                //Update "Created By" 
                fetch(`/api/users/${vPData.createdBy}`)
                    .then((response) => {
                        console.log("Final response is: ", response);
                        return response.json();
                    })
                    .then((data) => {
                        let vPData = data;
                        console.log("Final Data is: ", vPData);
                        document.getElementById("project_author").textContent = `${vPData.firstname}` + " " + `${vPData.lastname}`;
                        // console.log(data.name); 
                    })

            })
            .catch((err) => {
                console.log("Final Lap")
                console.log("Error is : ", err)
            })

}























// window.location.href = `${window.location.origin}/project-explorer/viewProject.html?id=${projectname.id}`;

/* ALTERNATIVE METHOD FOR IMPLEMENTING SIGNUP (STEP4)
async function postFormDataAsJson({ url, formData }) {

    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);   //Gets input from all our form fields

    console.log(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: formDataJsonString,
    };

    const response = await fetch("/api/register", fetchOptions);
    const data = await response.json();
    // console.log(response.json());

    console.log(data.status);
    console.log(data.errors);

    if (response.status === 200) {
        console.log("yyyyy");
        document.cookie = `uid = ${data.data.id};path= /`;
        window.location.replace("index.html");

    }
    else if (response.status !== 200) {
        // console.log("1");
        let errorDiv = document.createElement("div");
        errorDiv.className = "alert alert-danger";
        errorDiv.innerHTML = data.errors.join("<br>");   //NB: JOIN is a method which converts elements of an array into a string. You can add a separator using the join method
        let h2 = document.querySelector("h2");
        h2.insertAdjacentElement("afterend", errorDiv);

    }
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const url = "/api/register";

    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({ url, formData });

        return responseData;
    }
    catch (error) {
        return (error);
    }

}

const signupForm = document.getElementById("signupForm");

if (signupForm)
    signupForm.addEventListener("submit", handleFormSubmit);
*/
