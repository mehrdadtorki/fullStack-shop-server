const AuthenticationRepository = require('../../infrastructure/persistence/repositories/AuthenticationRepository.js');

class AuthenticationService {
  static async userSignUp(userSignUpItem) {
    return await AuthenticationRepository.userSignUp(userSignUpItem);
  }
  static async userSignIn(userSignInItem) {
    return await AuthenticationRepository.userSignIn(userSignInItem);
  }
}

module.exports = { AuthenticationService };
