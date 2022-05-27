const http = require('http');
const store = require('./db.js');

const hostname = '127.0.0.1'; // localhost
const port = 3000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('Access-Control-Allow-Origin', '*'); // bei CORS Fehler
  response.setHeader('Access-Control-Allow-Methods', '*'); // erlaubt auch PUT und DELETE
  const url = new URL(request.url || '', `http://${request.headers.host}`);
  const id = url.searchParams.get('id');
  switch (url.pathname) {
    case '/freezerItems':
        switch(request.method){
            case 'GET':
                if(id){
                    response.write(JSON.stringify(store.getItem(id)));
                }
                else {
                    response.write(JSON.stringify(store.items));
                }
                break;
            case 'POST':{
                let jsonString = '';
                request.on('data', (data) => {
                    jsonString += data;
                });
                request.on('end', () => {
                    store.addItem(JSON.parse(jsonString));
                });
                break;
            }
            case 'PUT':{
                let jsonString = '';
                request.on('data', (data) => {
                    jsonString += data;
                });
                request.on('end', () => {
                    store.updateItem(JSON.parse(jsonString));
                });
                break;
            }
            case 'DELETE':
                if(id){
                    store.deleteItem(id);
                }
            case 'OPTIONS':
                break;
            default:
                response.statusCode = 404;
        }
    default:
        response.statusCode = 404;
  }
  response.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});