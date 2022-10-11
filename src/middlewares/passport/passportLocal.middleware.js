const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const DaoUsersMongoDB = require('../../daos/users/usersDaoMongoDB')
const users = new DaoUsersMongoDB()

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

passport.serializeUser((user, done) => {
    console.log('serialize')
    done(null, user)
})

passport.deserializeUser((user, done) =>{
    console.log('deserialize')
    done(null, user)
})


passport.use('login', new LocalStrategy(
    async (username, password, done) => {
        let user = await users.getByUsername(username)
    
    if (!user) {
        console.log(`No existe el usuario ${username}`)
        return done(null, false, {message: 'Usuario no encontrado'})
    }
    
    if(!isValidPassword(user, password)) {
        console.log('Password inválida')
        return done(null, false, {message: 'Contraseña incorrecta'})
    }

    done(null, user)
    }
))

passport.use('signup', new LocalStrategy(
    {passReqToCallback: true},
    async (req, username, password, done) => {
        let user = await users.getByUsername(username)
    
    if (user) {
        console.log(`El usuario ${username} ya se encuentra registrado`)
        return done(null, false, {message: 'Usuario ya registrado'})
    }
    
    const { email } = req.body

    let newUser = {
        username,
        password: createHash(password),
        email
    }

    await users.save(newUser)
    return done(null, req.body)
}))

module.exports = passport