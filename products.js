fetch('discs.json')
    .then(response => response.json())
    .then(data => {
        localSave(data);
        data.forEach(disc => {
            displayData(disc);
        })
    })

let rowDiv = document.querySelector(".row");

function localSave(discs) {
    localStorage.setItem("vinyls", JSON.stringify(discs));
}

function displayData(disc) {
    let html = `
    <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
    <div class="bg-white rounded shadow-sm"><img src="${disc.image}" alt="${disc.title}"
            class="img-fluid card-img-top">
        <div class="p-4">
            <h5 class="text-dark">${disc.title}</h5>
            <h6 class="text-muted">${disc.artist}</h6>
            <p class="small text-muted mb-0 text-truncate p-3">"${disc.description}"
            </p>
            <div class="btn btn-primary">Buy now</div>
            </div>
        </div>
    </div>
</div>`;
    rowDiv.innerHTML += html;
}

//when click on cart button redirect to cart page
document.querySelector(".cart-btn").addEventListener('click', function () {
    document.location = "cart.html";
})
const storedInput = localStorage.getItem("vinyls");
console.log(storedInput)

window.addToCart = () => {
    console.log('Button clicked');
}
