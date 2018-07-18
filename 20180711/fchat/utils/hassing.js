var bcrypt = require('bcryptjs');

var passwordToHass = (pass) => {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pass, salt);
};

var passwordToCompare = (plainpass, hashpass) => {
  return bcrypt.compareSync(plainpass, hashpass);
};

module.exports = {passwordToHass, passwordToCompare};
