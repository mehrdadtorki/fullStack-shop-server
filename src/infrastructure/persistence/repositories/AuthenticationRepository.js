const IAuthenticationRepository = require('../../../domain/repositories/IAuthenticationRepository');
const db = require('../database/mySQL');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Make sure to load environment variables

class AuthenticationRepository extends IAuthenticationRepository {
  static async userSignUp(userSignUpItem) {
    try {
      const {
        first_name,
        last_name,
        phone,
        email,
        password,
        confirmationPassword,
      } = userSignUpItem;

      if (
        !first_name ||
        !last_name ||
        !phone ||
        !email ||
        !password ||
        !confirmationPassword
      ) {
        throw new Error('Implemented data is not completed');
      } else if (password !== confirmationPassword) {
        throw new Error(
          'Password must be the same as the confirmation password'
        );
      } else {
        // Check if the email already exists in the database
        const [
          rows,
        ] = await db.execute(
          'SELECT COUNT(*) as count FROM customers WHERE email = ?',
          [email]
        );

        if (rows[0].count > 0) {
          throw new Error('Email already exists');
        }
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      if (hashedPassword) {
        const [
          row,
        ] = await db.execute(
          'INSERT INTO customers (first_name, last_name, phone, email, password) VALUES (?, ?, ?, ?, ?)',
          [first_name, last_name, phone, email, hashedPassword]
        );
        return row.affectedRows;
      }
    } catch (error) {
      console.error(
        'Error in userSignUp method of AuthenticationRepository',
        error
      );
    }
  }

  static async userSignIn(userSignInItem) {
    try {
      const { email, password } = userSignInItem;
      const [rows] = await db.execute(
        'SELECT * FROM customers WHERE email = ?',
        [email]
      );

      if (rows.length > 0) {
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          // Use a consistent secret key from environment variables
          const secretKey = process.env.JWT_SECRET;

          const token = jwt.sign(
            { userId: user.customer_id, email: user.email },
            secretKey,
            { expiresIn: '1h' }
          );

          return token;
        } else {
          throw new Error('Password is incorrect');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.log('Error in userSignIn Repository:', error);
      throw error;
    }
  }
}

module.exports = AuthenticationRepository;
