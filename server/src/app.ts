import express from 'express';
import cors from 'cors';

import config from './config/index.js';
import routes from './api/index.js';

async function start() {
  const app = express();

  app.use( cors() );
  app.use(express.urlencoded({extended: true})); 
  app.use(express.json());

  app.use(routes());

  app.get( '/', ( _, res ) => {
    res.status( 200 ).send( 'Server is running' );
  });

  app.listen( config.port, () => {
    console.log( `Server listening on port ${config.port}` );
  });
}

start();
