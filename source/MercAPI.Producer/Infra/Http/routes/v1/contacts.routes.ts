import { Router } from 'express';

import { RabbitMQExternalService } from '../../../../../MercAPI.Domain/Services/RabbitMQExternalService';
import RabbitMQBroker from '../../../../../MercAPI.Infra/Configurations/rabbitMQBroker';
import { verifyToken } from '../../../../../MercAPI.Infra/Middlewares/VerifyJWT';

const contactsRoutes = Router();
const rabbitMQBroker = new RabbitMQBroker(process.env.RABBITMQ_URL);

contactsRoutes.post('/', verifyToken, async (request, response) => {
	const { contacts } = request.body;
	const { businessCodeToken } = request;

	const rabbitExternalService = new RabbitMQExternalService(rabbitMQBroker);
	const queued = await rabbitExternalService.sendToQueue({
		contacts,
		businessCodeToken,
	});

	if (queued) {
		return response.status(200).send();
	}

	return response.status(500).send({ message: 'Oops...' });
});

export { contactsRoutes };
