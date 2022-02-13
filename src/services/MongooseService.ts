import { logs } from "../lib/constants/logging";
import { IDatabase } from "../lib/Types";

class MongooseService implements IDatabase {
  async connect() {
    console.log(logs.db_success("MongoDB"));
  }
}

export const mongooseService = new MongooseService();
