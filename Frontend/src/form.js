async function showItem(){
  await readStorage();
  const id = new URLSearchParams(window.location.search).get('id');

  let input = document.getElementsByTagName("input");

  let saveButton = document.getElementById("save");
  saveButton.addEventListener("click", save);
  function save() {
    const newItem = {
      id: id,
      itemName: input[0].value,
      imageSrc: input[1].value,
      expiryDate: new Date(input[2].value)
    };
    //console.log(newItem);
    addItem(newItem);
    //console.log(items);
    window.location = "./index.html"
  }

  window.addEventListener("keydown", (event) => 
  {
    if(event.key === "Enter"){
      save(event);
    }
  });

  //Formular vorausfüllen
  input[2].value = new Date().toLocaleDateString('en-CA');
  if(id){
    const item = getItem(id);
    input[0].value = item.itemName;
    if(item.imageSrc){
      input[1].value = item.imageSrc;
    }
    input[2].value = new Date(item.expiryDate).toLocaleDateString('en-CA');
  }
}

showItem();