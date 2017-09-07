const Discord = require("discord.js");
var bot = new Discord.Client();
var config = require('./storage/config.json');
const TOKEN = config.token;
const BOTNAME = "IOU Friend";
const PREFIX = "?";
const BOTDESC = " is made with love (and nodejs) by Level \n" + "Type ?help to get DMed the current list of commands \n" + "Type ?suggest to get a link to suggestions";

bot.on("ready", function() {
	console.log("Bot ready...")
	bot.user.setGame("?help ?info");
    bot.user.setAvatar("./storage/avatar.png")
    bot.user.setUsername(BOTNAME)
});

bot.on("message", function(message) {
	if (message.author.equals(bot.user)) {
		return;
	}
    
    if (!message.content.startsWith(PREFIX)) {
        return;
    }
    
    var args = message.content.substring(PREFIX.length).split(" ");
    
    switch (args[0].toLowerCase()) {
        //Challenge Commands
        case "bronze":       
            message.channel.send("http://i.imgur.com/POra9Kx.jpg");
            break;
        case "silver":
            message.channel.send("http://i.imgur.com/rkJ51fC.jpg");
            break;
        case "gold":
            message.channel.send("http://i.imgur.com/5GXghiA.jpg");
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
            var help = "**Bot Related Commands** \n" +
            PREFIX + "help \n" + 
            PREFIX + "info \n" +
            PREFIX + "suggest \n" +
            "**Challenge Commands** \n" +
            PREFIX + "bronze \n" +
            PREFIX + "silver \n" +
            PREFIX + "gold \n" +
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
            "**Other Commands** \n" +
            "";
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