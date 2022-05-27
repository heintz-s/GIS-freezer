class Store {
    constructor(url = 'http://localhost:3000/freezerItems'){
        this.url = url;
    }

    async getItems() {
        const response = await fetch(this.url);
        const text = await response.text();
        return JSON.parse(text);
    }

    async addItem(item){
        if(item.id){ // update
            fetch(this.url, {
                method: 'PUT',
                body: JSON.stringify(item),
            });
        }
        else { // add new
            fetch(this.url, {
                method: 'POST',
                body: JSON.stringify(item),
            });
        }
    }

    async deleteItem(id){
        await fetch(this.url+'?id='+id, {
            method: 'DELETE',
        });
    }

    async getItem(id){
        const response = await fetch(this.url+'?id='+id);
        const text = await response.text();
        return JSON.parse(text);
    }
}

const store = new Store();
