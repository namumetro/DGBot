const {MessageEmbed} = require("discord.js")

module.exports = {
  names: ["help", "도움말", "명령어"],
  description: '디지봇이 지원하는 명령어의 종류를 알려준답니다!',

  args: "[category]",

  execute: (client, msg, args) => {
    var embed;
    if(!args[0]){
    embed = new MessageEmbed()
      .setColor('#5865f2')
      .setAuthor({ name: '디지봇', iconURL: '' })
      .setTitle('**디지봇 도움말**')
      .setDescription(`디지봇이 지원하는 명령어입니다!
(접두사는 \`디지봇 \`입니다!)`)
      .setThumbnail('')
      .addFields(
        { name: '도움말', value: '디지봇이 지원하는 명령어의 종류를 알려준답니다!', inline: true },
        { name: '도움말 대화', value: '디지봇과 대화를 할 수 있는 명령어를 알려줘요!', inline: true },
        { name: '\u200B', value: '\u200B' }
      )
      .setTimestamp()
      .setFooter({ text:'Made By DGMetro, Namustu'})
      msg.channel.send({embeds: [embed]})
    }else{
      embed = new MessageEmbed()
        .setColor('#5865f2')
        .setAuthor({ name: '디지봇', iconURL: '' })
        .setTitle(`**디지봇 ${args[0]} 도움말**`)
        .setDescription(`접두사는 \`디지야 \`입니다!`)
        .setThumbnail('')
        .setTimestamp()
        .setFooter({ text:'Made By DGMetro, Namustu'})
      
      client.commands.forEach((command) => {
        if(command.category.toLowerCase() == args[0].toLowerCase()){
          //console.log(command)
          embed.addField(command.names.join(" / ") + " " + command.args, command.description, true)
        }
        //console.log(command)
      })
      
      msg.channel.send({embeds: [embed]})
    }
  }
}
