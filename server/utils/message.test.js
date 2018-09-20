const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', ()=> {
  it('should generate correct message object', () => {
    let from = 'James';
    let text = 'Hello';
    let message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

describe('generateLocationMessage', ()=> {
  it('should generate correct location object', () => {
    let from = 'James';
    let lat = 57.2389108;
    let lng = -123.32423809;
    let url = 'https://www.google.com/maps?q=57.2389108,-123.32423809';
    let message = generateLocationMessage(from, lat, lng);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
  });
});
