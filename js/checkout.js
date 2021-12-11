//creating array with cities
let cities = [
    "Bucuresti", "Cluj", "Brasov", "Timisoara"
];
//on window load populate City drop-down
window.onload = function () {
    const cityElem = document.querySelector("#city");
    let html = '<option value="">Select your city</option>';
    cities.forEach(city => {
        html += '<option value=' + city + '>' + city + '</option>';
    });
    cityElem.innerHTML = html;
}

function displayCurrentDate() {
    let today = new Date().toISOString().split('T')[0];
    document.getElementsByName("date")[0].setAttribute('min', today);
    let date = document.querySelector("#date");
    date.addEventListener("change", function () {
        console.log(new Date(this.value))
        //put it somewhere?
    })
}
displayCurrentDate();

//form validation
const submitBtn = document.querySelector("#submit")
submitBtn.addEventListener("click", function () {

    console.log("submitted");
    //window.location.replace("/html/thx.html");
});