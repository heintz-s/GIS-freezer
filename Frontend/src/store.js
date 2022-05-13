class Store {
    constructor(url = 'http://localhost:3000/'){
        this.url = url;
        //const itemsAsJson = localStorage.getItem(this.storageKey) || JSON.stringify(defaultItems); 
        this.items = [];
    }

    async readStorage() {
        const response = await fetch(this.url+'getItems');
        const text = await response.text(); // Text aus Response Body
        this.items = JSON.parse(text);
    }
      
    async updateStorage() {
        // localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        fetch(this.url+'setItems', {
            method: 'post',
            body: JSON.stringify(this.items),
        });
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
        this.updateStorage();
    }

    deleteItem(id){
        this.items = this.items.filter(item => item.id != id);
        this.updateStorage();
    }

    getItem(id){
        return this.items.filter(item => item.id == id)[0];
    }
}

const store = new Store();
