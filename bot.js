const Discord = require("discord.js");
var bot = new Discord.Client();
var fs = require("fs");
var config = require('./storage/config.json');
var customCommands = require('./storage/custom.json');
var parties = require('./storage/parties.json');
const TOKEN = config.token;
const BOTNAME = "IOU Friend";
const PREFIX = "?";
const BOTDESC = " is made with love (and nodejs) by Level \n" + "Type **?help** to get DMed the current list of commands \n" + "Type **?suggest** to get a link to suggestions";

bot.on("ready", function() {
	console.log("Bot ready...")
	bot.user.setGame("?help ?info")
    bot.user.setAvatar("./storage/avatar.png")
    //bot.user.setUsername(BOTNAME)
});

bot.on("message", function(message) {
	if (message.author.equals(bot.user)) {
		return;
	}
    
    if (!message.content.startsWith(PREFIX)) {
        return;
    }
    
    var args = message.content.substring(PREFIX.length).split(" ");
    
    for (c in customCommands) {
        if (args[0] == c) {
            message.channel.send(customCommands[c]);
            return;
        }
    }
    
    switch (args[0].toLowerCase()) {
        //Challenge Commands
        case "bronze":
            if (message.channel.id == "355250699841568768") {
                message.channel.send("http://i.imgur.com/POra9Kx.jpg");
            }
            break;
        case "silver":
            if (message.channel.id == "355250699841568768") {
                message.channel.send("http://i.imgur.com/rkJ51fC.jpg");
            }
            break;
        case "gold":
            if (message.channel.id == "355250699841568768") {
                message.channel.send("http://i.imgur.com/5GXghiA.jpg");
            }
            break;
            
        //Event Commands
        case "invasion":
            message.channel.send("https://docs.google.com/spreadsheets/d/1RDw0FEdFd6lKhmvMK972J5_xvvjVYeUYrTQQ4ZbMR74/edit");
            break;
        case "energyevent":
            message.channel.send("https://docs.google.com/spreadsheets/d/1R97uuDvEI80LBbqxveXIyHbwMGXG-nZsGvlH5YNoiV8/edit");
            break;
        case "rpg": 
            message.channel.send("https://docs.google.com/document/d/1laVfybGGtTsXs_jeXQcE9yUpV8xz0FMokBFvCSIcIa4/edit?usp=sharing")
            break;
        case "mafia":
            message.channel.send("https://docs.google.com/spreadsheets/d/1AzBi0Dt9AePvASVeiWAUSSVcpTHfpQlUzDrIWxCL8AA/edit#gid=0");
            break;
        
        //Bot Related Commands
        case "help":
            var customP = "";
            for (c in customCommands) {
                customP = customP + PREFIX + c + "\n";
            }
            var help = "**Bot Related Commands** \n" +
            PREFIX + "help \n" + 
            PREFIX + "info \n" +
            PREFIX + "suggest \n" +
            PREFIX + "add *(IOU Team only)* \n" +  
            PREFIX + "remove *(IOU Team only)* \n" +  
            "**Challenge Commands** \n" +
            PREFIX + "bronze \n" +
            PREFIX + "silver \n" +
            PREFIX + "gold \n" +
            "**Party/Guild Commands** \n" +
            PREFIX + "addparty \n" +
            PREFIX + "removeparty \n" +
            PREFIX + "resetparties *(IOU Team only)*\n" +
            PREFIX + "parties \n" +
            PREFIX + "partyhelp \n" +
            "**Event Commands** \n" +
            PREFIX + "invasion \n" + 
            PREFIX + "energyevent \n" + 
            PREFIX + "rpg \n" + 
            PREFIX + "mafia \n" + 
            "**Useful Links** \n" + 
            PREFIX + "guide \n" +
            PREFIX + "multicalc \n" +
            PREFIX + "forum \n" +
            PREFIX + "wiki \n" +
            PREFIX + "cards \n" +
            PREFIX + "test \n" +
            PREFIX + "trello \n" +
            "**Custom Commands** \n" +
            customP;
            message.author.send(help);
            break;
        case "info":
            var embed = new Discord.RichEmbed()
                .addField(BOTNAME, BOTNAME + BOTDESC)
                .setColor(0x9B59B6)
                .setFooter("Source code: https://github.com/puremana/iou-bot")
                .setThumbnail(bot.user.avatarURL)
            message.channel.send(embed);
            break;
        case "suggest":
            message.channel.send("Suggest a change to the bot by creating an issue at https://github.com/puremana/iou-bot/issues");
            break;
        case "add":
            if (message.member.roles.find("name", "IOU Team")) {
                var desc = "";
                for (d = 2; d < args.length; d++) {
                    desc = desc + args[d] + " ";
                }
                var command = "\'" + args[1] + "': '" + desc + "',";
                customCommands[args[1]] = desc;
                fs.writeFile("storage/custom.json", JSON.stringify(customCommands), "utf8");
                message.channel.send("Command " + PREFIX + args[1] + " added.");
            }
            else {
                message.channel.send("You do not have the IOU Team role.");
            }
            break;
        case "remove":
            if (message.member.roles.find("name", "IOU Team")) {
                for (c in customCommands) {
                    if (args[1] == c) {
                        delete customCommands[c];
                        fs.writeFile("storage/custom.json", JSON.stringify(customCommands), "utf8");
                        message.channel.send("Command " + PREFIX + args[1] + " removed.");
                        return;
                    }
                }
                message.channel.send("There is no " + PREFIX + args[1] + " command.");
            }
            else {
                message.channel.send("You do not have the IOU Team role.");
            }
            break;
        
        //Parties - Guilds    
        case "addparty":
            var date = new Date();
            var current = date.toString();
            var desc = "";
            for (i = 2; i < args.length; i++) {
                desc = desc + args[i] + " ";
            }
            //make it an array :]
            var pJson = [current, message.member.displayName, args[1], desc];
            parties[message.member.id] = pJson;
            fs.writeFile("storage/parties.json", JSON.stringify(parties), "utf8");
            message.channel.send("Party added. Type **?parties** to get sent a list of current available parties");
            break;
        case "removeparty":
            for (p in parties) {
                if (message.member.id == p) {
                    delete parties[p];
                    fs.writeFile("storage/parties.json", JSON.stringify(parties), "utf8");
                    message.channel.send("Party removed.");
                    return;
                }
            }
            message.channel.send("Couldn't find party for " + message.member.displayName);
            break;
        case "resetparties":
            if (message.member.roles.find("name", "IOU Team")) {
                parties = {};
                parties["id"] = ['time','name','required dps','description'];
                fs.writeFile("storage/parties.json", JSON.stringify(parties), "utf8");
                message.channel.send("All parties have been reset.");
            }
            else {
                message.channel.send("You do not have the IOU Team role.");
            }
            break;
        case "parties":
            for (p in parties) {
                var embed = new Discord.RichEmbed()
                .addField(parties[p][1] + " - " + parties[p][2], parties[p][3])
                .setColor(0x1A8CBE)
                .setFooter(parties[p][0])
                message.author.send(embed);
            }
            break;
        case "partyhelp":
            message.channel.send("Type **?addparty** with the following format to add a party \n" + "`?addparty required-dps description`");
            break;
            
        //Useful Links
        case "guide":
            message.channel.send("https://tinyurl.com/IOUguide");
            break;
        case "multicalc":
            message.channel.send("https://docs.google.com/spreadsheets/d/1QGBm6KtcOZraqSkLWVuqTF16vUD7rrOvIpdh59bFLmg/edit#gid=357923173");
            break;
        case "forum":
            message.channel.send("http://iourpg.com/forum");
            break;
        case "wiki":
            message.channel.send("http://iourpg.wikia.com/wiki/Idle_Online_Universe_Wiki");
            break;
        case "cards":
            message.channel.send("http://iouhelper.com/cards.html");
            break;
        case "test":
            message.channel.send("https://discord.gg/ncEarFv");
            break;
        case "trello":
            message.channel.send("https://trello.com/b/usVhG9Ry/iou-development-board");
            break;
            
        default:
            message.channel.send("Invalid command, type **?help** to get current list of commands");
    }
});
       
bot.login(TOKEN);