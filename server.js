const http = require("http");

const app = require("./app");
//sets up server to run 
const PORT = 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Server is listening on PORT:", PORT);
});
