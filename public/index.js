const server = io().connect();

const renderMensajes = mensajesChat => {
	let chat = document.querySelector("#chat");
	let html = mensajesChat.map(mens => {
		return `<li>
        <strong style="color:blue"> ${mens.mail} </strong>
		[<span style="color:brown">${mens.fecha}</span>]:
        <em style="color:green"> ${mens.mensaje} </em>
        </li>`;
	});
	chat.innerHTML = html.join("");
};

const renderProductos = productos => {

    let productList = document.querySelector('#productList')
    let html = productos.map(prod => {
        return `<li>
        <strong> Producto: ${prod.title} </strong>
		<span> Precio: $${prod.price}</span>:
        <em> Foto: ${prod.thumbnail} </em>
        </li>`;
    })
    productList.innerHTML = html.join("")
}

const addMessage = evt => {
	const mail = document.querySelector("#mail").value;
	const fecha = new Date().toLocaleTimeString();
	const mensaje = document.querySelector("#mensaje").value;

	const chatText = { mail, fecha, mensaje };
	server.emit("mensaje-nuevo", chatText, id => {
		console.log(id);
	});

	return false;
};

const addProduct = evt => {
    const title = document.querySelector('#title').value
    const price = document.querySelector('#price').value
    const thumbnail = document.querySelector('#thumbnail').value

    const prodList = { title, price, thumbnail }
    server.emit("producto-nuevo", prodList, id => {
        console.log(id)
    });
    return false
};





server.on("producto-servidor", prod => {
    renderProductos(prod.productos)
});

server.on("mensaje-servidor", mensaje => {
	renderMensajes(mensaje.mensajesChat);
});














/* 
const server = io().connect()

const allProducts = async () => {
    await products.getAll()
}

const render = (globalChat) => {
    let chatList = document.getElementById('chatList')
    let html = globalChat.map(user => {
        return `<li>
        <strong>Usuario: ${user.email}</strong>
        <em> Mensaje: ${user.message}</em>
        <p>${user.date}</p>
        </li>`
    })
    chatList.innerHTML = html.join('')
}

const sendMessage = (evt) => {
    
    let email = document.querySelector('#email').value
    let date = new Date().toLocaleTimeString();
    let message = document.querySelector('#message').value

    const chat = {email, date, message}
    server.emit('new-message', chat, id => {
        console.log(id)
    })
   
    return false
} */



/* Listening for a message from the server. */
/* server.on('message-server', message => {
    render(message.globalChat)
}) */