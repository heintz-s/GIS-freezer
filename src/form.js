let saveButton = document.getElementById("save");
saveButton.addEventListener("click", save);
let input = document.getElementsByTagName("input");
function save() {
  store.addItem({
    id: id,
    itemName: input[0].value,
    imageSrc: input[1].value,
    expiryDate: new Date(input[2].value),
    addDate: item? item.addDate : new Date()
  });
  window.location = "./index.html"
}

window.addEventListener("keydown", (event) => 
 {
  if(event.key === "Enter"){
    save(event);
  }
});

const id = new URLSearchParams(window.location.search).get('id');
const item = store.getItem(id);
input[2].value = new Date().toLocaleDateString('en-CA');
if(id){
  input[0].value = item.itemName;
  if(item.imageSrc){
    input[1].value = item.imageSrc;
  }
  input[2].value = new Date(item.expiryDate).toLocaleDateString('en-CA');
}