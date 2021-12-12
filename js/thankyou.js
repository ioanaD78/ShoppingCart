//display order details on thank you page
function displayOrderInfo() {
    let orderDetails = document.querySelector("#order-details");
    let shippingDetails = JSON.parse(localStorage.getItem("shipping-details"));

    if (window.location.href.indexOf('/html/thx.html') > -1) {
        shippingDetails.forEach((order) =>
            display(order))
    }

    function display(o) {
        let details = document.createElement("div");
        details.className = "row template-cart";
        details.innerHTML = `<p>${o.name}</p>
    <p>${o.email}</p>
    <p>${o.phone}</p>
    <p>${o.delivery}</p>`
        orderDetails.appendChild(details);
    }
}
displayOrderInfo()