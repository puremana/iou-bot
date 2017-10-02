console.log("Bot loading...");
const Discord = require("discord.js");
var bot = new Discord.Client();
var config = require('./storage/config.json');
var customCommands = require('./storage/custom.json');
var commands = require('./commands.js')
const PREFIX = "?";
const TOKEN = config.token;
const TIMEOUT = 1500;

//Load Bot - loop through functions in commands and add to hashmap
var hashArray = [];
for (com in commands.functions) {
    hashArray.push(com);
}
commands.setters["setBot"](bot);

bot.on("ready", function() {
	console.log("Bot ready...");
	bot.user.setGame(PREFIX + "help " + PREFIX + "info")
    bot.user.setAvatar("./storage/avatar.png")
});

bot.on("message", function(message) {
	if (message.author.equals(bot.user)) {
		return;
    }
    
    if (message.content.includes("bot")) {
        message.react("\uD83D\uDC40");
    }

    if (!message.content.startsWith(PREFIX)) {
        return;
    }

    var args = message.content.substring(PREFIX.length).split(" ");

    //Hashmap stuff
    if (hashArray.indexOf(args[0].toLowerCase()) > -1) {
        try {
            commands.functions[args[0].toLowerCase()](message);
            throw err
        } catch (err) {
            console.log(err)
        }
    }
    else {
        if (customCommands.hasOwnProperty(args[0].toLowerCase())) {
            message.channel.send(customCommands[args[0].toLowerCase()]);
            deleteMessage(message);
            return;
        }
        message.channel.send("Invalid command, type **" + PREFIX + "help** to get current list of commands");
    }
    deleteMessage(message);
});
       
bot.login(TOKEN);

var deleteMessage = function(message) {
    if (message.channel.type != "dm") {
        try {
            message.delete(TIMEOUT);
            throw err
        } catch (err) {
            console.log(err)
        }
    }
}
