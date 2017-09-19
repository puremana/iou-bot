**How to set up the bot**
1) Clone the repo from https://github.com/puremana/iou-bot
2) Go to https://discordapp.com/developers/applications/me
3) Create a new app named IOU Friend (no description/image needed here)
4) Click "Create bot user"
5) Click to reveal token, copy this
6) Download storage.zip and extract in iou-bot folder
7) Replace the token in the config.json file in storage
8) Open cmd and run "npm install" (install nodejs if you don't have it installed already)
9) Get the client ID from where you found the token. Go to https://discordapp.com/oauth2/authorize?client_id=INSERTCLIENTIDHERE&scope=bot&permissions=0
To add the bot to your Discord with 0 permissions. You will need the Manage Server role to do this.
10) run "node bot.js" to start the bot