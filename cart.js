// getting elements from local storage
// getting main container from HTML
let cart = JSON.parse(localStorage.getItem("cart"));
const cartRow = document.querySelector(".cart-row");

// if cart empty -> display empty cart page
// else -> display cart page with products
if (localStorage.getItem("cart") === null) {
    window.location.replace("empty.html");

} else {
    displayCart();
}

// displaying cart in according HTML
function displayCart() {
    if (window.location.href.indexOf('cart.html') > -1) {
        cart.forEach((disc) =>
            display(disc),
        )

        // creating the rows/cards for each product in the cart
        // and appending values from local storage
        function display(d) {
            let card = document.createElement("div");
            card.className = "row template-cart";
            card.innerHTML = `<div class="main container-fluid row align-items-center mt-5 w-100" id="p-id-${d.id}">
        <div class=""><img class="cartImg cart-img img-fluid mx-4"
                src="${d.image}">
        </div>
        <div class="col-4">
            <div class="cartTitle row font-weight-bold">${d.title}</div>
            <div class="cartArtist row text-muted">${d.artist}</div>
        </div>
        <div class="col-3">
            <button class="qty-btn minus btn"><i class=" bi bi-dash-circle-fill"></i></i></button>
            <input class="qty border text-dark p-2 text-center" value="1" style="width:30px;height:25px;">
            <button class="qty-btn plus btn"><i class=" bi bi-plus-circle-fill"></i></button>
        </div>
        <div class="cartPrice  font-weight-bold">${d.price}
        </div>
        <div class="remove btn" data-name="${d.name}"><i class="bi bi-trash-fill"></i></div>
    </div>`
            cartRow.appendChild(card);
            //console.log(cartRow);
        }
    }
}

/////////////////////////////////////////////////////

// operations with products

// adjusting product quantity
const qtyBtns = document.querySelectorAll(".qty-btn");
function updateQuantity() {
    qtyBtns.forEach(sign => {
        sign.addEventListener('click', function () {

            if (sign.classList.contains('plus')) {
                value = sign.previousElementSibling.value++;
                console.log(value)
                updateProdSubtotal()
            } else if (sign.classList.contains('minus') && sign.nextElementSibling.value > 1) {
                value = sign.nextElementSibling.value--;
                console.log(value)
                updateProdSubtotal()
            }

        })
    });
}
updateQuantity();

//removing product from cart
const remove = document.querySelectorAll(".remove")
remove.forEach(btn => {
    btn.addEventListener('click', function () {
        for (let i = 0; i < cart.length; i++) {

            console.log(cart[i].id)
        }
    });
});
///////////////////////////////////////////////////

//updating cart prices

const shipping = document.querySelector(".shipping")
const subtotal = document.querySelector(".subtotal")
const total = document.querySelector(".total")
const qty = document.querySelector(".qty")
const prodSubtotal = document.querySelector(".cartPrice")
console.log(parseInt(qty.value))

//updating each product's subtotal
function updateProdSubtotal() {
    prodSubtotal.innerText = parseInt(qty.value) * parseInt()// product price

}


//updating cart subtotal
function updateSubTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i += 1) {
        total += cart[i].price * qty.value

    }

    subtotal.innerText = Number(total.toFixed(2))
    console.log(parseInt(subtotal.innerText))
    updateShipping()
    updateTotal()
}
updateSubTotal()

//updating shipping
function updateShipping() {
    if (parseInt(subtotal.innerText) > 100) {
        shipping.innerText = "Free shipping over 100!"
        shipping.classList.add("free")
    }
}

//updating car total
function updateTotal() {
    if (parseInt(shipping.innerText) != 20) {
        total.innerText = parseInt(subtotal.innerText)
    } else {
        let addedShipping = parseInt(shipping.innerText) + parseInt(subtotal.innerText)
        total.innerText = addedShipping
    }
}