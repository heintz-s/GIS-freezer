let saveButton = document.getElementById("save");
saveButton.addEventListener("click", save);
function save() {
  let input = document.getElementsByTagName("input");
  for(i of input){
    console.log(i.value);
  }
  //window.location = "./index.html"
}

window.addEventListener("keydown", (event) => 
 {
  if(event.key === "Enter"){
    save(event);
  }
});