let discs = JSON.parse(localStorage.getItem("cart"));
const cartRow = document.querySelector(".cart-row");


if (localStorage.getItem("cart") === null) {
    window.location.replace("empty.html");

} else {
    displayCart();
}

function displayCart() {
    if (window.location.href.indexOf('cart.html') > -1) {
        discs.forEach((disc) =>
            display(disc),
        )

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
            <input class="qty border text-dark p-2" value="1">
            <button class="qty-btn plus btn"><i class=" bi bi-plus-circle-fill"></i></button>
        </div>
        <div class="cartPrice  font-weight-bold">€ ${d.price}
        </div>
        <div class="remove btn" data-name="${d.name}"><i class="bi bi-trash-fill"></i></div>
    </div>`
            cartRow.appendChild(card);
            console.log(cartRow);
        }
    }
}

//adjusting product quantity
const qtyBtns = document.querySelectorAll(".qty-btn");
function updateQuantity() {
    qtyBtns.forEach(sign => {
        sign.addEventListener('click', function () {

            if (sign.classList.contains('plus')) {
                value = ++sign.previousElementSibling.value;
                console.log(value)
            } else if (sign.classList.contains('minus') && sign.nextElementSibling.value > 1) {
                value = --sign.nextElementSibling.value;
                console.log(value)
            }
            //updateProductSubtotal();
        })
    });
}
updateQuantity();

//removing product from cart
const remove = document.querySelectorAll(".remove")
remove.forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(".main").remove();
    });
});

//updating each product's subtotal


//updating cart subtotal

//updating total
const qty = document.querySelector(".qty")
function updateTotal() {
    let total = 0;
    for (let i = 0; i < discs.length; i += 1) {
        total += discs[i].price * qty.value
        console.log(total)
    }
    return total.toFixed(2)

}
updateTotal()