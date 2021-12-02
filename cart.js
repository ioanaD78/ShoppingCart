const templateCart = document.querySelector(".template-cart")

const items = JSON.parse(localStorage.getItem('cart'));
const cartRow = document.querySelector(".cart-row")

window.onload = function () {
    if (window.location.href.indexOf('cart.html') > -1) {
        items.forEach((item) =>
            display(item),
        )

        function display(i) {
            let card = document.createElement("div");
            card.className = "row template-cart";
            card.innerHTML = `<div class="row main align-items-center p-2 mt-3 mb-5 w-100">
            <div class="col-2 p-1"><img class="cartImg cart-img img-fluid mx-4"
                    src="${i.image}">
            </div>
            <div class="col p-1">
                <div class="cartTitle row text-muted">${i.title}</div>
                <div class="cartArtist row">${i.artist}</div>
            </div>
            <div class="col-4">
                <button class="qty-btn btn"><i class="minus bi bi-dash-circle-fill"></i></i></button>
                <a class="qty border text-dark p-2">1</a>
                <button class="plus qty-btn btn"><i class="bi bi-plus-circle-fill"></i></button>
            </div>
            <div class="cartPrice col">${i.price}
            </div>
            <span class="remove btn"><i class="bi bi-trash-fill"></i></span>
        </div>`
            cartRow.appendChild(card);
            console.log(cartRow);
        }
    }
}



