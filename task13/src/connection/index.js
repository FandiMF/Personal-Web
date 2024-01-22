// import packeage
const { Pool} = require('pg')

// konfigurasi ke db
// menjalankan pg pool untuk koneksi ke db
const dbPool = new Pool({
    user: 'postgres',
    database: 'postgres',
    password: 'Unn50123',
    port: '5432'
})

module.exports = dbPool;