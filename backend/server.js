import connectToDb from "./db/connect.js";
import configServer from "./utils/configServer.js";
import { server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

configServer();

server.listen(PORT, () => {
  // connect to mongodb
  connectToDb();

  console.log(`Server Running on port ${PORT}`);
});
