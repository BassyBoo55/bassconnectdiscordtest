// import requirements 
const {
    Client,
    Intents,
    MessageEmbed,
} = require('discord.js');

// starting in djs v13, we are required to specify which intents we are using in the client constructor
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const dotenv = require('dotenv')
// import config IDs
dotenv.config()
const TOKEN = process.env.TOKEN

const startup = require('./src/startup');
// run this script upon starting up the bot and pass in the client
startup(client)


var cache = new Map();
const { request } = require('./src/handlers/cache')

client.on('interactionCreate', async (interaction) => {
    // define constants
    const guild = client.guilds.cache.get(interaction.guild.id)
    const member = interaction.member

    // define roles needed for interaction
    const BassRole = guild.roles.cache.find(r => r.name == 'MyBass')
    
    if (interaction.isButton()) {
        const commandName = interaction.customId;
        var Embed = new MessageEmbed()
            .setColor('#00000')
            .setTitle('Base Embed')
            .setDescription('Base Description')
            .setThumbnail('https://www.videogameschronicle.com/files/2021/05/discord-new-logo.jpg')

        // check button clicked by customID
        if (commandName == 'Join') {

            Embed.setColor('#F9D7D3')
            Embed.setTitle('Cake')
            Embed.setDescription('You are now a Cakeist!')
            Embed.setThumbnail('https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80')
            member.roles.add(cakeRole)
            return interaction.reply({
                //content: 'You are now a Cakeist!',
                ephemeral: true,
                embeds: [Embed]
            })
        }
    if (interaction.isCommand()) {

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        if (command == 'start' || command == 'setup') {
            console.log('ran a non-baking command')
            return await command.execute(client, interaction)
        } else {

            return await request(client, interaction, cache)
        }

    }

}

client.login(TOKEN);})