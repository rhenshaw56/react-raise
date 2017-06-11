const Inquire = require('./Inquire');

/**
 * ReactRaise class
 * @class ReactRaise
 */
class ReactRaise {

  /**
   * Creates an instance of ReactRaise.
   * @memberOf ReactRaise
   */
  constructor() {
    this.privateProps = new WeakMap();
    this.privateProps.set(this, {
      setupInfo: {},
    });
  }

  /**
   * set or alter the private properties;
   * @param {String} key - key of item to set
   * @param {any} value - value to store inside private property
   * @returns {object} set private properties
   * @memberOf ReactRaise
   */
  setProp(key, value) {
    return this.privateProps.set(
      this,
      Object.assign({}, this.privateProps.get(this), { [key]: value })
    );
  }

  /**
   * get the private properties;
   * @param {String} key - key of item to get
   * @returns {object} set private properties
   * @memberOf ReactRaise
   */
  getProp(key) {
    return this.privateProps.get(this)[key];
  }

  /**
   * initialize command and ask setup questions
   * @param {Function} callback - function to execute after answers has been given
   * @returns {Void} returns nothing
   * @memberOf ReactRaise
   */
  init(callback) {
    const startInquire = new Inquire();
    startInquire.question('description', 'input', 'Can you describe your app[optional]');
    startInquire.question(
      'main',
      'input',
      'What is the main entry file of your app[Default: index.js]');
    startInquire.question('author', 'input', 'What is your name[optional]');
    startInquire.question(
      'license',
      'input',
      'What is license is your app under[Default: MIT]'
    );
    startInquire.question(
      'express',
      'input',
      'Do you want to configure an express server with this app(y/n)',
      'yesNo'
    );

    startInquire.ask((information) => {
      this.setProp('setupInfo', information);
      if (callback) {
        callback();
      }
    });
  }
}

module.exports = ReactRaise;