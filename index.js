const Discord = require('discord.js');
const { prefix, discordToken, omdbToken } = require('./config.json');
const fs = require('fs');   //node file handler


const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));  //bring in files from commands folder


for (const file of commandFiles) {                   //adding commands to client collection
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);  
}



client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', message => {
    
    
    if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();


        const command = client.commands.get(commandName) || 
                        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); //put command arg into variable
        
        if (!command) return;

        if (command.args && !args.length) { //checks for arguments if required in command
            		let reply = `You didn't provide any arguments, ${message.author}!`;
            
            		if (command.usage) {
            			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            		}
            
            		return message.channel.send(reply);
        }





        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }


    });




client.login(discordToken);