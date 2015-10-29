describe('wacky board', function() {
  it('should display a wacky board', function() {
    browser.get('/#/game/wacky');
    expect(element(by.repeater('column in ticTacRow')).getText()).toEqual('A');
  });

  it('should allow us to register', function(done) {
    browser.get('/register');
    element(by.model('first_name')).sendKeys('myNewFirstname');
    element(by.model('last_name')).sendKeys('myNewLastname');
    element(by.model('username')).sendKeys('myNewUsername');
    element(by.model('email')).sendKeys('mickmac88@gmail.com');
    element(by.model('password')).sendKeys('mypassword');

    element(by.tagName('button')).click();

    browser.getCurrentUrl().then(function(url) {
      expect(url).toEqual(browser.baseUrl + '/games');
      done();
    })
  });
});
