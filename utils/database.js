const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool()
pool.query('SELECT NOW()', (err, res) => {
	console.log(err, res)
	pool.end()
})


// pool.query('SELECT * FROM message WHERE id = $1', [1])
// 	.then(res => console.log('message:', res.rows[0]))
// 	.catch(err =>
// 		setImmediate(() => {
// 			throw err
// 		})
// 	)
