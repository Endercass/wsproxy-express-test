import express from "express";
import http from "http";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { cli_logger, ModuleLoader, Server } from "wsproxy-ng";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(__dirname + "/../public"));

app.listen({ port: 3000 }, () => {
  console.log("Listening on port 3000");
});

let server = http.createServer(app);

const wsProxyConfig = {
  port: 3001,
  logger: cli_logger,
  modules: new ModuleLoader(`${__dirname}/../modules`),
  server,
};

let wsProxy = new Server(wsProxyConfig);
wsProxy.listen();
