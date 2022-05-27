const defaultItems = [{
    id: 1,
    itemName: "Banane",
    expiryDate: new Date(2022, 2, 30),
    addDate: new Date(2022, 1, 10),
    imageSrc: "images/banane-klein.jpg",
},
{
    id: 2,
    itemName: "Eis",
    expiryDate: new Date(2022, 6, 10),
    addDate: new Date(2022, 1, 10),
},
{
    id: 3,
    itemName: "Erbsen",
    expiryDate: new Date(2022, 6, 10),
    addDate: new Date(2022, 1, 10),
},]

class Store {
    constructor(){
        this.items = defaultItems;
    }

    // Create
    addItem(item){
        item.id = new Date().valueOf();
        this.items[this.items.length] = item;
    }

    // Read
    getItem(id){
        return this.items.filter(item => item.id == id)[0];
    }

    // Update
    updateItem(item){
        if(!item || !item.id){
            console.warn("Fehler beim Update, keine ID");
            return;
        }
        const index = this.items.findIndex(storedItem => storedItem.id == item.id);
        this.items[index] = item;
    }

    // Delete
    deleteItem(id){
        this.items = this.items.filter(item => item.id != id);
    }
}

const store = new Store();

module.exports = store;