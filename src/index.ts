import { Client } from "disharmony"
import { Message } from "./models/message"

let client = new Client("My bot", Message, require("./commands"))

client.initialize(require("fs").readFileSync("./token", "utf8"))