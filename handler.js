const fs = require("fs");

module.exports.set = (client) => {
  client.commands = [];
  const commandFolders = fs.readdirSync('./commands');

  for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`../commands/${folder}/${file}`);
      command.category = folder
      
      client.commands.push(command);
    }
  }
}

module.exports.get = (client, message) => {
  const prefix = "디지야 ";

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = (() => {
    for (i of client.commands) {
      if(i.names && i.names.includes(commandName)) {
        return i
      }
    }
    return null
  })()

  if (!command) return message.channel.send("없는 명령어입니다.")

  if(command.permissions){
    for (permit of command.permissions) {
      if(!message.guild.me.permissions.has(permit))
        return message.channel.send(`봇에게 ${permit} 권한이 없습니다.`)
      if(!message.member.permissions.has(permit))
        return message.channel.send(`이 명령어는 ${permit} 권한을 가진 사람만 실행시킬수 있습니다.`)
    }
  }
	
  try {
    command.execute(client, message, args);
  } catch (error) {
    console.error(error);
    message.reply('명령어를 실행하는 데 실패했습니다.');
  }
}
