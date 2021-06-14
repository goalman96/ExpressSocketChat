

getRooms().then((response) => {
	if (response.data.length) {
		response.data.forEach(room => {
			addRoom(room)
		})
	}
}).catch((e) => {
		console.debug(e)
})

function addRoom(room) {
	const option = document.createElement('option');
	option.value = room.id;
	option.text = room.name
	document.querySelector('#room').appendChild(option);
}


