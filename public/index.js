const server = io().connect()


/* ---------------------------------- Chat ---------------------------------- */

const renderChat = chatMessages => {
	let chat = document.querySelector("#chat")
	let html = chatMessages.map(mens => {
		return `<li>
        <strong style="color:blue"> ${mens.mail} </strong>
		[<span style="color:brown">${mens.date}</span>]:
        <em style="color:green"> ${mens.message} </em>
        </li>`;
	});
	chat.innerHTML = html.join("")
}

const addMessage = evt => {
	const mail = document.querySelector("#mail").value
	const date = new Date().toLocaleTimeString()
	const message = document.querySelector("#message").value

	const chatText = { mail, date, message };
	server.emit("new-message", chatText, id => {
		console.log(id);
	});

	return false;
};

server.on("server-message", mensaje => {
	renderChat(mensaje.chatMessages)
});