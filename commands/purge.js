module.exports = {
	run: async (client, message, args) => {
		const amount = parseInt(args[1]);
		const modRole = client.config.mainServer.roles.moderator;
		if (!message.member.roles.cache.has(modRole)) return message.channel.send(`You need the **${message.guild.roles.cache.get(modRole).name}** role to use this command.`);
		if (!amount) return message.channel.send('You need to specify an amount of messages to delete.');
		if (amount > 100) return message.channel.send('You can only delete 100 messages at once. This is a Discord API limitation.');
		const deleted = await message.channel.bulkDelete(amount).catch(err => message.channel.send('Something went wrong while deleting messages.'));
		message.channel.send(`Deleted **${deleted.size}** messages from **${message.channel.toString()}**`);
	},
	name: 'purge',
	description: 'Delete many messages from a channel',
	category: 'Moderation',
	usage: ['amount']
};