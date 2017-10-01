console.log("Bot loading...");
const Discord = require("discord.js");
var bot = new Discord.Client();
var fs = require("fs");
var config = require('./storage/config.json');
var customCommands = require('./storage/custom.json');
var parties = require('./storage/parties.json');
var guilds = require('./storage/guilds.json');
var commands = require('./commands.js')
const TOKEN = config.token;
const BOTNAME = "IOU Bot 2.0";
const PREFIX = "?";
const BOTDESC = " is made with love (and nodejs) by Level \n" + "Type **" + PREFIX + "help** to get DMed the current list of commands \n" + "Type **" + PREFIX + "suggest** to get a link to suggestions";
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var boolFunCommands = false;
const TIMEOUT = 1500;

//Load Bot
//loop through functions in commands and add to hashmap
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
    
    for (c in customCommands) {
        if (args[0].toLowerCase() == c) {
            message.channel.send(customCommands[c]);
            return;
        }
    }

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
        message.channel.send("Invalid command, type **" + PREFIX + "help** to get current list of commands");
    }

    if (message.channel.type != "dm") {
        try {
            message.delete(TIMEOUT);
            throw err
        } catch (err) {
            console.log(err)
        }
    }
});
       
bot.login(TOKEN);
