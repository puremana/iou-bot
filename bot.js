const Discord = require("discord.js");
var bot = new Discord.Client();
var config = require('./storage/config.json');
const TOKEN = config.token;
const botName = "IOU Bot";
const prefix = "?";

bot.on("ready", function() {
	console.log("Bot ready...")
	bot.user.setGame("?help ?info");
});

bot.on("message", function(message) {
	if (message.author.equals(bot.user)) {
		return;
	}
	
	if (message.channel.id == "355250699841568768") {
		if (message.content == "?bronze") {
			message.channel.sendMessage("http://i.imgur.com/POra9Kx.jpg");
		}
		else if (message.content == "?silver") {
			message.channel.sendMessage("http://i.imgur.com/rkJ51fC.jpg");
		}
		else if (message.content == "?gold") {
			message.channel.sendMessage("http://i.imgur.com/5GXghiA.jpg");
		}
	}
	
	if (message.content == "?invasion") {
		message.channel.sendMessage("https://docs.google.com/spreadsheets/d/1RDw0FEdFd6lKhmvMK972J5_xvvjVYeUYrTQQ4ZbMR74/edit");
	}
	
	
	
	if (message.content == "?help") {
		//Challenge Commands
		var help = "**Challenge Commands** \n" +
		"?bronze \n" +
		"?silver \n" +
		"?gold \n" +
		//Event Commands
		"**Event Commands** \n" +
		"?invasion \n" + 
		//Other Commands
		"**Other Commands** \n" + 
		"?help \n" + 
		"?info \n" +
		"?suggest \n" +
		"?guide \n";
		message.author.send(help);
	}
	
	if (message.content == ("?info")) {
		var info = "IOU Bot is made with love (and nodejs) by Level \n" + 
		"Check out the source code at https://github.com/puremana/iou-bot";
		message.channel.sendMessage(info);
	}
	
	if (message.content == ("?suggest")) {
		message.channel.sendMessage("If you want something added, post an issue at https://github.com/puremana/iou-bot/issues");
	}
	
	if (message.content == "?guide") {
		message.channel.sendMessage("https://tinyurl.com/IOUguide");
	}
	
	if (message.content == "?guide") {
		message.channel.sendMessage("https://tinyurl.com/IOUguide");
	}
	
});

bot.login(TOKEN);