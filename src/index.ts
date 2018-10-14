import { Client } from "disharmony"
import { Message } from "./models/message";

let client = new Client("My bot", Message, require("./commands"))

client.initialize("MzM3MDA2NTU4NjI0MDg4MDc0.DpGlHw.55m4LRAqzPmLNsolqFCgMtes0MA")