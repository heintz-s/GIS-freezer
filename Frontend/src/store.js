const url = 'http://localhost:3000/';

//const itemsAsJson = localStorage.getItem("freezerItems") || JSON.stringify(defaultItems);
//let items = JSON.parse(itemsAsJson);
let items = [];

async function readStorage() {
    const response = await fetch(url+'getItems');
    const text = await response.text(); // Text aus Response Body
    items = JSON.parse(text);
}

async function addItem(newItem){
    fetch(url+'setItem', {
        method: 'post',
        body: JSON.stringify(newItem),
    });
}

async function getItem(id){
    const response = await fetch(url+'getItem?id='+id);
    const text = await response.text(); // Text aus Response Body
    item = JSON.parse(text);
    return item;
}

async function removeItem(id){
    await fetch(url+'removeItem?id='+id);
}