import { router, json } from '@appdeploy/sdk';

import { profileRoutes } from './profiles';

export const handler = router({
  'GET /api/_healthcheck': [async () => json({ message: 'Success' })],
  ...profileRoutes,
});
