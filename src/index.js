const items = [{
    itemName: "Banane",
    expiryDate: new Date(2022, 2, 30),
    imageSrc: "images/banane-klein.jpg",
},
{
    itemName: "Eis",
    expiryDate: new Date(2022, 6, 10),
},
{
    itemName: "Erbsen",
    expiryDate: new Date(2022, 6, 10),
},]

const main = document.getElementsByTagName('main')[0]
for(item of items){
    const a = document.createElement('a');
    a.href = 'details.html';
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
    dateP.textContent = item.expiryDate.toLocaleDateString();
    div.append(nameP, dateP);
    a.append(div);
    main.append(a);
}