const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login('ODAwNzA3NTk2MDAzNTczNzYw.YAWDDw.xrveHL6NgoexTegLbcyEjEJ96Eo') //token
const selampakk = '/'//prefix
const fetch = require("node-fetch");
const fs = require("fs");
const moment = require('moment')
require('moment-duration-format')
require("express")().listen(1343);

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log("Pinglenmedi.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


client.on("ready", () => {
  console.log("Bot Aktif");
  let playing = client.voice.connections.size;

  client.user.setPresence({
    activity: {
      name: "/yardım | Uptime Bot",
      type: "WATCHING",
      url: "https://www.twitch.tv/arx_07"
    }
  });
});

setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Pinglendi.");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});




client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == selampakk+"ekle") {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
             return message.channel.send(new discord.MessageEmbed().setFooter("Uptime Bot").setColor("RED").setDescription("**Projeniz Sistemimizde Zaten Var**"));
        message.channel.send(new discord.MessageEmbed().setFooter("Uptime Bot").setColor("RED").setDescription("**Projeniz Sistemimize Başarıyla Eklendi.**"));
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        return message.channel.send(new discord.MessageEmbed().setFooter("Uptime Bot").setColor("RED").setDescription("**Lütfen Bir Link Giriniz**"));
      });
  }
});


client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == selampakk+"göster") {
    var link = spl[1];
    message.channel.send(new discord.MessageEmbed().setFooter("Uptime Bot").setColor("RED").setDescription(`${db.get("linkler").length} **Proje Aktif Tutuluyor!**`));
  }
});
client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == selampakk+"davet") {
    var link = spl[1];
    const davet = new discord.MessageEmbed()
.setTitle(` ${message.author.tag} - Tarafından istendi.`, message.author.avatarURL)
.addField(`<a:mega:752956278178971793> Linkler <a:mega:752956278178971793>`,`[➾ Bot Davet Linki](https://discord.com/api/oauth2/authorize?client_id=800707596003573760&permissions=8&scope=bot)\n[➾ Destek Sunucusu](https://discord.gg/cAd5Tv4CAp)`)
.setThumbnail(``) 
.setFooter(`${client.user.username} - Tüm hakları saklıdır.`, client.user.avatarURL)
.setImage(`https://cdn.discordapp.com/attachments/799546879360368682/800712099608920134/standard.gif`)
  message.channel.send(davet)
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == selampakk+"yardım") {
    var link = spl[1];
    const help = new discord.MessageEmbed()
.setFooter(`Uptime Bot`)
.setColor(`RED`)
.setThumbnail('')
.setDescription(`**Selamlar, botunu uptime etmeye hazırmısın? \n artık kolay bir şekilde botunu 7/24 aktif edebilirsin!** \n\n🤹 **uptime olmak için \`/ekle [glitch linki]\` yazabilirsin** \n 🤹 **davet için** \`/davet \`  \n🎭 **Uptime ettiğin botlarımı görmek istiyorsun** \`/göster\` `)
.addField(`<a:mega:752956278178971793> Linkler <a:mega:752956278178971793>`,`[➾ Bot Davet Linki](https://discord.com/api/oauth2/authorize?client_id=800707596003573760&permissions=8&scope=bot)\n[➾ Destek Sunucusu](https://discord.gg/cAd5Tv4CAp)`)
.setImage(`https://cdn.discordapp.com/attachments/799546879360368682/800712099608920134/standard.gif`)

    message.channel.send(help);
    
  }
});
