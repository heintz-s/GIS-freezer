const http = require('http');
const mongodb = require('mongodb');

const hostname = '127.0.0.1'; // localhost
const port = 3000;

const url = 'mongodb://localhost:27017'; // für lokale MongoDB
const mongoClient = new mongodb.MongoClient(url);

const defaultItems = [{
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

async function startServer() {
    // connect to database
    await mongoClient.connect();
    // optional: defaultItems einfügen, wenn Collection noch nicht existiert
    let collections = await mongoClient.db('freezer').listCollections().toArray();
    if(!collections.find(collection => collection.name == 'item')){
        mongoClient.db('freezer').collection('item').insertMany(defaultItems);
    }
    // listen for requests
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

const server = http.createServer(async (request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('Access-Control-Allow-Origin', '*'); // bei CORS Fehler
  const url = new URL(request.url || '', `http://${request.headers.host}`);
  const id = url.searchParams.get('id');
  const itemCollection = mongoClient.db('freezer').collection('item');
  switch (url.pathname) {
    case '/getItems':
        let items = await itemCollection.find({}).toArray();
        //console.log("getItems", items)
        response.write(JSON.stringify(items));
        break;
    case '/getItem':
        if(id){
            let items = await itemCollection.find({
                _id: new mongodb.ObjectId(id), // von Zahl zu MongoDB ID Objekt konvertieren
            }).toArray();
            //console.log("getItem", items[0]);
            response.write(JSON.stringify(items[0]));
        }
        break;
    case '/setItem':
        if(request.method === 'POST') {
            let jsonString = '';
            request.on('data', (data) => {
                jsonString += data;
            });
            request.on('end', () => {
                newItem = JSON.parse(jsonString);
                if(newItem._id){ // update
                    //console.log("update", newItem);
                    newItem._id = mongodb.ObjectId(newItem._id); // von Zahl zu MongoDB ID Objekt konvertieren
                    itemCollection.replaceOne({
                        _id: newItem._id,
                    },
                    newItem);
                }
                else{ // add
                    //console.log("insert", newItem);
                    itemCollection.insertOne(newItem);
                }
            });
        }
    case '/removeItem':
        //console.log("deleteItem", id);
        if(id){
            result = await itemCollection.deleteOne({
                _id: new mongodb.ObjectId(id), // von Zahl zu MongoDB ID Objekt konvertieren
            });
        }
        break;
    default:
        response.statusCode = 404;
  }
  response.end();
});


startServer();