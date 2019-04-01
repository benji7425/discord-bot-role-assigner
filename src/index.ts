import { Client } from "disharmony"
import { Message } from "./models/message";

let client = new Client("Role Assigner", require("./commands"), Message)

client.initialize(require("fs").readFileSync("./token", "utf8"))