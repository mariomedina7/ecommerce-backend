import express from 'express'
import passport from 'passport'
import connectMongoDB from './db/connectionDb.js';
import { engine } from 'express-handlebars'
import cookieParser from 'cookie-parser';
import { publicPath, viewsPath } from './config/paths.js';
import { SERVER_CONFIG, SESSION_CONFIG } from './config/config.js';
import initializePassportLocal from './config/passport/passport.local.js'
import initializeJwt from './config/passport/passport.jwt.js'
import userRouter from './routes/user.routes.js'
import sessionsRouter from './routes/sessions.routes.js'
import viewsRouter from './routes/views.routes.js'

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
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);

app.listen(SERVER_CONFIG.PORT, () => console.log(`Servidor escuchando en el puerto ${SERVER_CONFIG.PORT}`))