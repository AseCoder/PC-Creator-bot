module.exports = {
	run: async (client, message, args) => {
		if (!message.member.roles.cache.has(client.config.mainServer.roles.moderator)) return message.channel.send(`You need the **${message.guild.roles.cache.get(client.config.mainServer.roles.moderator).name}** role to use this command`);
		let member;
		let timedOut = false;
		if (args[1]) member = message.mentions.members?.first() || (await message.guild.members.fetch(args[1]).catch(() => undefined));
		if (!member) {
			await message.channel.send('Which member would you like to unmute? Reply with a mention or a user ID.').then(async x => {
				await message.channel.awaitMessages(y => y.author.id === message.author.id, { time: 15000, errors: ['time', 'maxProcessed'], maxProcessed: 1 }).then(async z => {
					member = z.first().mentions.members?.first() || (await message.guild.members.fetch(z.first().content).catch(() => undefined));
				}).catch(async () => {
					await message.channel.send('Command cancelled after 15 seconds of inactivity.');
					timedOut = true;
				});
			});
		}
		if (!member && !timedOut) {
			return message.channel.send('You failed to mention a member.');
		} else if (!member && timedOut) return;
		const role = message.guild.roles.cache.find(role => role.id === client.config.mainServer.roles.muted);
		if (!role) message.channel.send('Indicated role does not exist');
		if (!member.roles.cache.has(role.id)) return message.channel.send(`Cannot unmute **${member.user.tag}** because they are not muted.`);
		member.roles.remove(role, `Command done by @${message.author.tag} (${message.author.id})`).then(() => {
			message.channel.send(`Unmuted **${member.user.tag}**`);
		}).catch(() => {
			message.channel.send('Failed.')
		});
	},
	name: 'unmute',
	alias: ['removemute'],
	usage: ['Mention / User ID'],
	description: 'Remove a mute from someone',
	category: 'Moderation'
};