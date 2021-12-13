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
}
displayDate();

//form validation
const submitBtn = document.querySelector("#submit")
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let phone = document.querySelector("#phone").value;
    let address = document.querySelector("#address").value;
    let city = document.querySelector("#city").value;
    let date = document.querySelector("#date").value;

    if (validateName() && validateEmail() && validatePhone() && validateAddress()) {
        formData = [];
        formData
            .push({
                "name": name,
                "email": email,
                "phone": phone,
                "address": address,
                "city": city,
                "delivery": date
            });
        localStorage.setItem('shipping-details',
            JSON.stringify(formData));

        if (name != "" && email != "" && phone != "" && date != "" && city != "" && address != "") {
            document.location = "/html/thx.html";
        } else {
            alert("Fields cannot be empty!")
        }
    }
});

function validateName() {
    let nameRes = true;
    let name = document.querySelector("#name");

    //name should only contain letters, -, ' and whitespaces; cannot end in special character
    const validNameInput = /^([A-Za-z]+)([ ]{0,1})([\-]?)([A-Za-z]+)?([ ]{0,1})?([A-Za-z]+)?([ ]{0,1})?([A-Za-z]+)$/;
    //check if name input is valid
    name.addEventListener("input", function() {

        if (validNameInput.test(name.value) && name.classList.contains("invalid")) {
            name.classList.remove("invalid");
            name.classList.add("valid");
        } else {
            name.classList.remove("valid");
            name.classList.add("invalid");
            nameRes = false;
        }
    })
    return nameRes;
}


function validateEmail() {
    let emailRes = true;
    let email = document.querySelector("#email");

    //mail like anything@anything.domain (min 2 letters, max 3)
    const validEmailInput = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
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

        //check phone field input 
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

function validateAddress() {
    let addressRes = true;
    let address = document.querySelector("#address");

    address.addEventListener("input", function() {
        //address should be like
        const validAddress = /^(str\.\s)+[a-zA-Z]+\s+([A-z\s]?)+(nr\.\s(\d*)(\s)?)((bl\.\s(\d)*)?)\s(ap\.\s\d*)?/;

        //check address field input
        if (validAddress.test(address.value) && address.classList.contains("invalid")) {
            address.classList.remove("invalid");
            address.classList.add("valid");
        } else {
            address.classList.remove("valid");
            address.classList.add("invalid");
            addressRes = false;
        }
    })
    return addressRes;
}

function check() {
    validatePhone();
    validateEmail();
    validateName();
    validateAddress();
}

validatePhone();
validateEmail();
validateName();
validateAddress();