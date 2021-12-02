fetch('discs.json')
    .then(response => response.json())
    .then(data => {
        localSave(data);
        data.forEach(disc => {
            createData(disc);
        });
    });


function localSave(discs) {
    localStorage.setItem("vinyls", JSON.stringify(discs));
}

const templateCard = document.querySelector(".templateCard");
function createData(discProd) {
    // cloning the product HTML template and assigning it to displayProd
    const displayProd = templateCard.cloneNode(true);

    //removing the template from the page
    templateCard.remove();

    //removing the "hidden" class from the cloned element so it becomes visible
    displayProd.classList.remove("templateCard");

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
        console.log(discProd.id);
        addToCart(discProd.id);
    })

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

