const Discord = require("discord.js");
var bot = new Discord.Client();
const TOKEN = "MzU1MjI5Njk1NTQ3MTQ2MjQw.DJJxIQ.KOOMqvEmJmc3N0vkuEWiuQu8Ghk";

bot.on("ready", function() {
	console.log("Bot ready...")
});

bot.on("message", function(message) {
	if (message.author.equals(bot.user)) {
		return;
	}
	
	if (message.channel.id == "355250699841568768") {
		if (message.content == "?bronze") {
			message.channel.sendMessage("bronze");
		}
		else if (message.content == "?silver") {
			message.channel.sendMessage("");
		}
		else if (message.content == "?gold") {
			message.channel.sendMessage("");
		}
	}
	
	if (message.content == "?help") {
		var help = "**Current Commands** \n" +
		"__Challenge Commands__ \n" +
		"?bronze \n" +
		"?silver \n" +
		"?gold \n" +
		"__Event Commands__ \n" +
		"?invasion \n";
		message.author.send(help);
	}
	
	if (message.content == "?invasion") {
		message.channel.sendMessage("https://docs.google.com/spreadsheets/d/1RDw0FEdFd6lKhmvMK972J5_xvvjVYeUYrTQQ4ZbMR74/edit");
	}
	
	if (message.content == "?guide") {
		message.channel.sendMessage("https://tinyurl.com/IOUguide");
	}
	
});

bot.login(TOKEN);