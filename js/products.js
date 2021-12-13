//fetching products info from JSON & displaying them 
fetch('/discs.json')
    .then(response => response.json())
    .then(data => {
        //localSave(data);
        data.forEach(disc => {
            createData(disc);
        });
    });

//cloning a template card for each product
const templateCard = document.querySelector("#template-card");

function createData(discProd) {
    // cloning the product HTML template and assigning it to displayProd
    const displayProd = templateCard.cloneNode(true);

    //removing the "hidden" class from the cloned element so it becomes visible
    displayProd.classList.remove("template-card");

    //removing the template from the page
    templateCard.remove();

    //discProd - the disc info we receive from local storage
    //inserting the info into HTML
    displayProd.querySelector(".mockImg").src = discProd.image;
    displayProd.querySelector(".mockTitle").innerHTML = discProd.title;
    displayProd.querySelector(".mockArtist").innerHTML = discProd.artist;
    displayProd.querySelector(".mockCondition").innerHTML = discProd.condition;
    displayProd.querySelector(".mockPrice").innerHTML = "€" + discProd.price;

    //appending the new created product cards to the "products" container
    products.appendChild(displayProd);

    //displaying the button for every product
    //adding addToCart function for every button
    const mockButton = displayProd.querySelector(".mockButton");
    mockButton.addEventListener("click", function() {
        // addToCart(discProd.id);
        addToCart(discProd)
    })
}

//add to cart
function addToCart(discId) {
    //creating an empty array to hold each added product
    let cart = [];

    //if "cart" exists in local storage, get Item
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }

    //add to array the product with a matching ID 
    let discAdded = cart.filter(cartProd => cartProd.id == discId.id);

    //if the array is not empty, check if product exists
    //if it does => increase quantity
    if (discAdded.length) {
        let index = cart.findIndex(cartProd => cartProd.id === discAdded[0].id);
        cart[index].quantity++;
    } else {
        //if the product doesn't exist, add it
        cart.push(discId);
    }

    //save cart array in local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    //refresh page to get local storage
    window.location = window.location;
}

//adding products to dropdown cart
function addToDropdown() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach((disc) =>
        displayDropdownCart(disc))

    let dropdown = document.querySelector("#dropdown-content");
    dropdown.innerHTML +=
        `<button  class="btn add-cart-btn font-weight-bold mb-2 w-100" id="checkout">Checkout</button>`
}
addToDropdown()

//displaying dropdown cart
function displayDropdownCart(d) {
    let cartRow = document.querySelector("#dropdown-cart");
    let card = document.createElement("li");
    card.className = "row template-list";
    card.innerHTML = `
    <div class="col-9 mb-2">
    <img src=${d.image} style="width:60px; height:60px;">
    <span class="font-weight-bold">${d.title}</span>
    <small>Quantity: ${d.quantity}</small>
    </div>`
    cartRow.appendChild(card);
}

//navbar buttons redirect
let navbarLogo = document.querySelector("#navbar-logo");
navbarLogo.addEventListener("click", function() {
    window.location.replace("/html/landing.html");
});

let dropdownCart = document.querySelector("#checkout");
dropdownCart.addEventListener("click", function() {
    window.location.replace("/html/cart.html");
});