import {Command} from "../../Interfaces/";

export const command: Command = {
    name: "ping",
    aliases: ["hello","@"],
    run: async(client, message, args) => {
        message.channel.send(`${client.ws.ping}ms 🏓`)
    }
}