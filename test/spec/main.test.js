describe('test suite', function () {
  it('should assert true', function () {
    true.should.be.true;
    false.should.be.false;
  });
});

describe('hello', function () {
  it('should return world', function () {
    hello().should.equal('world');
  });
});


describe('new contact button', function() {
  it('should listen for a click and return a message', function() {
    buttonMessage().should.equal('I was clicked!');
  });
});
