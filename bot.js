const Discord = require("discord.js");
var bot = new Discord.Client();
var config = require('./storage/config.json');
const TOKEN = config.token;
const BOTNAME = "IOU Bot";
const PREFIX = "?";

bot.on("ready", function() {
	console.log("Bot ready...")
	bot.user.setGame("?help ?info");
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
            message.channel.send("")
            break;
        
        //Bot Related Commands
        case "help":
            var help = "**Bot Related Commands** \n" +
            "?help \n" + 
            "?info \n" +
            "?suggest \n" +
            "**Challenge Commands** \n" +
            "?bronze \n" +
            "?silver \n" +
            "?gold \n" +
            "**Event Commands** \n" +
            "?invasion \n" + 
            "**Useful Links** \n" + 
            "?guide \n"
            "**Other Commands** \n" +
            "";
            message.author.send(help);
            break;
        case "info":
            
            break;
        //Useful Links
        case "guide":
            message.channel.send("https://tinyurl.com/IOUguide");
            break;
    }
});
       
bot.login(TOKEN);