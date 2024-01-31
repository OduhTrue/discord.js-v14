const Discord = require("discord.js")
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js")
const mongoose = require('mongoose')
const config = require("./config.json")

const client = new Discord.Client({
  intents: [1, 512, 32768, 2, 128,
  Discord.IntentsBitField.Flags.DirectMessages,
  Discord.IntentsBitField.Flags.GuildInvites,
  Discord.IntentsBitField.Flags.GuildMembers,
  Discord.IntentsBitField.Flags.GuildPresences,
  Discord.IntentsBitField.Flags.Guilds,
  Discord.IntentsBitField.Flags.MessageContent,
  Discord.IntentsBitField.Flags.Guilds,
  Discord.IntentsBitField.Flags.GuildMessageReactions,
  Discord.IntentsBitField.Flags.GuildEmojisAndStickers
],
  partials: [
    Discord.Partials.User,
    Discord.Partials.Message,
    Discord.Partials.Reaction,
    Discord.Partials.Channel,
    Discord.Partials.GuildMember
  ]
});

module.exports = client

client.on('interactionCreate', (interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    cmd.run(client, interaction)

  }
})

client.slashCommands = new Discord.Collection()

require('./handler')(client)

const fs = require('fs');

fs.readdir('./eventos', (err, file) => {
  file.forEach(event => {
    require(`./eventos/${event}`)
  })
})

client.login(config.token)