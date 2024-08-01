const db = require('../../database/mySQL')

class Customer {
    static async getAllCustomers () {
        try {
            const customers = db.execute('SELECT * FROM')
        } catch (error) {
            console.error(error)
        }
    }
}