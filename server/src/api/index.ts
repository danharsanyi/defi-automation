import { Router } from 'express';

import webhooks from './routes/webhooks.js';

export default () => {
  const app = Router();
  webhooks(app);

  return app;
}
