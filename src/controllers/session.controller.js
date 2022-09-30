const { response } = require("express")

const homepage = async (req, res = response) => {
    try {
      res.status(200).send(`<h1>Hola ${req.session.username}, esta es tu visita numero ${req.session.visits}</h1>`)
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
}

const login = async (req, res = response) => {
    try {
      const { username, password } = req.query;
      if (username == "Julian" && password == "1234") {
        req.session.username = username;
        req.session.admin = true;
        return res.status(200).send(`<h1>Usuario autenticado exitosamente</h1>`);
      }
      return res.status(400).send(`<h1>Datos incorrectos</h1>`);
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
      return res.status(200).send(`<h1>Hasta la próxima</h1>`)
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

module.exports = {
    homepage,
    login,
    logout
}
