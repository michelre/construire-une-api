const http = require ('http');

//importation  de app.js
const app = requiren('./app')

app.set ('port',process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);