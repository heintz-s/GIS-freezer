async function displayItems(){
    await store.readStorage();
    const items = store.items;
    const main = document.getElementsByTagName('main')[0]
    for(item of items){
        const a = document.createElement('a');
        a.href = `details.html?id=${item.id}`; // id an URL anhängen
        const div = document.createElement('div');
        div.className = 'freezerItem';
        if(item.imageSrc){
            const image = document.createElement('img');
            image.src = item.imageSrc;
            image.width = '200px';
            image.height = '150px';
            image.alt = item.itemName;
            div.append(image);
        }
        const nameP = document.createElement('p');
        nameP.textContent = item.itemName;
        const dateP = document.createElement('p');
        dateP.textContent = new Date(item.expiryDate).toLocaleDateString(); //Date wiederherstellen
        div.append(nameP, dateP);
        a.append(div);
        main.append(a);
    }
}

displayItems();
