const { Pool } = require('pg')

const pool = new Pool({
	user: 'ejphnxlxyfawqt',
	host: 'ec2-54-220-170-192.eu-west-1.compute.amazonaws.com',
	database: 'dfnp8hb21h8gul',
	password: 'd5d716b4c0dba478dc03caf3ffb92c55520935fcfa5a43e6b348203f30ea602a',
	port: 5432,
	ssl: {
		rejectUnauthorized: false
	},
})

module.exports = {
	async query(text, params) {
		const start = Date.now()
		const res = await pool.query(text, params)
		const duration = Date.now() - start
		console.log('executed query', { text, duration, rows: res.rowCount })
		return res.rows
	}
}
