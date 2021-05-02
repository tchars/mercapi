import 'dotenv/config';
import express from 'express';
import { createConnections } from 'typeorm';

import RabbitMQBroker from '../../../MercAPI.Infra/Configurations/rabbitMQBroker';
import { HandleData } from '../Services/HandleData';

createConnections().then(async () => {
	const app = express();

	const port = process.env.PORT || process.env.CONSUMER_PORT;

	app.use(express.json());

	const brokerConsumer = new RabbitMQBroker(process.env.RABBITMQ_URL);
	await brokerConsumer.start();
	await brokerConsumer.consume(process.env.QUEUE_NAME, async message => {
		const parsedContactFromQueue = JSON.parse(message.content.toString());

		const { businessCodeToken, contact } = parsedContactFromQueue;
		const { name, cellphone } = contact;

		const saveToDabase = {
			'1': await HandleData.saveMySQL({ name, cellphone }),
			'2': await HandleData.savePostgres({ name, cellphone }),
		};

		await saveToDabase[businessCodeToken];

		console.log('New contact added!');
	});

	app.get('/', (_req, res) => {
		res.json({ message: `Hello from Consumer` });
	});

	app.listen(port, () =>
		console.log(
			`Consumer server is running on port: http://localhost:${port}`,
		),
	);
});
