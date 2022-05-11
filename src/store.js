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
    constructor(storageKey = 'fridgeItems'){
        this.storageKey = storageKey;
        const itemsAsJson = localStorage.getItem(this.storageKey) || JSON.stringify(defaultItems); 
        this.items =  JSON.parse(itemsAsJson);
    }

    updateLocalStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    }

    addItem(item){
        if(item.id){ // update
            const index = this.items.findIndex(storedItem => storedItem.id == item.id);
            this.items[index] = item;
        }
        else { // add new
            item.id = new Date().valueOf();
            this.items[this.items.length] = item;
        }
        this.updateLocalStorage();
    }

    deleteItem(id){
        this.items = this.items.filter(item => item.id != id);
        this.updateLocalStorage();
    }

    getItem(id){
        return this.items.filter(item => item.id == id)[0];
    }
}



const store = new Store();
