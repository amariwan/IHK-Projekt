const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
const responseTime = require('response-time');
const passport = require('passport');
const timeout = require('connect-timeout');
const uuidv4 = require('./modules/uuidv4');
const compression = require('compression');
const methodOverride = require('method-override');
const SESSION_SECRET = uuidv4();


module.exports = (app)=> {
  // adding Helmet to enhance your API's security
  app.use(helmet()); //is a function that adds various HTTP headers to the response of an Express application.
  // It helps protect against common web vulnerabilities by setting HTTP headers appropriately. The headers set by helmet() include:
  // • X-XSS-Protection - sets the X-XSS-Protection header to prevent cross-site scripting attacks
  // • X-Frame-Options - sets the X-Frame-Options header to prevent clickjacking attacks
  // • Strict-Transport-Security - sets the Strict-Transport-Security header to enforce secure (HTTPS) connections
  // • Content Security Policy - sets the Content Security Policy header to prevent cross site scripting and other attacks
  //-------------------------------------------------------
  // This code uses the helmet.contentSecurityPolicy() middleware to set up a Content Security Policy (CSP) for an application.
  //  The CSP is configured to allow resources from the same origin('self') for all resource types, as well as 'unsafe-inline' styles and data: fonts.All other sources are blocked('none').
  app.use(
    helmet.contentSecurityPolicy({
      defaultSrc: [`'none'`],
      styleSrc: [`'self'`, `'unsafe-inline'`],
      scriptSrc: [`'self'`],
      imgSrc: [`'self'`],
      connectSrc: [`'self'`],
      frameSrc: [`'self'`],
      fontSrc: [`'self'`, 'data:'],
      objectSrc: [`'self'`],
      mediaSrc: [`'self'`],
    }),
  );
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.expectCt());
  app.use(helmet.frameguard());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());
  app.use(helmet.hsts());
  app.use(helmet.xssFilter());
  // This code uses the helmet.hidePoweredBy() middleware to remove the X-Powered-By header from the response.
  app.use(helmet.hidePoweredBy());
  // app.use(
  // 	helmet.hsts({
  // 		maxAge: 5184000,
  // 	}),
  // );
  //-------------------------------------------------------
  // This code parses the request body into a JSON object and assigns it to the request object
  // as req.body
  app.use(express.json());
  // using bodyParser to parse JSON bodies into JS objects
  app.use(bodyParser.json());
  /*
   Use cookieParser and session middlewares together.
   By default Express/Connect app creates a cookie by name 'connect.sid'.But to scale Socket.io app,
   make sure to use cookie name 'jsessionid' (instead of connect.sid) use Cloud Foundry's 'Sticky Session' feature.
   W/o this, Socket.io won't work if you have more than 1 instance.
   If you are NOT running on Cloud Foundry, having cookie name 'jsessionid' doesn't hurt - it's just a cookie name.
   */
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  // This code is used to set the 'trust proxy' value to true.
  app.set('trust proxy', true); // trust first proxy
  // This code disables the x-powered-by header, which would otherwise
  // provide information about the server software that is running the
  // application.
  app.disable('x-powered-by');

  // Sessions allow us to Contact data on visitors from request to request
  // This keeps admins logged in and allows us to send flash messages
  // store: new FileStore(),
  app.use(
    session({
      name: 'session_id',
      saveUninitialized: true,
      resave: false,
      rolling: false,
      secret: SESSION_SECRET,
      cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
        secure: true,
        HostOnly: true,
      },
    }),
  );

  app.use(methodOverride());
  app.use(compression());
  app.use(responseTime());
  app.use(timeout('5s'));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  // Add your routes here, etc.
  const haltOnTimedout = (req, res, next) => {
    if (!req.timedout) next();
  };
  app.use(haltOnTimedout);

  //setting CSP
  /* This is a middleware that is used to parse the body of the request. */
  // enabling CORS for all requests
  app.use(
    cors({
      // origin: [ `https://${hostname}:${port}` ], //frontend server localhost:8080
      origin: true, //frontend server localhost:8080
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true, // enable set cookie
      optionsSuccessStatus: 200,
      credentials: true,
    }),
  );
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );

  app.use(cookieParser(SESSION_SECRET)); // any string ex: 'keyboard cat'
  // flash is a function that stores a message in the session and makes it available on the next request
  // flash is used to show a message after a post request
  // flash is used to display success messages or error messages
  app.use(flash());
}
