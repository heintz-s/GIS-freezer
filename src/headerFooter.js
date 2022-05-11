// create footer
let footer = document.createElement("footer");
footer.textContent = "Seite wurde erstellt von: S. Heintz";
document.body.append(footer);

//create header
let header = document.createElement("header");
let heading = document.createElement("h1");
heading.textContent = "Mein Gefrierschrank";
//header.append(heading);
document.body.insertBefore(header, document.body.firstChild);

// create nav in header
let nav = document.createElement("nav");
nav.id = "menu";
header.append(heading, nav);
let title = ["Inhalt", "Neues Item"];
let href = ["/index.html", "/form.html"];
// bessere Lösung mit Objekten -> später
for(i in title){
    let navItem;
    //console.log(window.location.pathname);
    //console.log(href);
    if(window.location.pathname == href[i]){
        navItem = document.createElement("strong");
    }
    else {
        navItem = document.createElement("a");
        navItem.href = "."+href[i];
    }
    navItem.className = "navItem";
    navItem.textContent = title[i];
    nav.appendChild(navItem);
}
