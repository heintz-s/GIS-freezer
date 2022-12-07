const defaultItems = [{
    id: 1,
    itemName: "Banane",
    expiryDate: new Date(2022, 2, 30),
    imageSrc: "images/banane-klein.jpg",
},
{
    id: 2,
    itemName: "Eis",
    expiryDate: new Date(2022, 6, 10),
},
{
    id: 3,
    itemName: "Erbsen",
    expiryDate: new Date(2022, 6, 10),
},]

const itemsAsJson = localStorage.getItem("freezerItems") || JSON.stringify(defaultItems);
let items = JSON.parse(itemsAsJson);

function updateLocalStorage(){
    localStorage.setItem("freezerItems", JSON.stringify(items));
}

function addItem(newItem){
    if(newItem.id){ // update
        const index = items.findIndex(item => item.id == newItem.id);
        items[index] = newItem;
    }
    else{ // add
        newItem.id = new Date().valueOf();
        items.push(newItem);
    }
    updateLocalStorage();
}

function getItem(id){
    return items.find(item => item.id == id);
}

function removeItem(id){
    items = items.filter(item => item.id != id);
    updateLocalStorage();
}