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


  //[x] Init
  public async init() {
    this.login(process.env.BOT_TOKEN);


    //[x] Commands
    const commandPath = path.join(__dirname, "..", "Commands");
    readdirSync(commandPath).forEach((dir) => {
        const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts'));

        for (const file of commands) {
            const { command } = require(`${commandPath}/${dir}/${file}`);
            this.commands.set(command.name, command);

            if(command?.aliases.length !== 0) {
                command.aliases.forEach((alias) => {
                    this.aliases.set(alias, command);
                })
            }
        }
    })

    //[x] Events
    const eventPath = path.join(__dirname, "..", "Events");
    readdirSync(eventPath).forEach(async (file) => {
        const {event} = await import(`${eventPath}/${file}`);
        this.events.set(event.name, event);
        console.log(event);
        this.on(event.name, event.run.bind(null, this));
    })
  }
}

export default ExtendsClient;
