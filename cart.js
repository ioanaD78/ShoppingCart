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
            card.innerHTML = `<div class="container-fluid row main align-items-center mt-5 w-100">
            <div class=""><img class="cartImg cart-img img-fluid mx-4"
                    src="${i.image}">
            </div>
            <div class="col-4">
                <div class="cartTitle row font-weight-bold">${i.title}</div>
                <div class="cartArtist row text-muted">${i.artist}</div>
            </div>
            <div class="col-3">
                <button class="qty-btn btn"><i class="minus bi bi-dash-circle-fill"></i></i></button>
                <a class="qty border text-dark p-2">1</a>
                <button class="plus qty-btn btn"><i class="bi bi-plus-circle-fill"></i></button>
            </div>
            <div class="cartPrice  font-weight-bold">€ ${i.price}
            </div>
            <div class="remove btn"><i class="bi bi-trash-fill"></i></div>
        </div>`
            cartRow.appendChild(card);
            console.log(cartRow);
        }
    }
}



