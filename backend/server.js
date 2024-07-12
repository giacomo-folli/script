import path from "path";
import connectToDb from "./db/connect.js";
import configServer from "./utils/configServer.js";
import { server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

configServer(__dirname);

server.listen(PORT, () => {
  // connect to mongodb
  connectToDb();

  console.log(`Server Running on port ${PORT}`);
});
