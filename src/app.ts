import express from "express";
import cors from "cors";
import "dotenv/config";
import { Server } from "./lib/Server";
import { HealthCheckController } from "./controllers";
import customErrorHandler from "./middleware/global/errorHandler";
import { mongooseService } from "./services/MongooseService";
import { writer } from "./utils/writer";
import { scriptRunner } from "./utils/scriptRunner";
import { v4 as uuidv4 } from "uuid";

const server = new Server(express(), process.env.PORT);
const middleware = [cors(), express.json(), customErrorHandler];
const controllers = [new HealthCheckController()];
const databases = [mongooseService];

server.loadMiddleware(middleware);
server.loadControllers(controllers);
server.serveStatic("API docs", "/api/docs", "./docs");
server.connectToDatabase(databases);
server.run();
