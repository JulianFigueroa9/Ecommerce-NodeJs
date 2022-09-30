const server = io().connect()


/* ---------------------------------- Chat ---------------------------------- */

const render = chatMessages => {
	let chat = document.querySelector("#chat")
	let html = chatMessages.map(mens => {
		return `<li>
        <h4 style="color:blue"> ${mens.author} </h4>
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
	const message = document.querySelector("#message").value

	const chatText = { 
		author: { id, name, lastName, age, alias, avatar },
		message
	}
	
	server.emit("new-message", chatText, id => {
		console.log(id);
	});

	return false;
};

server.on("server-message", mensaje => {
	render(mensaje.chatMessages)
});