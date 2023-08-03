module.exports = class NotValidIdError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotValidId';
  }
};
