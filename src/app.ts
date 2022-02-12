import express from "express";
import cors from "cors";
import "dotenv/config";
import Server from "./lib/Server";
import { HealthCheckController } from "./controllers";
import customErrorHandler from "./middleware/global/errorHandler";
import MongooseService from "./services/MongooseService";

const server = new Server(express(), process.env.PORT);
const middleware = [cors(), express.json(), customErrorHandler];
const controllers = [new HealthCheckController()];
const databases = [MongooseService];

server.loadMiddleware(middleware);
server.loadControllers(controllers);
server.serveStatic("client", "./client");
server.connectToDatabase(databases);
server.run();
