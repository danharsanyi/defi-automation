import { Router } from 'express';

import webhooks from './routes/webhooks';

export default () => {
  const app = Router();
  webhooks(app);

  return app;
}
