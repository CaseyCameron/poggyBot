function countPogs(message) {
  let pogCount = 0;

  const matchingTerms = message.toLowerCase().split(' ');

  matchingTerms.map(word => {
    if (word.includes('pog')) pogCount += 1;
  });

  return pogCount;
};

function sendPogMessage(pogCount, message) {
  const username = message.author.username;
  if (pogCount) {
    return message.channel.send(`
      ${username} said pog ${pogCount} times. 
      ${username} must really like pogs!
    `);
  }
};

module.exports = { countPogs, sendPogMessage };