import { Router } from 'express';

import { contactsRoutes } from './v1/contacts.routes';
import { sessionRoutes } from './v1/sessions.routes';

const apiV1Router = Router();

apiV1Router.use('/contacts', contactsRoutes);
apiV1Router.use('/session', sessionRoutes);

export { apiV1Router };
