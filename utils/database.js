const { Client } = require('pg')

const client = new Client({
	user: 'ejphnxlxyfawqt',
	host: 'ec2-54-220-170-192.eu-west-1.compute.amazonaws.com',
	database: 'dfnp8hb21h8gul',
	password: 'd5d716b4c0dba478dc03caf3ffb92c55520935fcfa5a43e6b348203f30ea602a',
	port: 5432,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
	console.log(err, res)
	client.end()
})


// pool.query('SELECT * FROM message WHERE id = $1', [1])
// 	.then(res => console.log('message:', res.rows[0]))
// 	.catch(err =>
// 		setImmediate(() => {
// 			throw err
// 		})
// 	)
