const { prefix } = require('../config.json');

module.exports = {
	name: 'play',
	description: 'Play selected sound file',
	aliases: ['sound', 'audio'],
	usage: 'number OR !play file-name',


	execute(message, args) {
		const fileToPlay = args[0];

		if (!message.guild) return;

		if (fileToPlay === 'branch') {
			// Only try to join the sender's voice channel if they are in one themselves
			if (message.member.voiceChannel) {
				message.member.voiceChannel.join().then(connection => {
					const dispatcher = connection.playFile('..\sounds\branch_mechanic.mp3')
					dispatcher.on('finish', () => {
						console.log('Finished playing!');
					});
					
				});

			
			} else {
				message.reply('You need to join a voice channel first!');
			}
		}
	}
};