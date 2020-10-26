const Discord = require('discord.js')

const fs = require('fs')

const client = new Discord.Client()

let PREFIX = "" //البرفكس

client.login("") //التوكن

client.on('ready',()=>{console.log(`Bot Ready As: < ${client.user.tag} >`)})

client.on('message', async(message) => {

    let roles = getautorole(message.guild.id,`roles`)

    roles.forEach((thisRole) => {

        let cRole = message.guild.roles.cache.get(thisRole)

        if(!cRole) { let pos = roles.indexOf(thisRole)

        roles.splice(pos, 1)}

    })

    setautorole(message.guild.id,`roles`,roles)

let args = message.content.split(/ +/)

let command = args.shift().toLowerCase().slice(PREFIX.length)

if(!message.guild 

    || message.author.bot 

    || !message.member.hasPermission('MANAGE_ROLES') 

    || !message.content.startsWith(PREFIX))

        return;

if(command == `auto-role`){

    if(!message.guild.me.hasPermission('ADMINISTRATOR')) 

    return message.channel.send(` ** Sorry , I Don't Have \`\` ADMINISTRATOR \`\` Permission ** `);

    let helpEmbed = new Discord.MessageEmbed()

    .setColor("RANDOM")

    .setTitle(`auto-role: Commands List`)

    .setDescription(`**${PREFIX}auto-role on 

turn on the auto-role in this server

======================================

${PREFIX}auto-role off

turn off the auto-role in this server

======================================

${PREFIX}auto-role add <Role>

add a role to auto-roles in this server

======================================

${PREFIX}auto-role remove <Role>

remove a role from auto-roles in this server

======================================

${PREFIX}auto-role removeAll

remove all roles from auto-role in this server

======================================

${PREFIX}auto-role list

show all roles from auto-roles list in this server

======================================

${PREFIX}auto-role bot < ... >

auto-role command for bots

======================================***`)

    .setFooter(message.author.tag,message.author.displayAvatarURL())

    .setTimestamp(Date.now())

    if(!args || !args[0]) return message.reply(helpEmbed)

    let subCommand = args.shift().toLowerCase()

    if(!subCommand) return message.reply(helpEmbed)

    if (subCommand == `on`){

        let autorole = getautorole(message.guild.id , `value`)

    

    if(autorole && autorole == true) return message.reply(new Discord.MessageEmbed()

                                                                .setColor("#ff0000")

                                                                .setFooter(message.author.tag,message.author.displayAvatarURL())

                                                                .setTimestamp(Date.now())

                                                                .setTitle(`auto-role is already turned on in this server`))

    

    setautorole(message.guild.id , `value` , true)

    

    message.reply(new Discord.MessageEmbed()

                                                                .setColor("#1eff00")

                                                                .setFooter(message.author.tag,message.author.displayAvatarURL())

                                                                .setTimestamp(Date.now())

                                                                .setTitle(`auto-role has been successfully turned on in this server`))

    } else if (subCommand == `off`){

        let autorole = getautorole(message.guild.id , `value`)

    

    if(!autorole || autorole != true) return message.reply(new Discord.MessageEmbed()

    .setColor("#ff0000")

    .setFooter(message.author.tag,message.author.displayAvatarURL())

    .setTimestamp(Date.now())

    .setTitle(`auto-role is already turned off in this server`))

    

    setautorole(message.guild.id , `value` , false)

    

    message.reply(new Discord.MessageEmbed()

    .setColor("#1eff00")

    .setFooter(message.author.tag,message.author.displayAvatarURL())

    .setTimestamp(Date.now())

    .setTitle(`auto-role has been successfully turned off in this server`))

    } else if (subCommand == `add`){

        let role = getRole(message,args)

        if(!role) return message.reply(`Sorry , I Can't find this role`)

        let roles = getautorole(message.guild.id,`roles`)

        if(roles.includes(role.id)) return message.channel.send(new Discord.MessageEmbed()

        .setFooter(message.author.tag,message.author.displayAvatarURL())

        .setTimestamp(Date.now())

        .setTitle(`This Role is already in auto-roles list in this server`)

        .setDescription(`<@&${role.id}>`))

        roles.push(role.id)

        setautorole(message.guild.id,`roles`,roles)

        message.channel.send(new Discord.MessageEmbed()

        .setFooter(message.author.tag,message.author.displayAvatarURL())

        .setTimestamp(Date.now())

        .setTitle(`This role has been successfully added to auto-roles list in this server`)

        .setDescription(`<@&${role.id}>`))

    } else if (subCommand == `remove`){

        let role = getRole(message,args)

        if(!role) return message.reply(`Sorry , I Can't find this role`)

        let roles = getautorole(message.guild.id,`roles`)

        if(!roles.includes(role.id)) return message.channel.send(new Discord.MessageEmbed()

        .setFooter(message.author.tag,message.author.displayAvatarURL())

        .setTimestamp(Date.now())

        .setTitle(`This Role is not in auto-roles list in this server`)

        .setDescription(`<@&${role.id}>`))

        let pos = roles.indexOf(role.id)

        roles.splice(pos, 1);

        setautorole(message.guild.id,`roles`,roles)

        message.channel.send(new Discord.MessageEmbed()

        .setFooter(message.author.tag,message.author.displayAvatarURL())

        .setTimestamp(Date.now())

        .setTitle(`This role has been successfully removed from auto-roles list in this server`)

        .setDescription(`<@&${role.id}>`))

    } else if (subCommand == `removeall`){

        let roles = getautorole(message.guild.id,`roles`)

        if(!roles || roles.length == 0 || roles.length < 1 || !roles[0]) return message.channel.send(`auto-roles list is already empty`)

        message.channel.send(new Discord.MessageEmbed()

        .setFooter(message.author.tag,message.author.displayAvatarURL())

        .setTimestamp(Date.now())

        .setTitle(`Removed`)

        .setDescription(`** \`\` ${roles.length} \`\` roles has been successfully removed from this auto-roles list in this server**`))

        roles = []

        setautorole(message.guild.id,`roles`,roles)

    } else if (subCommand == `list`){

        let roles = getautorole(message.guild.id,`roles`)

        if(!roles || roles.length == 0 || roles.length < 1 || !roles[0]) return message.channel.send(`auto-roles list is empty`)

        let embed = new Discord.MessageEmbed()

        .setColor("RANDOM")

        .setTitle(`auto-roles List:`)

        .setFooter(message.author.tag,message.author.displayAvatarURL())

        .setTimestamp(Date.now());

        let string = ``;

        roles.forEach((thisRole) => {

            string = string + `<@&${thisRole}>\n`

        })

        embed.setDescription(string)

        message.channel.send(embed)

    } else if ( subCommand == `bot`){

        if(!message.guild.me.hasPermission('ADMINISTRATOR')) 

        return message.channel.send(` ** Sorry , I Don't Have \`\` ADMINISTRATOR \`\` Permission ** `);

    

        let helpEmbed = new Discord.MessageEmbed()

        .setColor("RANDOM")

        .setTitle(`auto-role: Commands List`)

        .setDescription(`**${PREFIX}auto-role bot on 

    turn on the auto-role in this server

    ======================================

    ${PREFIX}auto-role bot off

    turn off the auto-role in this server

    ======================================

    ${PREFIX}auto-role bot add <Role>

    add a role to auto-bot-roles in this server

    ======================================

    ${PREFIX}auto-role bot remove <Role>

    remove a role from auto-bot-roles in this server

    ======================================

    ${PREFIX}auto-role bot removeAll

    remove all bot roles from auto-role in this server

    ======================================

    ${PREFIX}auto-role bot list

    show all bot roles from auto-bot-roles list in this server

    ======================================**`)

        .setFooter(message.author.tag,message.author.displayAvatarURL())

        .setTimestamp(Date.now())

    

    

    

        if(!args || !args[0]) return message.reply(helpEmbed)

        let subCommand = args.shift().toLowerCase()

        if(!subCommand) return message.reply(helpEmbed)

        if (subCommand == `on`){

    

            let autorole = getautorole(message.guild.id , `botvalue`)

        

        if(autorole && autorole == true) return message.reply(new Discord.MessageEmbed()

        .setColor("#ff0000")

        .setFooter(message.author.tag,message.author.displayAvatarURL())

        .setTimestamp(Date.now())

        .setTitle(`auto-role 4bots is already turned on in this server`))

        

        setautorole(message.guild.id , `botvalue` , true)

        

        message.reply(new Discord.MessageEmbed()

                                                                .setColor("#1eff00")

                                                                .setFooter(message.author.tag,message.author.displayAvatarURL())

                                                                .setTimestamp(Date.now())

                                                                .setTitle(`auto-role 4bots has been successfully turned on in this server`))

    

        } else if (subCommand == `off`){

    

            let autorole = getautorole(message.guild.id , `botvalue`)

        

        if(autorole && autorole == false) return message.reply(new Discord.MessageEmbed()

        .setColor("#ff0000")

        .setFooter(message.author.tag,message.author.displayAvatarURL())

        .setTimestamp(Date.now())

        .setTitle(`auto-role 4bots is already turned on in this server`))

        

        setautorole(message.guild.id , `botvalue` , false)

        

        message.reply(new Discord.MessageEmbed()

    .setColor("#1eff00")

    .setFooter(message.author.tag,message.author.displayAvatarURL())

    .setTimestamp(Date.now())

    .setTitle(`auto-role 4bots has been successfully turned off in this server`))

    

    

} else if (subCommand == `add`){

    let role = getRole(message,args)

    if(!role) return message.reply(`Sorry , I Can't find this role`)

    let roles = getautorole(message.guild.id,`botroles`)

    if(roles.includes(role.id)) return message.channel.send(new Discord.MessageEmbed()

    .setFooter(message.author.tag,message.author.displayAvatarURL())

    .setTimestamp(Date.now())

    .setTitle(`This Role is already in auto-roles list 4bots in this server`)

    .setDescription(`<@&${role.id}>`))

    roles.push(role.id)

    setautorole(message.guild.id,`botroles`,roles)

    message.channel.send(new Discord.MessageEmbed()

    .setFooter(message.author.tag,message.author.displayAvatarURL())

    .setTimestamp(Date.now())

    .setTitle(`This role has been successfully added to auto-roles list 4bots in this server`)

    .setDescription(`<@&${role.id}>`))

} else if (subCommand == `remove`){

    let role = getRole(message,args)

    if(!role) return message.reply(`Sorry , I Can't find this role`)

    let roles = getautorole(message.guild.id,`botroles`)

    if(!roles.includes(role.id)) return message.channel.send(new Discord.MessageEmbed()

    .setFooter(message.author.tag,message.author.displayAvatarURL())

    .setTimestamp(Date.now())

    .setTitle(`This Role is not in auto-roles list 4bots in this server`)

    .setDescription(`<@&${role.id}>`))

    let pos = roles.indexOf(role.id)

    roles.splice(pos, 1);

    setautorole(message.guild.id,`botroles`,roles)

    message.channel.send(new Discord.MessageEmbed()

    .setFooter(message.author.tag,message.author.displayAvatarURL())

    .setTimestamp(Date.now())

    .setTitle(`This role has been successfully removed from auto-roles list 4bots in this server`)

    .setDescription(`<@&${role.id}>`))

} else if (subCommand == `removeall`){

    let roles = getautorole(message.guild.id,`botroles`)

    if(!roles || roles.length == 0 || roles.length < 1 || !roles[0]) return message.channel.send(`auto-roles list is already empty`)

    message.channel.send(new Discord.MessageEmbed()

    .setFooter(message.author.tag,message.author.displayAvatarURL())

    .setTimestamp(Date.now())

    .setTitle(`Removed`)

    .setDescription(`** \`\` ${roles.length} \`\` roles has been successfully removed from this auto-roles list 4bots in this server**`))

    roles = []

    setautorole(message.guild.id,`botroles`,roles)

} else if (subCommand == `list`){

    let roles = getautorole(message.guild.id,`botroles`)

    if(!roles || roles.length == 0 || roles.length < 1 || !roles[0]) return message.channel.send(`auto-roles list 4bots is empty`)

    let embed = new Discord.MessageEmbed()

    .setColor("RANDOM")

    .setTitle(`auto-roles List:`)

    .setFooter(message.author.tag,message.author.displayAvatarURL())

    .setTimestamp(Date.now());

    let string = ``;

    roles.forEach((thisRole) => {

        string = string + `<@&${thisRole}>\n`

    })

    embed.setDescription(string)

    message.channel.send(embed)

}

    }

}

})

function getautorole(g,t){

    let data = JSON.parse(fs.readFileSync('./autorole.json'))

    let autorole = data[g]

    if(!autorole) autorole = {

        "value": true,

        "roles": [],

        "botvalue": true,

        "botroles": []

    }

    if(!t) return autorole

    if(t == `value`) return autorole.value

    if(t == `roles`) return autorole.roles

    if(t == `botvalue`) return autorole.botvalue

    if(t == `botroles`) return autorole.botroles

    return autorole

}

function setautorole(i1,i2,i3){

    let data = JSON.parse(fs.readFileSync('./autorole.json'))

    if(!data[i1]) data[i1] = {

        "value": true,

        "roles": [],

        "botvalue": true,

        "botroles": []

    }

    data[i1][i2] = i3

    fs.writeFileSync('./autorole.json', JSON.stringify(data, null, 4))

}

function getRole(message,args){

    let role;

    if(message.mentions.roles.first()) role = message.mentions.roles.first();

    if(!role && args && args[0]) role = message.guild.roles.cache.get(args[0])

    if(!role && args && args[0]) role = message.guild.roles.cache.find(role => role.name === args[0])

    if(!role && args && args[0]){

        let string = args.join(" ")

        role = message.guild.roles.cache.find(role => role.name === string)

    }

    if(!role && args && args[0]) role = message.guild.roles.cache.find(role => role.name.includes(args[0]))

    if(!role && args && args[0]){

        let string = args.join(" ")

        role = message.guild.roles.cache.find(role => role.name.includes(string))

    }

    if(role) return role

    else return undefined

}

client.on('guildMemberAdd',member => {

    let roles = getautorole(member.guild.id,`roles`)

    roles.forEach((thisRole) => {

        let cRole = member.guild.roles.cache.get(thisRole)

        if(!cRole) { let pos = roles.indexOf(thisRole)

        roles.splice(pos, 1)}

    })

    setautorole(member.guild.id,`roles`,roles)

    let p = client.users.cache.get(member.id)

    if(!p.bot){

        let autorole = getautorole(member.guild.id , `value`)

    

    if(autorole && autorole == true) {

        let roles = getautorole(member.guild.id,`roles`)

        roles.forEach((thisRole) => {

            let role = member.guild.roles.cache.get(thisRole)

            try {

                member.roles.add(role,`auto-role`)

            } catch (error) {

                error = null

            }

        })

        

    }} else {

        let autorole = getautorole(member.guild.id , `botvalue`)

    

    if(autorole && autorole == true) {

        let roles = getautorole(member.guild.id,`botroles`)

        roles.forEach((thisRole) => {

            let role = member.guild.roles.cache.get(thisRole)

            try {

                member.roles.add(role,`auto-role 4Bots`)

            } catch (error) {

                error = null

            }

        })

        

    }}

})


