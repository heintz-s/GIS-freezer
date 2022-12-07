let deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", deleteItem);
function deleteItem(event) {
    removeItem(id);
    window.location = "./index.html";
}

let editButton = document.getElementById("edit");
editButton.addEventListener("click", editItem);
function editItem(event) {
    window.location = "./form.html?id="+id;
}

const id = new URLSearchParams(window.location.search).get('id');
const div = document.getElementsByClassName('itemDetails')[0];
const item = getItem(id);

const nameP = document.createElement('p');
nameP.textContent = `Bezeichnung: ${item.itemName}`;
const dateP = document.createElement('p');
dateP.textContent = `Ablaufdatum: ${new Date(item.expiryDate).toLocaleDateString()}`; //Date wiederherstellen
div.insertBefore(dateP, div.firstChild);
div.insertBefore(nameP, div.firstChild);

if(item.imageSrc){
    const image = document.createElement('img');
    image.src = item.imageSrc;
    image.alt = item.itemName;
    div.insertBefore(image, div.firstChild);
}