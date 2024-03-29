const Discord = require("discord.js");
var fs = require("fs");
var customCommands = require('./storage/custom.json');
var parties = require('./storage/parties.json');
var guilds = require('./storage/guilds.json');
var votes = require('./storage/votes.json')
const BOTNAME = "IOU Bot 2.0";
var PREFIX = "?";
const BOTDESC = " is made with love (and nodejs) by Level \n" + "Type **" + PREFIX + "help** to get DMed the current list of commands \n" + "Type **" + PREFIX + "suggest** to get a link to suggestions";
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var boolFunCommands = false;
var bot;
const BINGOCHANNELID = "395460192420233216";
// const BINGOCHANNELID = "394292189368287255";
const CHALLENGECHANNELID = "146030310767722496";
const BINGOTIMEOUT = 5000;
const IOUTEAMROLEID = "146018825744154624";
const HELPERROLEID = "383301408759480320";
const TEST_SERVER_ID = "158651598741045248";
var bingoFunction;


exports.setters = {
    setBot: function(theBot) {
        bot = theBot;
    },
    setBingoFunction: function(theBingoFunction) {
        bingoFunction = theBingoFunction;
    }
}

exports.functions = {
    //Challenge Commands
    bronze: function(message) {
        if ((message.channel.id == CHALLENGECHANNELID) || (message.channel.type == "dm")) {
            reply(message, "http://i.imgur.com/POra9Kx.jpg");
        }
    },
    silver: function(message) {
        if ((message.channel.id == CHALLENGECHANNELID) || (message.channel.type == "dm")) {
            reply(message, "http://i.imgur.com/rkJ51fC.jpg");
        }
    },
    gold: function(message) {
        if ((message.channel.id == CHALLENGECHANNELID) || (message.channel.type == "dm")) {
            reply(message, "http://i.imgur.com/5GXghiA.jpg");
        }
    },

    //Event Commands
    invasion: function(message) {
        reply(message, "https://docs.google.com/spreadsheets/d/1RDw0FEdFd6lKhmvMK972J5_xvvjVYeUYrTQQ4ZbMR74/edit");
    },
    energyevent: function(message) {
        reply(message, "https://docs.google.com/spreadsheets/d/1IDunHOEMbePl-fg7esBakBoefipBWDUKcFYUhFd52zQ/edit#gid=293734457");
    },
    rpg: function(message) {
        reply(message, "https://docs.google.com/document/d/1laVfybGGtTsXs_jeXQcE9yUpV8xz0FMokBFvCSIcIa4/edit?usp=sharing")
    },
    mafia: function(message) {
        reply(message, "https://docs.google.com/spreadsheets/d/1AzBi0Dt9AePvASVeiWAUSSVcpTHfpQlUzDrIWxCL8AA/edit#gid=0");
    },

    //Bot Related Commands
    time: function(message) {
        var offset = -5.0
        var date = new Date();
        var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        var EST = new Date(utc + (3600000 * offset));
    
        var stringDate = EST.getDate() + "/" + (EST.getMonth() + 1) + "/" + EST.getFullYear();
        var stringTime = EST.getHours() + ":" + EST.getMinutes() + ":" + EST.getSeconds();
        message.author.send("**Server Time:** " + days[EST.getDay()] + " " + stringDate + " " + stringTime + " (EST)");
    },
    help: function(message) {
        var showingRoles = "";
        var additionalBot = "";
        var additionalParty = "";
        var additionalGuild = "";
    
        if (message.member != null) {
            if (message.member.roles.cache.has(IOUTEAMROLEID) || message.member.roles.cache.has(HELPERROLEID)) {
                showingRoles = "IOU Team";
                additionalBot = PREFIX + "add *(IOU Team only)* - `" + PREFIX + "add command-name description` \n" +  
                PREFIX + "remove *(IOU Team only)* - `" + PREFIX + "remove command-name` \n";
                additionalBot = additionalBot + PREFIX + "rules *(IOU Team only)* \n";
                additionalBot = additionalBot + PREFIX + "echo *(IOU Team only)* \n";
                additionalParty = additionalParty + PREFIX + "resetparties *(IOU Team only)* \n";
                additionalGuild = additionalParty + PREFIX + "resetguilds *(IOU Team only)* \n";
                additionalGuild = additionalParty + PREFIX + "removepartyname *(IOU Team only)* \n";
            }
            else if (message.member.roles.cache.find(role => role.name === "Spun & Spud")) {
                showingRoles = "Spun & Spud";
            }
            else {
                showingRoles = "Member";
            }
        }
        else {
            showingRoles = "Member";
        }
    
        var customP = "";
        for (c in customCommands) {
            customP = customP + PREFIX + c + "\n";
        }
        var botRelated = PREFIX + "help \n" + 
        PREFIX + "info \n" +
        PREFIX + "suggest \n" +
        PREFIX + "time \n" +
        PREFIX + "serverinfo \n" +
        PREFIX + "bingoadd \n" +
        PREFIX + "bingoremove \n" +
        PREFIX + "bingowhen \n" +
        additionalBot;
    
        var challengeCommands = PREFIX + "bronze \n" +
        PREFIX + "silver \n" +
        PREFIX + "gold \n";
    
        var partyGuild = PREFIX + "addparty - `" + PREFIX + "addparty required-dps description` \n" +
        PREFIX + "removeparty \n" +
        PREFIX + "parties \n" +
        additionalParty + 
        PREFIX + "addguild - `" + PREFIX + "addguild \"guild name\" description` \n" +
        PREFIX + "addguildformat - `" + PREFIX + "addguildformat \"guild name\" \"guild level\" \"guild buildings\" \"stone required\" \"DPS required\" \"members in guild\" \"spots open\" \"description\"` \n" +
        PREFIX + "removeguild \n" +
        PREFIX + "guilds \n" +
        additionalGuild;

        var votingCommands = PREFIX + 'votenew - `' + PREFIX + 'votenew "Name of Poll" "# of times you can vote" "Option One" "Option Two" "Etc"` \n' +
        PREFIX + 'vote - `' + PREFIX + 'vote "Name of Poll" "index of option (eg 1)"` \n' +
        PREFIX + 'votecheck - `' + PREFIX + 'votecheck "Name of Poll"` \n' +
        PREFIX + 'votedisplay - `' + PREFIX + 'votedisplay "Name of Poll"` \n' +
        PREFIX + 'voteclose - `' + PREFIX + 'voteclose "Name of Poll"` \n' +
        PREFIX + 'voteopen - `' + PREFIX + 'voteopen "Name of Poll"` \n' +
        PREFIX + 'votedelete - `' + PREFIX + 'votedelete "Name of Poll"` \n' +
        PREFIX + 'votereset - `' + PREFIX + 'votereset "Name of Poll"` \n';

        var eventCommands = PREFIX + "invasion \n" + 
        PREFIX + "energyevent \n" + 
        PREFIX + "rpg \n" + 
        PREFIX + "mafia \n";
    
        var usefulLinks =  PREFIX + "guide \n" +
        PREFIX + "multicalc \n" +
        PREFIX + "forum \n" +
        PREFIX + "wiki \n" +
        PREFIX + "cards \n" +
        PREFIX + "test \n" +
        PREFIX + "trello \n";
    
        var funCommands = PREFIX + "cat " +
        PREFIX + "dog " +
        PREFIX + "flip " +
        PREFIX + "8ball ";
    
        var embed = new Discord.MessageEmbed()
        .setAuthor("Showing commands for - " + showingRoles, message.author.avatarURL())
        .addField("Bot Related Commands", botRelated, true)
        .addField("Challenge Commands", challengeCommands, true)
        .addField("Party/Guild Commands", partyGuild)
        .addField("Voting Commands", votingCommands)
        .addField("Event Commands", eventCommands, true)
        .addField("Useful Links", usefulLinks, true)
        .setColor(0x9B59B6)
        if (customP == "") {
            embed.addField("Custom Commands", "There are no custom commands to display.", true)
        }
        else {
            embed.addField("Custom Commands", customP, true)
        }
        if (boolFunCommands) {
            embed.setFooter("Fun Commands " + funCommands)
        }
        message.author.send(embed);
    }, 
    info: function(message) {
        var embed = new Discord.MessageEmbed()
        .addField(BOTNAME, BOTNAME + BOTDESC)
        .setColor(0x9B59B6)
        .setFooter("Source code: https://github.com/puremana/iou-bot")
        .setThumbnail(bot.user.avatarURL())
        reply(message, embed);
    },
    serverinfo: function(message) {
        if (message.channel.type == "dm") {
            return;
        }
        var botCount = 0;
        var totalMembers = message.guild.memberCount;

        var activeMembers = 0;
        //loop through members
        for (u in message.guild.members.cache.array()) {
            if (message.guild.members.cache.array()[u].user.bot == true) {
                botCount++;
            }
            else if (message.guild.members.cache.array()[u].user.presence.status != "offline") {
                activeMembers++;
            }
        }
        var embed = new Discord.MessageEmbed()
        .setAuthor(BOTNAME, bot.user.avatarURL())
        .setTitle("Server Info - " + message.guild.name)
        .setColor(0x9B59B6)
        .setThumbnail(message.guild.iconURL())
        .addField("Bots", botCount, true)
        .addField("Owner", message.guild.owner, true)
        .addField("Active Members", activeMembers, true)
        .addField("Region", message.guild.preferredLocale, true)
        .addField("Total Members", totalMembers, true)
        .addField("Invite Link", "https://discord.gg/WfcvtZm", true)
        .setFooter("Server creation - " + message.guild.createdAt, message.guild.owner.user.avatarURL())
        
        reply(message, embed);
    },
    suggest: function(message) {
        reply(message, "Suggest a change to the bot by creating an issue at https://github.com/puremana/iou-bot/issues");
    },
    add: function(message) {
        if (message.member == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        var args = message.content.substring(PREFIX.length).split(" ");
        if (message.member.roles.cache.has(IOUTEAMROLEID) || message.member.roles.cache.has(HELPERROLEID)) {
            if (args.length < 3) {
                reply(message, "Please enter the command in the format `" + PREFIX + "add command_name command description`.");
                return;
            }
            var desc = "";
            for (d = 2; d < args.length; d++) {
                desc = desc + args[d] + " ";
            }
            var command = "\'" + args[1].toLowerCase() + "': '" + desc + "',";
            customCommands[args[1].toLowerCase()] = desc;
            fs.writeFile("storage/custom.json", JSON.stringify(customCommands), "utf8");
            reply(message, "Command " + PREFIX + args[1] + " added.");
        }
        else {
            reply(message, "You do not have the IOU Team role.");
        }
    },
    remove: function(message) {
        if (message.member == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        var args = message.content.substring(PREFIX.length).split(" ");
        if (message.member.roles.cache.has(IOUTEAMROLEID) || message.member.roles.cache.has(HELPERROLEID)) {
            if (args.length == 2) {
                for (c in customCommands) {
                    if (args[1].toLowerCase() == c) {
                        delete customCommands[c];
                        fs.writeFile("storage/custom.json", JSON.stringify(customCommands), "utf8");
                        reply(message, "Command " + PREFIX + args[1] + " removed.");
                        return;
                    }
                }
                reply(message, "There is no " + PREFIX + args[1] + " command.");
            }
            else {
                reply(message, "Please enter the command in the format `" + PREFIX + "remove command_name`.");
                return;
            }
        }
        else {
            reply(message, "You do not have the IOU Team role.");
        }
    },
    rules: function(message) {
        if (message.member == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        if (message.member.roles.cache.has(IOUTEAMROLEID) || message.member.roles.cache.has(HELPERROLEID)) {
            var args = message.content.substring(PREFIX.length).split(" ");
            var user = bot.users.find(user => user.id === args[1]);
            var rules = "**1)**    No spamming or flooding the chat with messages outside of #spam. \n" +
            "**2)**    Keep heated arguments inside #jerry-springer. \n" + 
            "**3)**    No adult (18+), explicit, or controversial messages. \n" +
            "**4)**    Keep to relevant channel topic. \n" + 
            "**5)**    No advertising other games or Discord servers without permission. \n" + 
            "**6)**    Be respectful of others within reason (this includes the IOU Team). \n" +
            "**7)**    Do not ask for personal information";

            var embed = new Discord.MessageEmbed()
            .addField("Rules for the IOURPG Discord", rules)
            .setColor(0xF33900)
            .setFooter("Rules sent from " + message.author.username);
            user.send(embed);
        }
        else {
            reply(message, "You do not have the IOU Team role.");
        }
    },
    echo: function(message) {
        if (message.member == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        if (message.member.roles.cache.has(IOUTEAMROLEID) || message.member.roles.cache.has(HELPERROLEID)) {
            var text = message.content.substring(PREFIX.length + 5);
            reply(message, text);
            if (message.channel.type != "dm") {
                try {
                    message.delete({timeout:0});
                } catch (err) {
                    console.log(err)
                }
            }
        }
        else {
            reply(message, "You do not have the IOU Team role.");
        }
    },

    //Parties - Guilds    
    addparty: function(message) {
        if (message.author == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        var args = message.content.substring(PREFIX.length).split(" ");
        if (args.length < 3) {
            reply(message, "Please enter the command in the format `" + PREFIX + "addparty required-dps description`.");
            return;
        }
        var date = new Date();
        var current = date.toString();
        var desc = "";
        for (i = 2; i < args.length; i++) {
            desc = desc + args[i] + " ";
        }
        if (desc.length == 0) {
            reply(message, "Description was short to be stored, please try again.");
            return;
        }
        if (desc.length > 244) {
            reply(message, "Description was too long to be stored, please try again.");
            return;
        }
        //make it an array :]
        var pJson = [current, message.author.username, args[1], desc];
        if (!verifyJson(pJson)) {
            reply(message, "Message could not be saved. Please try again.");
            return;
        }
        parties[message.author.id] = pJson;
        fs.writeFile("storage/parties.json", JSON.stringify(parties), "utf8");
        reply(message, "Party added. Type **" + PREFIX + "parties** to get sent a list of current available parties");
    },
    removeparty: function(message) {
        if (message.author == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        for (p in parties) {
            if (message.author.id == p) {
                delete parties[p];
                fs.writeFile("storage/parties.json", JSON.stringify(parties), "utf8");
                reply(message, "Party removed.");
                return;
            }
        }
        reply(message, "Couldn't find party for " + message.author.username);
    },
    removepartyname: function(message) {
        if (message.member == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        if (message.member.roles.cache.has(IOUTEAMROLEID) || message.member.roles.cache.has(HELPERROLEID)) {
            var name = message.content.substring(PREFIX.length + "removepartyname".length + 1);
            for (party in parties) {
                if (parties[party][1] == name) {
                    delete parties[party];
                    fs.writeFile("storage/parties.json", JSON.stringify(parties), "utf8");
                    reply(message, name + "'s party has been deleted.");
                    return;
                }
            }
            reply(message, "Please enter a valid name to delete.");
        }
        else {
            reply(message, "You do not have the IOU Team role.");
        }
    },
    resetparties: function(message) {
        if (message.member == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        if (message.member.roles.cache.has(IOUTEAMROLEID) || message.member.roles.cache.has(HELPERROLEID)) {
            parties = {};
            parties["id"] = ['time','name','required dps','description'];
            fs.writeFile("storage/parties.json", JSON.stringify(parties), "utf8");
            reply(message, "All parties have been reset.");
        }
        else {
            reply(message, "You do not have the IOU Team role.");
        }
    },
    parties: function(message) {
        for (p in parties) {
            var embed = new Discord.MessageEmbed()
            .addField(parties[p][1] + " - " + parties[p][2], parties[p][3])
            .setColor(0x1A8CBE)
            .setFooter(parties[p][0])
            message.author.send(embed);
        }
    },
    addguild: function(message) {
        if (message.author == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        var args = message.content.substring(PREFIX.length).split(" ");    
        if (args.length < 3) {
            reply(message, "Please enter the command in the format `" + PREFIX + "addguild \"guildname\" description`.");
            return;
        }
        var date = new Date();
        var current = date.toString();
        var desc = "";
        for (i = 1; i < args.length; i++) {
            desc = desc + args[i] + " ";
        }
    
        var rawSplit = desc.split("\"");
        if (rawSplit.length > 1) {
            var guildName = rawSplit[1];
            var desc = "";
            for (i = 2; i < rawSplit.length; i++) {
                desc = desc + rawSplit[i] + " ";
            }
        }
        else {
            var guildName = args[1];
            var desc = desc.substr(desc.indexOf(" ") + 1);
        }
        if (desc.length > 254) {
            reply(message, "Message is too long to be stored, please try again.");
            return;
        }
        var gJson = ["normal", current, message.author.username, guildName, desc];
        if (!verifyJson(gJson)) {
            reply(message, "Message could not be saved. Please try again.");
            return;
        }
        guilds[message.author.id] = gJson;
        fs.writeFile("storage/guilds.json", JSON.stringify(guilds), "utf8");
        reply(message, "Guild *" + guildName + "* added. Type **" + PREFIX + "guilds** to get sent a list of current available guilds.");
    },
    addguildformat: function(message) {
        if (message.author == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        var args = message.content.substring(PREFIX.length).split(" ");
        var desc = "";
        for (i = 0; i < args.length; i++) {
            desc = desc + args[i] + " ";
        }
        var rawSplit = desc.split("\"");
        if (rawSplit.length != 17) {
            reply(message, "Please enter the command in the following format `" + PREFIX + "addguildformat \"guild name\" \"guild level\" \"guild buildings\" \"stone required\" \"DPS required\" \"members in guild\" \"spots open\" \"description\"`");
            return;
        }
        var date = new Date();
        var current = date.toString();
        var gJson = ["format", current, message.author.username, rawSplit[1], rawSplit[3], rawSplit[5], rawSplit[7], rawSplit[9], rawSplit[11], rawSplit[13], rawSplit[15]];
        for (arg in gJson) {
            if (gJson[arg].length > 254) {
                reply(message, "One or more of the arguments were too long. Please try again.");
                return;
            }
            if (gJson[arg].length == 0) {
                reply(message, "One or more of the arguments were short long. Please try again.");
                return;
            }
        }
        if (!verifyJson(gJson)) {
            reply(message, "Message could not be saved. Please try again.");
            return;
        }
        guilds[message.author.id] = gJson;
        fs.writeFile("storage/guilds.json", JSON.stringify(guilds), "utf8");
        reply(message, "Guild " + rawSplit[1] + " added. Type **" + PREFIX + "guilds** to get sent a list of current available guilds.");
    },
    resetguilds: function(message) {
        if (message.member == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        if (message.member.roles.cache.has(IOUTEAMROLEID) || message.member.roles.cache.has(HELPERROLEID)) {
            guilds = {};
            fs.writeFile("storage/guilds.json", JSON.stringify(guilds), "utf8");
            reply(message, "All guilds have been reset.");
        }
        else {
            reply(message, "You do not have the IOU Team role.");
        }
    },
    removeguild: function(message) {
        if (message.author == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        for (g in guilds) {
            if (message.author.id == g) {
                var guildName = guilds[g][3];
                delete guilds[g];
                fs.writeFile("storage/guilds.json", JSON.stringify(guilds), "utf8");
                reply(message, guildName + " guild removed.");
                return;
            }
        }
        reply(message, "Couldn't find party for " + message.author.username);
    },
    guilds: function(message) {
        for (g in guilds) {
            if (guilds[g][0] == "format") {
                var embed = new Discord.MessageEmbed()
                .addField(guilds[g][3] + " - " + guilds[g][2], guilds[g][10])
                .addField("Guild Level", guilds[g][4], true)
                .addField("Guild Buildings", guilds[g][5], true)
                .addField("Stone Required", guilds[g][6], true)
                .addField("DPS Required", guilds[g][7], true)
                .addField("Members", guilds[g][8] + "/40", true)
                .addField("Spots Open", guilds[g][9], true)
                .setColor(0xFFC300)
                .setFooter(guilds[g][1])
            }
            else {
                var embed = new Discord.MessageEmbed()
                .addField(guilds[g][3] + " - " + guilds[g][2], guilds[g][4])
                .setColor(0xFFC300)
                .setFooter(guilds[g][1])
            }
            message.author.send(embed);
        }
    },

    //Voting
    votenew: function(message) {
        if (message.member == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        var args = message.content.substring(PREFIX.length).split(" ");
        var rawSplit = message.content.split("\"");
        //if there is already a poll with this name
        for (v in votes) {
            if (v == rawSplit[1]) {
                reply(message, "There is already a poll with the name **" + rawSplit[1] + "**. Please `?voteclose` it before recreating.");
                return;
            }
        }
        //if the poll options isn't an int
        if (isNaN(rawSplit[3])) {
            reply(message, "Please make sure the second argument (number of votes) is a number before creating the poll.");
            return;
        }
        //create a new poll with those options
        var voteOptions = [];
        for (i = 5; i < (rawSplit.length - 1); i++) {
            if (rawSplit[i] != " ") {
                voteOptions.push(rawSplit[i]);
                voteOptions.push([]);
            }
        }
        var vJson = {"author" : message.author.id, "numOptions" : rawSplit[3], "voteOptions" : voteOptions, "closed" : false};
        if (!verifyJson(vJson)) {
            reply(message, "Message could not be saved. Please try again.");
            return;
        }
        votes[rawSplit[1]] = vJson;
        fs.writeFile("storage/votes.json", JSON.stringify(votes), "utf8");
        //display the new poll
        displayPoll(message, rawSplit[1]);
    },
    vote: function(message) {
        if (message.member == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        var args = message.content.substring(PREFIX.length).split(" ");
        var rawSplit = message.content.split("\"");
        //check if that is a poll
        for (v in votes) {
            if (v == rawSplit[1]) {
                //check how many votes you can do
                var numVotes = votes[v]["numOptions"];
                //check if this user has voted before x number of times
                var poll = votes[v]["voteOptions"];
                var count = 0;
                for (i = 1; i < poll.length; i = i + 2) {
                    for (j = 0; j < poll[i].length; j++) {
                        if (poll[i][j] == message.author.id) {
                            count++;
                        }
                    }
                }
                if (numVotes <= count) {
                    reply(message, ':negative_squared_cross_mark: Already voted, please use `?votereset "poll name"` before trying again.');
                    return;
                }
                //check the poll isn't closed already
                if (votes[v]["closed"] == true) {
                    reply(message, ':negative_squared_cross_mark: This poll has been closed.');
                    return;
                }
                //check number of votes they are doing is less than what's in there
                var messageVotes = (rawSplit.count - 2) / 2;
                if ((messageVotes + count) > numVotes) {
                    reply(message, ':negative_squared_cross_mark: Trying to enter too many votes, please use `?votereset "poll name"` before trying again.');
                    return;
                }
                //if they haven't put their vote or votes in 
                //if poll vote is not real
                var theVotes = [];
                for (var l = 3; l < rawSplit.length; l = l + 2) {
                    if (isNaN(rawSplit[l])) {
                        reply(message, ':negative_squared_cross_mark: Use digits to indicate what you are voting for. Please try again.');
                        return;
                    }
                    if (parseInt(rawSplit[l]) > (poll.length / 2)) {
                        reply(message, ':negative_squared_cross_mark: One or more of your votes are not in the poll. Please try again.');
                        return;
                    }
                    theVotes.push(rawSplit[l]);
                }
                //check not voting for same thing twice
                if ((new Set(theVotes)).size !== theVotes.length) {
                    reply(message, ':negative_squared_cross_mark: You cannot vote for the same option twice. Please try again.');
                    return;
                }
                //else put their vote in
                for (var j = 0; j < theVotes.length; j++) {
                    var num = parseInt(theVotes[j]) + parseInt(theVotes[j] - 1);
                    for (var o = 0; o < poll[num].length; o++) {
                        if (poll[num][o] == message.author.id) {
                            reply(message, ':negative_squared_cross_mark: You cannot vote for the same option twice. Please try again.');
                            return;
                        }
                    }
                    poll[num].push(message.author.id);
                }
                fs.writeFile("storage/votes.json", JSON.stringify(votes), "utf8");
                if (theVotes.length == 1) {
                    reply(message, ':white_check_mark: Your vote has been registered.');
                }
                else {
                    reply(message, ':white_check_mark: Your votes have been registered.');
                }
                displayPoll(message, rawSplit[1]);
                return;
            }
        }
        reply(message, ":negative_squared_cross_mark: Couldn't find poll name " + rawSplit[1]);
        return;
    },
    votecheck: function(message) {
        if (message.member == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        var args = message.content.substring(PREFIX.length).split(" ");
        var rawSplit = message.content.split("\"");
        //check if that is a poll
        for (v in votes) {
            if (v == rawSplit[1]) {
                var arrayResult = [];
                var poll = votes[v]["voteOptions"];
                for (i = 1; i < poll.length; i = i + 2) {
                    for (j = 0; j < poll[i].length; j++) {
                        if (poll[i][j] == message.author.id) {
                            arrayResult.push((i + 1) / 2);
                        }
                    }
                }
                if (arrayResult.length > 0) {
                    reply(message, "Your current votes in poll **" + rawSplit[1] + "** are options " + arrayResult);
                }
                else {
                    reply(message, "You haven't voted in this poll yet.");
                }
                return;
            }
        }
        reply(message, "Couldn't find poll name " + rawSplit[1]);
        return;
    },
    votedisplay: function(message) {
        if (message.member == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        var args = message.content.substring(PREFIX.length).split(" ");
        var rawSplit = message.content.split("\"");
        //check if that is a poll
        for (v in votes) {
            if (v == rawSplit[1]) {
                displayPoll(message, rawSplit[1]);
                return;
            }
        }
        reply(message, "Couldn't find poll name " + rawSplit[1]);
        return;
    },
    voteclose: function (message) {
        if (message.member == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        var args = message.content.substring(PREFIX.length).split(" ");
        var rawSplit = message.content.split("\"");
        //check if that is a poll
        for (v in votes) {
            if (v == rawSplit[1]) {
                //check they have permissions to close poll
                if (message.member.roles.cache.has(IOUTEAMROLEID) || message.member.roles.cache.has(HELPERROLEID) || message.member.id == vote[v]["author"]) {
                    //check the poll isn't already closed
                    if (votes[v]["closed"] == true) {
                        reply(message, "This poll has already been closed.");
                        return;
                    }
                    //close poll
                    votes[v]["closed"] = true;
                    reply(message, "Poll **" + rawSplit[1] + "** is now closed.");
                    fs.writeFile("storage/votes.json", JSON.stringify(votes), "utf8");
                    return;
                }
                else {
                    reply(message, "You do not have permissions to close this poll.");
                    return;
                }
            }
        }
    },
    voteopen: function (message) {
        if (message.member == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        var args = message.content.substring(PREFIX.length).split(" ");
        var rawSplit = message.content.split("\"");
        //check if that is a poll
        for (v in votes) {
            if (v == rawSplit[1]) {
                //check they have permissions to close poll
                if (message.member.roles.cache.has(IOUTEAMROLEID) || message.member.roles.cache.has(HELPERROLEID) || message.member.id == vote[v]["author"]) {
                    //check the poll isn't open
                    if (votes[v]["closed"] == false) {
                        reply(message, "This poll is already open.");
                        return;
                    }
                    //open poll
                    votes[v]["closed"] = false;
                    reply(message, "Poll **" + rawSplit[1] + "** has been reopened.");
                    fs.writeFile("storage/votes.json", JSON.stringify(votes), "utf8");
                    return;
                }
                else {
                    reply(message, "You do not have permissions to open this poll.");
                    return;
                }
            }
        }
    },
    votedelete: function (message) {
        if (message.member == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        var args = message.content.substring(PREFIX.length).split(" ");
        var rawSplit = message.content.split("\"");
        //check if that is a poll
        for (v in votes) {
            if (v == rawSplit[1]) {
                //check they have permissions to delete
                if (message.member.roles.cache.has(IOUTEAMROLEID) || message.member.roles.cache.has(HELPERROLEID) || message.member.id == vote[v]["author"]) {
                    //delete poll
                    delete votes[v];
                    reply(message, "Poll **" + rawSplit[1] + "** is now deleted.");
                    fs.writeFile("storage/votes.json", JSON.stringify(votes), "utf8");
                    return;
                }
                else {
                    reply(message, "You do not have permissions to close this poll.");
                    return;
                }
            }
        }
    },
    votereset: function(message) {
        if (message.member == null) {
            reply(message, "Message author is undefined.");
            return;
        }
        var args = message.content.substring(PREFIX.length).split(" ");
        var rawSplit = message.content.split("\"");
        //check if that is a poll
        for (v in votes) {
            if (v == rawSplit[1]) { 
                var poll = votes[v]["voteOptions"];
                //loop through and remove
                for (i = 1; i < poll.length; i = i + 2) {
                    var index = poll[i].indexOf(message.author.id);
                    if (index != -1) {
                        poll[i].splice(index, 1);
                    }
                }
                reply(message, "Your responses for poll **" + rawSplit[1] + "** have been reset.");
                fs.writeFile("storage/votes.json", JSON.stringify(votes), "utf8");
            }
        }
    },
    
    // Test Server Commands
    tester: function(message) {
        if (message.guild.id !== TEST_SERVER_ID) {
            return;
        }

        // Check doesn't already have Active Testers role
        if (message.member.roles.cache.find(role => role.name === "Active Testers")) {
            reply(message, "You already have the Active Testers role. Use `" + PREFIX + "notester` to remove it.");
            return;
        }
        // Add the role
        var testerRole = message.member.guild.roles.cache.find(role => role.name === "Active Testers");
        message.member.roles.add(testerRole);
        reply(message, "Your Active Testers role has been added.");
    },
    notester: function(message) {
        if (message.guild.id !== TEST_SERVER_ID) {
            return;
        }

        // Check they have the Active Testers role
        if (message.member.roles.cache.find(role => role.name === "Active Testers")) {
            //remove the role
            var testerRole = message.member.guild.roles.cache.find(role => role.name === "Active Testers");
            message.member.roles.remove(testerRole);
            reply(message, "Your Active Testers role has been removed.");
        }
        else {
            reply(message, "You don't have the Active Testers role. Use `" + PREFIX + "tester` to get it.");
        }
    },

    //Useful Links
    guide: function(message) {
        reply(message, "https://tinyurl.com/IOUguide");
    },
    multicalc: function(message) {
        reply(message, "https://docs.google.com/spreadsheets/d/1QGBm6KtcOZraqSkLWVuqTF16vUD7rrOvIpdh59bFLmg/edit#gid=357923173");
    },
    forum: function(message) {
        reply(message, "http://iourpg.com/forum");
    },
    wiki: function(message) {
        reply(message, "http://iourpg.wikia.com/wiki/Idle_Online_Universe_Wiki");
    },
    cards: function(message) {
        reply(message, "https://iou-card-calculator.web.app/");
    },
    test: function(message) {
        reply(message, "https://discord.gg/ncEarFv");
    },
    trello: function(message) {
        reply(message, "https://trello.com/b/usVhG9Ry/iou-development-board");
    },

    //bingo
    bingoadd: function(message) {
        //check we're in bingo channel
        if (message.channel.id != BINGOCHANNELID) {
            return;
        }
        //check doesn't already have bingo role
        if (message.member.roles.cache.find(role => role.name === "bingo")) {
            message.channel.send("You already have the bingo role. Use `" + PREFIX + "bingoremove` to remove it.")
                .then(m => m.delete({timeout: BINGOTIMEOUT}))
                .catch(err => console.log(err));
            return;
        }
        //add the role
        var bingoRole = message.member.guild.roles.cache.find(role => role.name === "bingo");
        message.member.roles.add(bingoRole)
            .catch(err => console.log(err));
        message.channel.send("Your bingo role has been added.")
            .then(m => m.delete({timeout: BINGOTIMEOUT}))
            .catch(err => console.log(err));
    },
    bingoremove: function(message) {
        //check we're in bingo channel
        if (message.channel.id != BINGOCHANNELID) {
            return;
        }
        //check they have the bingo role
        if (message.member.roles.cache.find(role => role.name === "bingo")) {
            //remove the role
            var bingoRole = message.member.guild.roles.cache.find(role => role.name === "bingo");

            message.member.roles.remove(bingoRole)
                .catch(err => console.log(err));

            message.channel.send("Your bingo role has been removed.")
                .then(m => m.delete({timeout: BINGOTIMEOUT}))
                .catch(err => console.log(err));
        }
        else {
            message.channel.send("You don't have the bingo role. Use `" + PREFIX + "bingoadd` to get it.")
                .then(m => m.delete({timeout: BINGOTIMEOUT}))
                .catch(err => console.log(err));
        }
    },
    bingowhen: function(message) {
        if (message.author == null) {
            return;
        }
        if (message.channel.id != BINGOCHANNELID) {
            return;
        }

        let bingoDate = bingoFunction.nextInvocation().getTime();
        // Adjusting for the 10 minutes before bingo that the bot sends the notifcation message
        bingoDate = bingoDate + 600000;
        let now = Date.now();
        let diff = bingoDate - now;

        var msec = diff;
        var days = Math.floor(msec / 1000 / 60 / 60 / 24);
        msec -= days * 1000 * 60 * 60 * 24;
        var hours = Math.floor(msec / 1000 / 60 / 60);
        msec -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(msec / 1000 / 60);
        msec -= minutes * 1000 * 60;
        var seconds = Math.floor(msec / 1000);
        msec -= seconds * 1000;

        let stringDiff = "The next bingo will be in ";
        
        if (days > 0) {
            stringDiff = stringDiff + days + " days, ";
        }
        if (hours > 0) {
            stringDiff = stringDiff + hours + " hours, ";
        }

        stringDiff = stringDiff + minutes + " minutes, and " + seconds + " seconds";

        message.channel.send(stringDiff);
    },

    //fun
    cat: function(message) {
        if ((message.channel.id != "channelID") || (boolFunCommands == false)) {
            return;
        }
        Promise.all([httpRequest("http", "random.cat", "/meow")]).then(values => { 
            catJson = JSON.parse(values[0]);
            reply(message, catJson.file);
        });
    },
    dog: function(message) {
        if ((message.channel.id != "channelID") || (boolFunCommands == false)) {
            return;
        }
        Promise.all([httpRequest("https", "dog.ceo", "/api/breeds/image/random")]).then(values => { 
            dogJson = JSON.parse(values[0]);
            reply(message, dogJson.message);
        });
    },
    flip: function(message) {
        if ((message.channel.id != "channelID") || (boolFunCommands == false)) {
            return;
        }
        var toss = (Math.floor(Math.random() * 2) == 0);
        if (toss) {
            reply(message, "Heads");
        } 
        else {
            reply(message, "Tails");
        }
    },
    ball: function(message) {
        if ((message.channel.id != "channelID") || (boolFunCommands == false)) {
            return;
        }
        Promise.all([httpRequest("https", "8ball.delegator.com", "/magic/JSON/abc")]).then(values => { 
            ballJson = JSON.parse(values[0]);
            reply(message, ballJson.magic.answer);
        });
    }
}
var httpRequest = function (type, url, ranHost) {
    return new Promise((resolve, reject) => {
        var http = require(type);
    
        var options = {
            host: url,
            path: ranHost
        }
        var request = http.request(options, function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                resolve(data);
            });
        });
        request.on('error', function (e) {
            reject(e.message);
        });
        request.end();
    });
};
var displayPoll = function(message, nameOfPoll) {
    var poll = votes[nameOfPoll]["voteOptions"]; 
    var num = 1;
    var isClosed = "Open";
    if (votes[nameOfPoll]["closed"] == true) {
        isClosed = "Closed";
    }
    var textMessage = "**Poll - " + nameOfPoll + "** [" + isClosed + "]\n\n";
    for (i = 0; i < poll.length; i = i + 2) {
        textMessage = textMessage + "`[" + num + "] " + poll[i] + ": " + poll[i + 1].length + "`\n";
        num++;
    }
    reply(message, textMessage);
}
function verifyJson(json) {
    try {
        JSON.stringify(json);
    } catch (e) {
        return false;
    }
    return true;
}
function reply(message, content) {
    message.channel.send(content)
        .catch(err => console.log(err));
}