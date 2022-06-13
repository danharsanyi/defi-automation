import { Router } from 'express';

import config from '../../config/index';
import drip from '../../modules/drip/index';
import { Eth } from '../../modules/eth/eth';
import { Slack } from '../../modules/slack/slack';

const router = Router();

const slack = Slack({url: config.dripSlackNotifyUrl});

export default (app: Router) => {
  app.use( '/v1/webhooks', router );

  router.get( '/', ( req, res ) => {
    res.status( 200 ).send( 'Webhook service is running on /v1/webhooks' );
  });

  // Process drip claim/hydrate
  router.post( '/drip', async ( req, res ) => {
    const {wallet, key, action} = req.body;

    try {
      if (!['hydrate', 'claim'].includes(action)) {
        return res.send("Supported actions are 'hydrate' and 'claim'");
      }
      
      const eth = Eth({wallet, key, chain: config.bscChain});
      const result = await drip.run(eth, {action});

      const message = slack.formatMessage({
        method: action,
        success: result.status,
        gasUsed: result.gasUsed,
        transactionHash: result.transactionHash,
        wallet,
      });

      await slack.post(message);
      
      return res.send( result );
    } catch( error ) {
      console.error('error', error);

      const message = slack.formatMessage({
        method: `${action}: ${error}`,
        success: false,
        gasUsed: 0,
        wallet,
      });

      await slack.post(message);

      return res.send({ error });
    }
  });
};
