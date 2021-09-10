require("dotenv").config();
import { Client, Collection } from "discord.js";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { readdirSync } from "fs";
import { Command, Config, Event } from "../Interfaces";

class ExtendsClient extends Client {

    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public aliases: Collection<string, Command> = new Collection();

    public async init() {
        this.login(process.env.BOT_TOKEN);

        this.on("ready", () => {
            console.log("Bot online ✅")
        })
    }
}

export default ExtendsClient;