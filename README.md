# IOU Bot
A Discord bot for the official IOURPG server located here - https://discord.gg/zynuQcP.
Made with Nodejs and Discordjs, using json files to store data locally.

_An extended version of this bot for IOU Guild Discord Servers can be found at https://github.com/puremana/me-bot_

## Commands
All commands start with the prefix allocated in the bot.js and command.js files.

- Bot Related
  - `help`
  - `info`
  - `suggest`
  - `time`
  - `serverinfo`
  - `bingoadd`
  - `bingoremove`
  - `bingowhen`
  - `add` - `add command-name description` *(admin only)*
  - `remove` - `remove command-name`
  - `rules` - `rules user-id`
  - `echo` - `echo message`

- Party/Guild Commands
  - `addparty` - `addparty required-dps description`
  - `removeparty`
  - `parties`
  - `resetparties` *(admin only)*
  - `addguild` - `addguild "guild name" description`
  - `addguildformat` - `addguildformat "guild name" "guild level" "guild buildings" "stone required" "DPS required" "members in guild" "spots open" "description"`
  - `removeguild`
  - `guilds`
  - `resetguilds` *(admin only)*
  - `removepartyname` - `removepartyname party-name` *(admin only)*

- Voting Commands
  - `votenew` - `votenew "Name of Poll" "# of times you can vote" "Option One" "Option Two" "Etc"`
  - `vote` - `vote "Name of Poll" "index of option (eg 1)"`
  - `votecheck` - `votecheck "Name of Poll"` 
  - `votedisplay` - `votedisplay "Name of Poll"`
  - `voteclose` - `voteclose "Name of Poll"`
  - `voteopen` - `voteopen "Name of Poll"`
  - `votedelete` - `votedelete "Name of Poll"`
  - `votereset` - `votereset "Name of Poll"`

- Event Commands
  - `invasion`
  - `energyevent`
  - `rpg`
  - `mafia`

- Useful Links
  - `guide`
  - `multicalc`
  - `forum`
  - `wiki`
  - `cards`
  - `test`
  - `trello`

## Setting Up
1) Clone the repo from https://github.com/puremana/iou-bot
2) Go to https://discordapp.com/developers/applications/me
3) Create a new app named IOU Bot (no description/image needed here)
4) Click "Create bot user"
5) Click to reveal token
6) Replace the token in the config.json file in storage
7) Open cmd and run "npm install" (install nodejs if you don't have it installed already)
8) Get the client ID from where you found the token. Go to https://discordapp.com/oauth2/authorize?client_id=INSERTCLIENTIDHERE&scope=bot&permissions=0
To add the bot to your Discord with 0 permissions. You will need the Manage Server role to do this.
9) Run "node bot.js" to start the bot