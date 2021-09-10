import Client from "./Client";

const bot = new Client({intents: ["GUILDS", "DIRECT_MESSAGES", "GUILD_MESSAGES"]});

bot.init();