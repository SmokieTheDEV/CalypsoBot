const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const pkg = require(__basedir + '/package.json');
const moment = require('moment');
const { oneLine } = require('common-tags');

module.exports = class BotInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'botinfo',
      aliases: ['bot', 'bi'],
      usage: 'botinfo',
      description: 'Fetches Calypso\'s information and statistics.',
      type: client.types.INFO
    });
  }
  run(message) {
    const owner = message.client.users.cache.get(message.client.ownerId);
    const prefix = message.client.db.settings.selectPrefix.pluck().get(message.guild.id);
    const d = moment.duration(message.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
    const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
    const embed = new MessageEmbed()
      .setTitle('Calypso\'s Bot Information')
      .setThumbnail('https://raw.githubusercontent.com/sabattle/CalypsoBot/develop/data/images/Calypso.png')
      .setDescription(oneLine`
        Calypso is a feature-rich Discord bot built with customizability in mind.
        She comes packaged with a variety of commands and a 
        multitude of settings that can be tailored to your specific needs.
        Her codebase also serves as a base framework to easily create Discord bots of all kinds. 
        She first went live on **February 22nd, 2018**.
      `)
      .addField('Username', message.client.user.username, true)
      .addField('Discriminator', `\`#${message.client.user.discriminator}\``, true)
      .addField('ID', `\`${message.client.user.id}\``, true)
      .addField('Nickname', (message.guild.me.nickname) ? message.guild.me.nickname : '`None`', true)
      .addField('Prefix', `\`${prefix}\``, true)
      .addField('Detected Users', `\`${message.client.users.cache.size - 1}\``, true)
      .addField('Servers', `\`${message.client.guilds.cache.size}\``, true)
      .addField('Owner <:owner:735338114230255616>', owner, true)
      .addField('Uptime', `\`${days}\` and \`${hours}\``, true)
      .addField('Current Version', `\`${pkg.version}\``, true)
      .addField('Library/Environment', 'Discord.js 12.2.0\nNode.js 12.16.3', true)
      .addField('Database', 'SQLite', true)
      .addField(
        'Links', 
        '**[Invite Me](https://discordapp.com/oauth2/authorize?client_id=416451977380364288&scope=bot&permissions=403008599) | ' +
        '[Support Server](https://discord.gg/pnYVdut) | ' +
        '[Repository](https://github.com/sabattle/CalypsoBot)**'
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
