module.exports = {
	run: (client, message, args) => {
		// 20% of the time responds with a ping
		if (Math.random() < 0.2) message.channel.send(message.member.toString() + (Math.random < 0.2 ? ' is a fucking cunt' : ' is sus!'));
	},
	name: 'sus',
	description: 'GuildMember deserialization with binary tree inversion',
	category: 'Moderation',
	usage: ['go', 'fuck', 'yourself', 'chikkenn']
};