fetch('discs.json')
    .then(response => response.json())
    .then(data => {
        localSave(data);
        data.forEach(disc => {
            createData(disc);
        });
    });

let rowDiv = document.querySelector(".row");

function localSave(discs) {
    localStorage.setItem("vinyls", JSON.stringify(discs));
}

const templateCard = document.querySelector(".templateCard");

function createData(discProd) {
    const displayProd = templateCard.cloneNode(true);
    displayProd.classList.remove("templateCard");

    console.log(discProd);

    displayProd.querySelector(".mockImg").src = discProd.image;
    displayProd.querySelector(".mockTitle").innerHTML = discProd.title;
    displayProd.querySelector(".mockArtist").innerHTML = discProd.artist;
    displayProd.querySelector(".mockDescription").innerHTML = discProd.description;
    displayProd.querySelector(".mockPrice").innerHTML = "$" + discProd.price;

    products.appendChild(displayProd);

    displayProd.querySelector("mockButton");
}

