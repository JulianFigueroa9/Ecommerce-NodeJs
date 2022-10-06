const authMiddleware = async (req, res, next) => {
    const { username } = req.session;
    console.log(username)
    if(username == 'Julian'){
      return next()
    }
    return res.status(400).send(`<h1>Usuario no autenticado</h1>`)
  };
  
  module.exports = authMiddleware
  