//creating array with cities
let cities = [
    "Bucuresti", "Cluj", "Brasov", "Timisoara"
];
//on window load populate City drop-down
window.onload = function() {
    const cityElem = document.querySelector("#city");
    let html = '<option value="">Select your city</option>';
    cities.forEach(city => {
        html += '<option value=' + city + '>' + city + '</option>';
    });
    cityElem.innerHTML = html;
}

//setting min delivery date as today's date, blocking past days
function displayDate() {
    let today = new Date().toISOString().split('T')[0];
    document.getElementsByName("date")[0].setAttribute('min', today);
    let date = document.querySelector("#date");
    date.addEventListener("change", function() {
        console.log(new Date(this.value))
            //put it somewhere?
    })
}
displayDate();

//form validation
const submitBtn = document.querySelector("#submit")
submitBtn.addEventListener("click", function() {
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let phone = document.querySelector("#phone").value;
    let date = document.querySelector("#date").value;

    if (validateName() && validateEmail() && validatePhone()) {
        formData = [];
        formData
            .push({
                "name": name,
                "email": email,
                "phone": phone,
                "delivery": date
            });
        localStorage.setItem('shipping-details',
            JSON.stringify(formData))
    }
    window.location.replace("/html/thx.html");
});

function validateName() {
    let nameRes = true;
    let name = document.querySelector("#name")
        //name should only contain letters, - and whitespaces
    const validNameInput = /^[a-zA-Z\s\-?]*$/;
    //check if name input is valid
    name.addEventListener("input", function() {

        if (validNameInput.test(name.value)) {
            name.classList.remove("invalid");
            name.classList.add("valid");

        } else {
            name.classList.remove("valid");
            name.classList.add("invalid");
            nameRes = false
        }
    })
    return nameRes;
}


function validateEmail() {
    let emailRes = true;
    let email = document.querySelector("#email")
        //mail
    const validEmailInput = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //check if mail input is valid
    email.addEventListener("input", function() {
        if (validEmailInput.test(email.value) && email.classList.contains("invalid")) {
            email.classList.remove("invalid");
            email.classList.add("valid");
        } else {
            email.classList.remove("valid");
            email.classList.add("invalid");
            emailRes = false;
        }
    })
    return emailRes;
}

function validatePhone() {
    let phoneRes = true;
    let phone = document.querySelector("#phone");

    phone.addEventListener("input", function() {
        //phone field should contain only 10 numbers 
        const validPhoneNumber = /^[0-9]{10}$/;

        //check phone field input && length 
        if (validPhoneNumber.test(phone.value) && phone.classList.contains("invalid")) {
            phone.classList.remove("invalid");
            phone.classList.add("valid");
        } else {
            phone.classList.remove("valid");
            phone.classList.add("invalid");
            phoneRes = false;
        }
    })
    return phoneRes;
}
validatePhone();
validateEmail();
validateName();