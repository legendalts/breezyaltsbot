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

var data2;
fs.readFile('vipalts.txt', 'utf8', function (err,rawData) {
  if (err) {
    return console.log(err);
  }
  data2 = rawData.split('\n');
});
function randomInt2 (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
function getRandomLine2(){
  return data2[randomInt2(0,data.length)];
}

// Normal alts count
var i;
var count = 0;
require('fs').createReadStream(process.argv[2])
  .on('data', function(chunk) {
    for (i=0; i < chunk.length; ++i)
      if (chunk[i] == 10) count++;
  })
  .on('end', function() {
    //console.log(count);
  });
// ---------------------------

client.on('ready', () => {
    client.user.setActivity(count + ' alts' + ' | !getalt', {type: 'PLAYING'});
});

client.on('message', msg => {
    if (!msg.content.startsWith(process.env.PREFIX) || !msg.guild) return;
    const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
    const args = msg.content.split(' ').slice(1).join(' ');
    if (command === 'getalt') {
	    
	    if (msg.channel.id === "407805388927401984") {
		    
		    if (talkedRecently.has(msg.author.id)) {
			
			msg.channel.fetchMessages()
		       .then(function(list){
			    msg.channel.bulkDelete(list);
			}, function(err){msg.channel.send("ERROR: ERROR CLEARING CHANNEL.")}) 
			
			msg.channel.send("Type !getalt\nTo claim an alt.\nAll the alts are sent to the DMs.");
			
				msg.author.send("Please wait a minute before getting another alt.");
		    } else {
		    
		    msg.channel.fetchMessages()
		       .then(function(list){
			    msg.channel.bulkDelete(list);
			}, function(err){msg.channel.send("ERROR: ERROR CLEARING CHANNEL.")})  
			
	    		msg.channel.send("Type !getalt\nTo claim an alt.\nAll the alts are sent to the DMs.");
			msg.author.send(':arrow_down: :regional_indicator_a: :regional_indicator_l: :regional_indicator_t: :arrow_down: \n' + getRandomLine() + '\n:regional_indicator_e: :regional_indicator_n: :regional_indicator_j: :regional_indicator_o: :regional_indicator_y: \n:heart_decoration: :heart: :heart_decoration: :heart: :heart_decoration:');
    	      		client.channels.get('407811864219746304').send('The user ' + msg.author + ' claimed an alt.');
					
						// Adds the user to the set so that they can't talk for a minute
						talkedRecently.add(msg.author.id);
						setTimeout(() => {
						  // Removes the user from the set after a minute
						  talkedRecently.delete(msg.author.id);
						}, 60000);
					
		    }
	    } else {
			msg.author.send("Please use this command in the #get-alt channel of our server.");
		}
		
	}
	
	    if (command === 'vipalt') {
			msg.channel.send("Test");
		}
});

client.login(process.env.TOKEN);
