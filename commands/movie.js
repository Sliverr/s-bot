const { omdb } = require('../config.json');
const fetch = require('node-fetch');


module.exports = {
	name: 'movie',
	description: 'Provides information about a movie',
    args: true,
    aliases: ['film', 'f', 'm'],
	usage: 'movie title',
	async execute(message, args) {


        titleToSearch = args.join('+');
        message.channel.send(titleToSearch);
        const { body } = await fetch(`http://www.omdbapi.com/?apikey=${omdb}&t=${titleToSearch}`).then(response => response.json());
        message.channel.send(body.Title);
        
        //
	}
};