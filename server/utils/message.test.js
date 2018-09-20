const expect = require('expect');

let {generateMessage} = require('./message')

describe('generateMessage', ()=> {
  it('should generate correct message object', () => {
    let from = 'James';
    let text = 'Hello';
    let message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});
