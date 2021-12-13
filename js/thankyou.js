//display order details on thank you page
function displayOrderInfo() {
    let displayOrder = document.querySelector("#order-details");
    let orderDetails = JSON.parse(localStorage.getItem("cart"));

    orderDetails.forEach((order) =>
        display(order))

    function display(d) {
        let details = document.createElement("div");
        details.className = "col template-cart";
        details.innerHTML = `<img src=${d.image} class="p-3" style="width:150px; height:150px;">
        <small>${d.title}, </small>
    <small>quantity: ${d.quantity}</small>`
        displayOrder.appendChild(details);
    }
}
displayOrderInfo()

function displayShippingInfo() {
    let displayShipping = document.querySelector("#shipping-details");
    let shippingDetails = JSON.parse(localStorage.getItem("shipping-details"));

    shippingDetails.forEach((order) =>
        display(order))

    function display(o) {
        let details = document.createElement("div");
        details.className = "col template-cart";
        details.innerHTML = `
        <div class="row"><small>${o.name}</small></div>
        <div class="row"><small>${o.email}</small></div>
        <div class="row"><small>${o.phone}</small></div>
        <div class="row"><small>${o.address}</small></div>
        <div class="row"><small>${o.city}</small></div>
        <div class="row"><small>Delivery date: ${o.delivery}</small></div>`
        displayShipping.appendChild(details);
    }
}
displayShippingInfo()