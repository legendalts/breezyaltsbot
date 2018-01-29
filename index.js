// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();

// First, this must be at the top level of your code, **NOT** in any event!
const talkedRecently = new Set();

fs = require('fs')
var data;
fs.readFile('alts.txt', 'utf8', function (err,rawData) {
  if (err) {
    return console.log(err);
  }
  data = rawData.split('\n');
});
function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
function getRandomLine(){
  return data[randomInt(0,data.length)];
}

var lines = 0;
//Using the first argument as the filename
var filename = "alts.txt";
var stream = fs.createReadStream(filename)
//When data is received, check all the character codes and
//if we find a carriage return, increment the line counter
stream.on("data", function(chunk) {
    for(var i = 0; i < chunk.length; i++) {
        if (chunk[i] == 10 || chunk[i] == 13) lines++;
    }
});

client.on('ready', () => {
    client.user.setActivity(lines + ' alts' + ' | !getalt', {type: 'PLAYING'});
});

client.on('message', msg => {
    if (!msg.content.startsWith(process.env.PREFIX) || !msg.guild) return;
    const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
    const args = msg.content.split(' ').slice(1).join(' ');
    if (command === 'getalt') {
	    
	    if (msg.channel.id === "407466225107599380") {
		    
		    if (talkedRecently.has(msg.author.id)) {
				msg.author.send("Please wait a minute before getting another alt.");
		    } else {
		    
		    msg.channel.fetchMessages()
		       .then(function(list){
			    msg.channel.bulkDelete(list);
			}, function(err){msg.channel.send("ERROR: ERROR CLEARING CHANNEL.")})  
			
	    		msg.channel.send("Type !getalt");
	    		msg.channel.send("To claim an alt.");
	    		msg.channel.send("All the alts are sent to the DMs.");
			msg.author.send(':arrow_down: :regional_indicator_a: :regional_indicator_l: :regional_indicator_t: :arrow_down: \n' + getRandomLine() + '\n:regional_indicator_e: :regional_indicator_n: :regional_indicator_j: :regional_indicator_o: :regional_indicator_y: \n:heart_decoration: :heart: :heart_decoration: :heart: :heart_decoration:');
    	      		client.channels.get('407464458181672961').send('The user ' + msg.author + ' claimed an alt.');
		    }
	    } else {
			msg.author.send("Please use this command in the #get-alt channel of our server.");
		}
		
	}
    else if (command === 'invite') return msg.channel.send(process.env.INVITE);
});

client.login(process.env.TOKEN);
