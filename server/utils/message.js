// Generates the message from server.js
let generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  }
};

module.exports = {generateMessage};
