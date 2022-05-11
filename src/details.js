let deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", deleteItem);
function deleteItem(event) {
    window.location = "./index.html";
}

let editButton = document.getElementById("edit");
editButton.addEventListener("click", editItem);
function editItem(event) {
    window.location = "./form.html";
}