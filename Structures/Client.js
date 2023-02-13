const { Client, Collection, LimitedCollection } = require('discord.js');
const { GatewayIntentBits, Partials } = require('discord.js');require("dotenv").config();
const Util = require("./Util.js");
const {Poru} = require("poru");
const PoruOptions = require("../PoruOptions.js")   
const Genius = require("genius-lyrics");
const Logger = require('./Logger');
const Spotify = require("better-spotify-api");
const Helper = require("./Helper")

module.exports = class MelodyClient extends Client {
  constructor(options = {}) {
    super({
        partials: [Partials.Message,Partials.Channel,Partials.Reaction,Partials.GuildMember],
        intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMessageTyping,GatewayIntentBits.GuildMembers,GatewayIntentBits.MessageContent],
        makeCache: Options => {
          switch (Options.name) {
              // Disable Cache
              case 'GuildBanManager':
              case 'GuildInviteManager':
              case 'GuildStickerManager':
              case 'StageInstanceManager':
              case 'PresenceManager':
              case 'ThreadManager':
             case 'MessageManager': return new LimitedCollection({ maxSize: 100 });
     
              // Default cache
              default: return new Collection();
          }
      }, 
      });

    this.commands = new Collection();
    this.aliases = new Collection();
    this.events = new Collection();
    this.cooldowns = new Collection();
    this.slash = new Collection();
    this.utils = new Util(this);
    this.config = require("../config.json");
    this.poru = new Poru(this,this.config.nodes,PoruOptions);
    this.poruEvents = new Collection();
    this.regex = require("../utils/regex");
    this.helper = new Helper();
    this.spotify = new Spotify({
      clientID:this.config.clientID,
      clientSecret: this.config.clientSecret

    })

    this.logger = new Logger({
          displayTimestamp: true,
          displayDate: true,
       },this);
  }
 

  
  start(token) {
    this.utils.loadCommands();
    this.utils.loadEvents();
    this.utils.loadPoruEvents();
    super.login(token);
  }
};