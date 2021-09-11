import Client from "./Client";

new Client({intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"]}).init();