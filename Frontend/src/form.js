async function displayItem(){
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
      save();
    }
  });

  const id = new URLSearchParams(window.location.search).get('id');
  let item;
  if(id){
    item = await store.getItem(id);
    input[0].value = item.itemName;
    if(item.imageSrc){
      input[1].value = item.imageSrc;
    }
    input[2].value = new Date(item.expiryDate).toLocaleDateString('en-CA');
  }
  else {
    input[2].value = new Date().toLocaleDateString('en-CA');
  }
}

displayItem();