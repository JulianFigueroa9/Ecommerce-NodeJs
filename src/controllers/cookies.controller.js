const { response } = require("express")

const saveCookies = async (req, res = response) => {
    try {
      const { name, value, expire } = req.query;
      if (!name || !value) {
        res.status(400).json({
          success: false,
          message: "Error con nombre o valor de cookie",
        });
      }
      let config = {};
      config["signed"] = true;
      if (expire) {
        config["maxAge"] = parseInt(expire) * 1000;
      }
      res.cookie(name, value, config);
      res.status(200).json({
        success: true,
        message: "Cookie guardada",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
}

const getCookies = async (req, res = response) => {
    try {
      const { signedCookies } = req;
      res.status(200).json(signedCookies);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
}

const deleteCookies = async (req, res = response) => {
    try {
      const { cookieName } = req.params
      req.clearCookie(cookieName)
      res.status(200).json({
          sucess: true,
          message: `Cookie ${cookieName} borrada`
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

module.exports = {
    saveCookies,
    getCookies,
    deleteCookies
}
