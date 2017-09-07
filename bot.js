const Discord = require("discord.js");
var bot = new Discord.Client();
const TOKEN = "MzU1MjI5Njk1NTQ3MTQ2MjQw.DJJxIQ.KOOMqvEmJmc3N0vkuEWiuQu8Ghk";

bot.on("message", function(message) {
	console.log(message.content);
});

bot.login(TOKEN);