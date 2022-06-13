import { Router } from 'express';

import config from '../../config/index';
import drip from '../../modules/drip/index';
import animalFarm from '../../modules/animal-farm/index';
import { Eth } from '../../modules/eth/eth';

const router = Router();

export default (app: Router) => {
  app.use( '/v1/webhooks', router );

  router.get( '/', ( req, res ) => {
    res.status( 200 ).send( 'Webhook service is running on /v1/webhooks' );
  });

  // Process Drip network claim/hydrate
  router.post( '/drip', async ( req, res ) => {
    try {
      const {wallet, key, action} = req.body;

      if (!['hydrate', 'claim'].includes(action)) {
        return res.send("Supported actions are 'hydrate' and 'claim'");
      }
      
      const eth = Eth({wallet, key, chain: config.bscChain});
      const result = await drip.run(eth, {action});
      return res.send( result );
    } catch( error ) {
      console.error('error', error);
      return res.send({ error });
    }
  });

  // Process Animal Farm Piggy Bank compounding
  router.post( '/animal-farm/piggy-bank', async ( req, res ) => {
    try {
      const {wallet, key, action} = req.body;

      if (!['compound'].includes(action)) {
        return res.send("Supported action is 'compound'");
      }
      
      const eth = Eth({wallet, key, chain: config.bscChain});
      const result = await animalFarm.run(eth, {action});
      return res.send( result );
    } catch( error ) {
      console.error('error', error);
      return res.send({ error });
    }
  });
};
