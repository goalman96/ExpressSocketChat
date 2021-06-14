const connection = require('./connection')

module.exports = {
	getRooms() {
		return connection.query('SELECT * from room;')
			.then((response) => {
				return response
			}).catch((e) => {
				console.debug(e)
			})
	},

	getRoom(roomId) {
		return connection.query('SELECT * from room WHERE id = $1;', [roomId])
			.then((response) => {
				return response[0]
			}).catch((e) => {
				console.debug(e)
			})
	},

	getRoomMessages(roomId) {
		return connection.query('SELECT id, text, time, username from message WHERE room_id = $1;', [roomId])
			.then((response) => {
				return response
			}).catch((e) => {
				console.debug(e)
			})
	},

 	saveMessage({text, time, username, roomId}) {
		return connection.query(
			'INSERT INTO message (text, time, username, room_id) values ($1, $2, $3, $4);',
			[text, time, username, roomId]
		).catch((e) => {
				console.debug(e)
			})
	}
}
