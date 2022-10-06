const { response } = require("express");


const postLogin = async (req, res = response) => {
    try {
      const { username, password } = req.body;
      req.session.username = username;
      if (username == "Julian" && password == "1234") {
        return res.status(200).send(`<h1>Usuario autenticado exitosamente</h1>`)
        
      }
      return res.status(400).send(`<h1>Datos incorrectos</h1>`);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
}

const homepage = async (req, res = response) => {
  try {
    res.status(200).write(`<h1>Hola ${req.session.username}, esta es tu visita numero ${req.session.visits}</h1>`)
    res.end("<a href=" + "/api/session/logout" + ">Cerrar Sesion</a >");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}


const logout = async (req, res = response) => {
    try {
      req.session.destroy(err => {
          if(err){
              return res.status(500).send(`<h1>No se pudo cerrar sesion</h1>`)
          }
      })
      setTimeout(()=> {
        res.redirect('/')
      }, 2000)
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

module.exports = {
    homepage,
    logout,
    postLogin
}
