import express from 'express'
import passport from 'passport'
import connectMongoDB from './db/connectionDb.js';
import cookieParser from 'cookie-parser';
import initializePassportLocal from './config/passport/passport.local.js'
import initializeJwt from './config/passport/passport.jwt.js'
import indexRouter from './routes/index.js';
import viewsRouter from './routes/views.routes.js'
import { engine } from 'express-handlebars'
import { publicPath, viewsPath } from './config/paths.js';
import { SERVER_CONFIG, SESSION_CONFIG } from './config/config.js';
import { errorHandler } from './middlewares/error.js';

const app = express();

connectMongoDB();

//Handlebars
app.engine("handlebars", engine({
    partialsDir: viewsPath + '/partials'
}));
app.set("view engine", "handlebars");
app.set("views", viewsPath);

//Middlewares
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Cookie + Session
app.use(cookieParser(SESSION_CONFIG.SECRET));

//Passport
initializePassportLocal();
initializeJwt();
app.use(passport.initialize());

//Llamado de API's
app.use('/api', indexRouter)
app.use('/', viewsRouter);

app.use(errorHandler);

app.listen(SERVER_CONFIG.PORT, () => console.log(`Servidor escuchando en el puerto ${SERVER_CONFIG.PORT}`))