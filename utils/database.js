const { Client } = require('pg')
const client = new Client()
client.connect()
client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
	console.log(err ? err.stack : res.rows[0].message) // Hello World!
	client.end()
})

// pool.query('SELECT * FROM message WHERE id = $1', [1])
// 	.then(res => console.log('message:', res.rows[0]))
// 	.catch(err =>
// 		setImmediate(() => {
// 			throw err
// 		})
// 	)
