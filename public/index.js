const server = io().connect()


/* ---------------------------------- Chat ---------------------------------- */

const renderChat = chatMessages => {
	let chat = document.querySelector("#chat")
	let html = chatMessages.map(mens => {
		return `<li>
        <h4 style="color:blue"> ${mens.mail} </h4>
        <h4> ${mens.name} </h4>
        <h4> ${mens.lastName} </h4>
        <h4> ${mens.age} </h4>
        <h4> ${mens.alias} </h4>
		<h4> ${mens.avatar}</h4>
		<h4 style="color:brown">${mens.date}</span>
        <em style="color:green"> ${mens.message} </em>
        </li>`;
	});
	chat.innerHTML = html.join("")
}

const addMessage = evt => {
	const id = document.querySelector("#id").value
	const name = document.querySelector("#name").value
	const lastName = document.querySelector("#lastName").value
	const age = document.querySelector("#age").value
	const alias = document.querySelector("#alias").value
	const avatar = document.querySelector("#avatar").value
	const date = new Date().toLocaleTimeString()
	const message = document.querySelector("#message").value

	const chatText = { 
		author: {
			id,
			name,
			lastName,
			age,
			alias,
			avatar,
		},
		date,
		message
	}
	
	server.emit("new-message", chatText, id => {
		console.log(id);
	});

	return false;
};

server.on("server-message", mensaje => {
	renderChat(mensaje.chatMessages)
});