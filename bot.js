console.log("Bot loading...");
const Discord = require("discord.js");
var bot = new Discord.Client();
var config = require('./storage/config.json');
var customCommands = require('./storage/custom.json');
var commands = require('./commands.js')
var schedule = require('node-schedule');
const PREFIX = "?";
const TOKEN = config.token;
const TIMEOUT = 1500;
const questionRegex = /^[?]+$/;
const botRegex = /\bbot\b/;
const serverID = "146007387466235905";

//Load Bot - loop through functions in commands and add to hashmap
var hashArray = [];
for (com in commands.functions) {
    hashArray.push(com);
}
commands.setters["setBot"](bot);

//scheduler for bingo
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0,6];
rule.hour = [1,5,9,13,17,21];
rule.minute = 50;
//set to utc
rule.tz = 'America/Atikokan';

var bingoFunction = schedule.scheduleJob(rule, function() {
    var bingoRole = bot.guilds.find(val => val.id === serverID).roles.find(bin => bin.name === "bingo");
    bot.guilds.find(val => val.id === serverID).channels.find(bin => bin.name === "bingo").send("<@&" + bingoRole.id + "> 10 Minutes till Bingo! :tada:");
});

bot.on("ready", function() {
	console.log("Bot ready...");
	bot.user.setActivity(PREFIX + "help " + PREFIX + "info");
    bot.user.setAvatar("./storage/avatar.png")
        .catch(err => console.log(err));
});

bot.on("error", console.error)

try {
    bot.on("message", function(message) {
        if (message.author.equals(bot.user)) {
            return;
        }
        
        if (botRegex.test(message.content.toLowerCase())) {
            message.react("\uD83D\uDC40");
        }

        if (!message.content.startsWith(PREFIX)) {
            return;
        }

        if (questionRegex.test(message.content)) {
            return;
        }

        var args = message.content.substring(PREFIX.length).split(" ");

        //Hashmap stuff
        if (hashArray.indexOf(args[0].toLowerCase()) > -1) {
            try {
                commands.functions[args[0].toLowerCase()](message);
            } catch (err) {
                console.log(err)
            }
        }
        else {
            if (customCommands.hasOwnProperty(args[0].toLowerCase())) {
                message.channel.send(customCommands[args[0].toLowerCase()])
                    .catch(err => console.log(err));
                deleteMessage(message);
                return;
            }
            message.channel.send("Invalid command, type **" + PREFIX + "help** to get current list of commands")
                .catch(err => console.log(err));
        }
        deleteMessage(message);
    });
} catch (err) {
    console.log(err)
}
       
bot.login(TOKEN);

var deleteMessage = function(message) {
    if (message.channel.type != "dm") {
        message.delete(TIMEOUT)
            .catch(err => console.log(err));
    }
}
