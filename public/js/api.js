const client = axios.create({
	baseURL: 'https://radiant-reef-83484.herokuapp.com',
	timeout: 1000
});


function getRooms() {
	return client.get('/rooms')
}

function getRoom(roomId) {
	return client.get('/room', {
		params: {
			room: roomId
		}
	})
}

function getRoomMessages(roomId) {
	return client.get('/messages', {
			params: {
				room: roomId
			}
	})
}

function saveMessage(message) {
	return client.post('/message', {
		data: {
			message: message
		}
	})
}

