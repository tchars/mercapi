import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import { createConnections } from 'typeorm';

import { apiV1Router } from './routes/apiv1.routes';

createConnections().then(() => {
	const app = express();

	const port = process.env.PORT || process.env.PRODUCER_PORT;

	app.use(express.json());

	app.use(cors());

	app.use('/api/v1', apiV1Router);

	app.listen(port, () =>
		console.log(
			`Producer server is running on port: http://localhost:${port}`,
		),
	);
});
