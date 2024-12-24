const conn = require("../config/db_connection")

const getAllUser = () => {
    const QUERY = "SELECT * FROM users"
    return conn.execute(QUERY)
}

module.exports = {
    getAllUser
}
