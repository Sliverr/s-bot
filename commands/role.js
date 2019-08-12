module.exports = {
	name: 'role',
    description: 'Role!',
    args: true,
    usage: 'number OR "file-name"',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};