const Discord = require("discord.js")
const { Client, Intents } = require("discord.js")
require("dotenv").config()
const cmdHandler = require("./handler")

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS] })

client.once("ready", () => {
    console.log("Ready!")
    cmdHandler.set(client)
})

client.on("messageCreate", async (message) => {
    if (message.author.bot) return

    if (message.content == "디지야")
        message.channel.send("나?")
    else if (message.content.startsWith("디지야 "))
        cmdHandler.get(client, message)
})

client.login(process.env.BOT_TOKEN)
