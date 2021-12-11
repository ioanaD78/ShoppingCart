fetch('/discs.json')
    .then(response => response.json())
    .then(data => {
        //localSave(data);
        data.forEach(disc => {
            createData(disc);
        });
    });


/*function localSave(discs) {
    localStorage.setItem("vinyls", JSON.stringify(discs));
}*/

const templateCard = document.querySelector(".templateCard");
function createData(discProd) {
    // cloning the product HTML template and assigning it to displayProd
    const displayProd = templateCard.cloneNode(true);
    //removing the "hidden" class from the cloned element so it becomes visible
    displayProd.classList.remove("templateCard");
    //removing the template from the page
    templateCard.remove();



    console.log(discProd);

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
    //and adding addToCart function for every button
    const mockButton = displayProd.querySelector(".mockButton");
    mockButton.addEventListener("click", function () {
        //console.log(discProd.id);
        // addToCart(discProd.id);
        saveToLocalStorage(discProd)
    })

    function saveToLocalStorage(element) {
        let shoppingCart = []
        if (localStorage.getItem("cart")) {
            shoppingCart = JSON.parse(localStorage.getItem("cart"));
        }
        console.log("Storage:", element);
        let elementFound = shoppingCart.filter(
            (shoppingCartItem) => shoppingCartItem.id == element.id

        );
        if (elementFound.length) {
            let index = shoppingCart.findIndex(
                (shoppingCartItem) => shoppingCartItem.id === elementFound[0].id
            );
            console.log("indexul este " + index);
            shoppingCart[index].quantity++;
        } else {
            shoppingCart.push(element);
            console.log("else")
        }
        localStorage.setItem("cart", JSON.stringify(shoppingCart));
    }
    //toggling heart icon class when adding to favourites
    const fav = displayProd.querySelector(".heart");
    fav.addEventListener("click", function () {
        console.log(discProd.id)
        fav.classList.toggle("fav")
    })
}

const vinyls = JSON.parse(localStorage.getItem("vinyls"));
//creating an empty array to hold each added object
const cart = [];
function addToCart(discId) {
    let disc = vinyls.filter(disc => disc.id == discId);
    // return an array with a single object inside
    disc = disc[0];
    // if produt not in cart, add
    if (!cart.includes(disc)) {
        cart.push(disc);
    }

    //saving to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
}

//adding products to dropdown cart
function addToDropdown() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach((disc) =>
        displayDropdownCart(disc))
}
addToDropdown()

function displayDropdownCart(d) {
    let cartRow = document.querySelector(".dropdown-content");
    let card = document.createElement("ul");
    card.className = "row template-list";
    card.innerHTML = `<li class="p-2"> 
    <div class=""><img class="cartImg cart-img img-fluid"
                src="${d.image}">
        <div class="col">
            <div class="cartTitle row font-weight-bold">${d.title}</div>
            <div class="cartArtist row text-muted">${d.artist}</div>   
            <div class="cartQuantity row text-muted">Quantity: ${d.quantity}
        </div>  
        <div class="cartPrice font-weight-bold"> € ${d.price * d.quantity} 
        </div>
     </li>`
    cartRow.appendChild(card);

    //console.log(cartRow);
}