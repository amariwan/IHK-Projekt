const config = require('../../.config/config.json');
const { Discord, Client, GatewayIntentBits, MessageEmbed } = require('discord.js');
// if (network === 'online') {
// 	const axios = require('axios');
// 	const client = new Client({
// 		intents: [
// 			GatewayIntentBits.DirectMessages,
// 			GatewayIntentBits.Guilds,
// 			GatewayIntentBits.GuildBans,
// 			GatewayIntentBits.GuildMessages,
// 			GatewayIntentBits.GuildBans,
// 			GatewayIntentBits.GuildMembers,
// 			GatewayIntentBits.GuildMessageReactions,
// 			GatewayIntentBits.GuildMessageTyping,
// 			GatewayIntentBits.MessageContent
// 		],
// 		partials: [ 'MESSAGE', 'CHANNEL', 'REACTION' ]
// 	});

// 	client.on('ready', async () => {
// 		console.log(`Logged in as ${client.user.tag}!`);
// 		const user = await client.users.fetch('449846575561441280');
// 		user.send('Hey ' + user.username);
// 		user.send("I'm now online");
// 		client.user.setPresence({
// 			activities: [ { name: `discord.js v14`, type: `WATCHING` } ],
// 			status: 'dnd',
// 			game: {
// 				name: 'me getting developed',
// 				type: 'STREAMING'
// 			},
// 			afk: false
// 		});
// 	});

// 	client.on('warn', (err) => console.warn('[WARNING]', err));

// 	client.on('error', (err) => console.error('[ERROR]', err));

// 	client.on('disconnect', () => {
// 		console.warn('Disconnected!');
// 		process.exit(0);
// 	});

// 	client.on('uncaughtException', (err) => {
// 		console.log('Uncaught Exception: ' + err);
// 		process.exit(1);
// 	});

// 	client.on('messageCreate', async (message) => {
// 		if (message.author.bot) return;
// 		const user = await client.users.fetch('449846575561441280');
// 		var msg = message.content.toLowerCase();
// 		if (msg == 'how are you?') {
// 			message.author.send("I'm finde, Thank you " + user.username);
// 			message.author.send('what about you ' + user.username);
// 		} else {
// 			let res = await axios.get(
// 				`http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=1&msg=${encodeURIComponent(msg)}`
// 			);
// 			message.author.send(res.data.cnt);
// 		}
// 	});

// 	const sendMsg = async (msg) => {
// 		const user = await client.users.fetch('449846575561441280');
// 		user.send(msg);
// 	};

// 	client.login(config.discord[0].tokenBot);
// } else {
// }
client = {};
const sendMsg = (x) => {};
module.exports = { client, sendMsg };
