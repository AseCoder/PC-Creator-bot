module.exports = {
	run: async (client, message, args) => {
		const age = message.member.joinedTimestamp < Date.now() - client.userLevels._requirements.age;
		const messages = client.userLevels.getEligible(message.author.id);
		const role = message.guild.roles.cache.get(client.config.mainServer.roles.levelOne);
		if (age && messages) {
			if (message.member.roles.cache.has(role.id)) return message.channel.send(`You already have the **${role.name}** role.`);
			await message.channel.send(`You\'re eligible for access to the **${role.name}** role.`);
			await message.member.roles.add(role.id);
			message.channel.send(`You\'ve received the **${role.name}** role. You can now access <#${client.config.mainServer.channels.betterGeneral}>`);
		} else {
			message.channel.send(`You\'re not eligible for access to the **${role.name}** role. Progress:\n${messages ? ':white_check_mark:' : ':x:'} ${client.userLevels.getUser(message.author.id)}/${client.userLevels._requirements.messages} messages\n${age ? ':white_check_mark:' : ':x:'} ${Math.floor((Date.now() - message.member.joinedTimestamp) / 1000 / 60 / 60 / 24)}d/${Math.floor(client.userLevels._requirements.age / 1000 / 60 / 60 / 24)}d time on server.`);
		}
	},
	name: 'applyforbetterchat',
	description: 'Check your eligibility for access to the Level 1 role.',
	alias: ['afbc'],
	category: 'Moderation'
};