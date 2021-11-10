function countPogs(message) {
  // initialize the pogCount
  let pogCount = 0;

  // convert to lowercase
  const matchingTerms = message.toLowerCase().split(' ');

  // increment pog count
  matchingTerms.map(word => {
    if (word.includes('pog')) pogCount += 1;
    if (word.includes('pawg')) pogCount += 1;
  });

  return pogCount;
};

function sendPogMessage(pogCount, message) {
  if (pogCount > 0) {
    return message.channel.send(`
      ${message.author.username} said pog ${pogCount} times. 
      ${message.author.username} must really like pogs!
      `);
  }
};

module.exports = { countPogs, sendPogMessage };