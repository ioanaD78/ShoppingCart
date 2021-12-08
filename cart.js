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
        <button class="remove btn" id="b-id-${d.id}"><i class="bi bi-trash-fill"></i></button>
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
            console.log(this.id)
            if (sign.classList.contains('plus')) {
                value = ++sign.previousElementSibling.value;
                console.log(value)
                updateProdSubtotal()
            } else if (sign.classList.contains('minus') && sign.nextElementSibling.value > 1) {
                value = --sign.nextElementSibling.value;
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
        //console.log(this.id)

        //getting the id of the element each button is attached to
        //btn id like "b-id-1"; product id like "p-id-1"
        const parentId = "#p" + this.id.substring(1);
        //console.log(parentId)

        //removing the specific element from HTML
        document.querySelector(parentId).remove();

        //removing fromlocal storage
        const cartId = parentId.substring(6)
        const filtered = cart.filter(item => item.id !== cartId);
        //reloading page after each delete & save the new data in local storage
        window.location = window.location
        localStorage.setItem("cart", JSON.stringify(filtered));
    });
});

///////////////////////////////////////////////////

//updating cart prices

const shipping = document.querySelector(".shipping")
const subtotal = document.querySelector(".subtotal")
const total = document.querySelector(".total")
const qty = document.querySelector(".qty")
const prodSubtotal = document.querySelector(".cartPrice")
const prodCart = document.querySelectorAll(".main")
console.log(parseInt(qty.value))

//updating each product's subtotal
function updateProdSubtotal() {
    prodCart.forEach(mn => {
        prodSubtotal.innerText = parseInt(qty.value) * 29

    })
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

//updating cart total
function updateTotal() {
    if (parseInt(shipping.innerText) != 20) {
        total.innerText = parseInt(subtotal.innerText)
    } else {
        let addedShipping = parseInt(shipping.innerText) + parseInt(subtotal.innerText)
        total.innerText = addedShipping
    }
}