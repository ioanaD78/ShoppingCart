// getting elements from local storage
// getting main container from HTML
let cart = JSON.parse(localStorage.getItem("cart"));
const cartRow = document.querySelector(".cart-row");

// if cart empty -> display empty cart page
// else -> display cart page with products
if (localStorage.getItem("cart") === null || cart.length == 0) {
    window.location.replace("/html/empty.html");
} else {
    displayCart()
}

// displaying cart in according HTML
function displayCart() {
    if (window.location.href.indexOf('/html/cart.html') > -1) {
        cart.forEach((disc) =>
            display(disc),
        )

        // creating the rows/cards for each product in the cart
        // and appending values from local storage
        function display(d) {
            let card = document.createElement("div");
            card.className = "row template-cart";
            card.innerHTML = `<div class="main container-xs row align-items-center mt-5 w-100" id="p-id-${d.id}">
        <div class=""><img class="cartImg cart-img img-fluid mx-4"
                src="${d.image}">
        </div>
        <div class="col-4">
            <div class="cartTitle row font-weight-bold">${d.title}</div>
            <div class="cartArtist row text-muted">${d.artist}</div>
            <div class="unit-price">${d.price}</div>
        </div>
        <div class="col-3">
            <button class="qty-btn minus btn" btnProd="btn-${d.id}"><i class=" bi bi-dash-circle-fill" btnProd="btn-${d.id}"></i></i></button>
            <input class="qty border text-dark p-2 text-center" value="${d.quantity}" style="width:35px;height:25px;">
            <button class="qty-btn plus btn" btnProd="btn-${d.id}"><i class=" bi bi-plus-circle-fill" btnProd="btn-${d.id}"></i></button>
        </div>
        <div class="cartPrice font-weight-bold">${d.price * d.quantity} 
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
let shipping = document.querySelector(".shipping")
let subtotal = document.querySelector(".subtotal")
let total = document.querySelector(".total")

function updateQuantity() {
    qtyBtns.forEach(sign => {

        sign.addEventListener('click', function (e) {
            //console.log(e.target);
            //getting parent element of button
            let currentDisc = document.querySelector(`#p-id-${e.target.getAttribute("btnProd").replace('btn-', '')}`);
            let currentDiscQty = currentDisc.querySelector('.qty');
            let prodSubtotal = currentDisc.querySelector('.cartPrice'); //price per product * qty
            let currentDiscPrice = currentDisc.querySelector('.unit-price'); //original price
            let cartProduct = cart.find(product => product.id === e.target.getAttribute("btnProd").replace('btn-', ''));

            if (sign.classList.contains('plus')) {
                //update quantity in HTML
                currentDiscQty.value = ++sign.previousElementSibling.value;
                //update quantity attribute on cart object
                cartProduct.quantity++;
            } else if (sign.classList.contains('minus') && sign.nextElementSibling.value > 1) {
                //update quantity in HTML
                currentDiscQty.value = --sign.nextElementSibling.value;
                //update quantity attribute on cart object
                cartProduct.quantity--;
            }

            prodSubtotal.innerText = parseInt(currentDiscQty.value) * Number(currentDiscPrice.innerText);

            //save updated quantity to local storage
            localStorage.setItem("cart", JSON.stringify(cart));

            updateSubtotal()
        })
    });
}
updateQuantity();

//update cart subtotal
function updateSubtotal() {
    let sub = 0;
    //display subtotal before updating quantities
    for (let i = 0; i < cart.length; i++) {
        sub += parseInt(cart[i].quantity) * parseInt(cart[i].price);
        subtotal.innerText = sub;
    }
    updateTotal();
}
updateSubtotal();

//update cart total
function updateTotal() {
    if (parseInt(subtotal.innerText) > 100) {
        total.innerText = subtotal.innerText;
        shipping.innerText = "Free shipping over 100!";
        shipping.classList.add("free");
    } else {
        shipping.innerText = 20
        let addedShipping = parseInt(shipping.innerText) + parseInt(subtotal.innerText);
        total.innerText = addedShipping;
        shipping.classList.remove("free");
    }
}


function updateShipping() {
    if (parseInt(subtotal.innerText) > 100) {
        shipping.innerText = "Free shipping over 100!";
        shipping.classList.add("free");
    } else {
        shipping.classList.remove("free");
        shipping.innerText = 20
    }
}

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

        //finding removed item in local storage
        const cartId = parentId.substring(6)
        const filtered = cart.filter(item => item.id !== cartId);
        //reloading page after each delete
        //and save the new data in local storage without the deleted item
        window.location = window.location
        localStorage.setItem("cart", JSON.stringify(filtered));
    });
});



