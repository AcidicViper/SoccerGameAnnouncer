const Discord = require('discord.js')
const TextDate = require('./textdate.js')
const MatchData = require('../acid-first-bot/matchdata.js')
const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

const client = new Discord.Client();

client.on("ready", async () => {
    console.log(`Started bot : ${client.user.username}`);
})

client.on('message', async (msg) => {
    if (msg.webhookID) return;
    if (msg.bot) return;

    if (!msg.content.startsWith("!")) return;
    const split = msg.content.substring(1).split(" ");

    switch (split[0].toLowerCase()) {
        case "laliga":
        case "liga":
            const ligaMatchInfo = await getUpcomingGame("https://www.theguardian.com/football/laligafootball/fixtures", 0);

            msg.channel.send(new Discord.MessageEmbed()
                .setColor("#003472")
                .setTitle("Match Details")
                .setDescription(ligaMatchInfo.getTeamOne() + " vs " + ligaMatchInfo.getTeamTwo() + "\n\n" +
                    "Date: \n" + ligaMatchInfo.getTextDate().getDay() + " " + ligaMatchInfo.getTextDate().getMonth() + " " + ligaMatchInfo.getTextDate().getDayDate() + "\n\n" +
                    "Time UTC + 1: " + ligaMatchInfo.getTime() + "\n\n" +
                    "**La Liga**")
            )
            break;
        case "premierleague":
        case "premier":
            const premierMatchInfo = await getUpcomingGame("https://www.theguardian.com/football/premierleague/fixtures", 1);

            msg.channel.send(new Discord.MessageEmbed()
                .setColor("#3F1052")
                .setTitle("Match Details")
                .setDescription(premierMatchInfo.getTeamOne() + " vs " + premierMatchInfo.getTeamTwo() + "\n\n" +
                    "Date: \n" + premierMatchInfo.getTextDate().getDay() + " " + premierMatchInfo.getTextDate().getMonth() + " " + premierMatchInfo.getTextDate().getDayDate() + "\n\n" +
                    "Time UTC + 1: " + premierMatchInfo.getTime() + "\n\n" +
                    "**Premier League**")
            )
            break;
        case "ligue1":
        case "ligueone":
            const ligueOneMatchInfo = await getUpcomingGame("https://www.theguardian.com/football/ligue1football/fixtures", 2);

            msg.channel.send(new Discord.MessageEmbed()
                .setColor("#90A5B6")
                .setTitle("Match Details")
                .setDescription(ligueOneMatchInfo.getTeamOne() + " vs " + ligueOneMatchInfo.getTeamTwo() + "\n\n" +
                    "Date: \n" + ligueOneMatchInfo.getTextDate().getDay() + " " + ligueOneMatchInfo.getTextDate().getMonth() + " " + ligueOneMatchInfo.getTextDate().getDayDate() + "\n\n" +
                    "Time UTC + 1: " + ligueOneMatchInfo.getTime() + "\n\n" +
                    "**Ligue 1**")
            );
            break;
    }
})

client.login("YOUR_TOKEN_HERE");

const getUpcomingGame = async (url, id) => {
    const html = await rp(url);
    const $ = cheerio.load(html);

    let scrapedData = $('.football-matches__container').text();
    scrapedData = scrapedData.replace(/\s/g, '');
    scrapedData = scrapedData.replace(/Matchstatus\/kickofftimeMatchdetails/g, '\n');

    const today = new Date();
    const date = scrapedData.split(today.getFullYear())[0];

    scrapedData = scrapedData.split(today.getFullYear())[1].split("LaLiga")[0];
    const amountOfZeros = scrapedData.split("0").length - 1;
    const teams = scrapedData.split("0")[amountOfZeros];
    const time = scrapedData.split(teams)[0];
    const data = new MatchData(date, time, teams, id);

    return data;
}
