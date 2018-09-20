// Generates the message from server.js
let generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  }
};

// Generates the message from server.js
let generateLocationMessage = (from, lat, lng) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt: new Date().getTime()
  }
};

module.exports = {generateMessage, generateLocationMessage};
