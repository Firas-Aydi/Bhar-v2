const express = require('express')
const path = require('path')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const i18next = require('./routers/i18.route') // Chemin vers votre fichier de configuration i18n

const RouterHome = require('./routers/home.route')
// const RouterBook = require("./routers/book.route");
const RouterAuth = require('./routers/auth.route')
const routeMycours = require('./routers/cours.route')
// const routeContact = require('./routers/contact.route')
const routeGererEducation = require('./routers/GererEducation.route')
const routeGererMarine = require('./routers/GererMarine.route')
const routeGererOtherAct = require('./routers/GererOtherAct.route')
const routeGererUrban = require('./routers/urban.route')
const routeGererAgricultural = require('./routers/agricultural.route')
const routeClasse = require('./routers/classe.route')
const routeCours = require('./routers/cours.route')
const routePayment = require('./routers/payment.route')

const app = express()

app.use(bodyParser.urlencoded({ extended: true })) // Middleware for parsing URL-encoded form data
app.use(bodyParser.json()) // Middleware for parsing JSON data

app.use(express.static(path.join(__dirname, 'assets')))
app.set('view engine', 'ejs')
app.set('views', 'views')

var store = new MongoDBStore({
  // uri: 'mongodb://0.0.0.0:27017/Bhar',
  uri: process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/Bhar',
  collection: 'sessions'
})
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
app.use(flash())
app.use(
  session({
    secret: 'This is my secret key',
    // cookie: {
    //   maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    // },
    store: store,
    resave: true,
    saveUninitialized: true
  })
)

app.post('/change-language', (req, res) => {
  const selectedLanguage = req.body.language; // Récupérer la langue sélectionnée depuis les données POST
  req.session.language = selectedLanguage; // Stockez la langue sélectionnée dans la session

  // Redirigez l'utilisateur vers la page précédente pour voir les changements de langue
  res.redirect('back');
});

app.use((req, res, next) => {
  // Si la langue est sélectionnée dans la session, mettez à jour la langue
  if (req.session.language) {
    i18next.changeLanguage(req.session.language);
  }

  res.locals.t = i18next.t.bind(i18next);
  next();
});

app.use('/', RouterHome)
app.use('/', RouterAuth)
app.use('/cour', routeMycours)

app.use('/', routeGererEducation)
app.use('/', routeGererMarine)
app.use('/', routeGererOtherAct)
app.use('/', routeGererAgricultural)
app.use('/', routeGererUrban)
app.use('/', routeClasse)
app.use('/', routeCours)
app.use('/api', routePayment)

app.get('/about', (req, res, next) => {
  res.render('about', {
    verifUser: req.session.userId,
    verifType: req.session.type
  })
})

// Utiliser la variable d'environnement `PORT` fournie par Render
const port = process.env.PORT || 3000;

// Lier l'application à l'adresse '0.0.0.0' et au port fourni
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});