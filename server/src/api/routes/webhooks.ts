import { Router } from 'express';

import config from '../../config/index.js';
import drip from '../../modules/drip/index.js';
import { Eth } from '../../modules/eth/eth.js';

const router = Router();

export default (app: Router) => {
  app.use( '/v1/webhooks', router );

  router.get( '/', ( req, res ) => {
    res.status( 200 ).send( 'Webhook service is running on /v1/webhooks' );
  });

  // Process drip claim/hydrate
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
};
