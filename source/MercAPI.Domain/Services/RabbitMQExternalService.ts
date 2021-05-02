import RabbitMQBroker from '../../MercAPI.Infra/Configurations/rabbitMQBroker';
import ICreateContactDTO from '../Interfaces/ICreateContactDTO';
import { IRabbitMQBroker } from '../Interfaces/IRabbitMQBroker';
import { IRabbitMQExternalService } from '../Interfaces/IRabbitMQExternalService';

export class RabbitMQExternalService implements IRabbitMQExternalService {
	constructor(private rabbitExternalService: IRabbitMQBroker) {}

	async sendToQueue({
		contacts,
		businessCodeToken,
	}: ICreateContactDTO): Promise<boolean> {
		this.rabbitExternalService = new RabbitMQBroker(
			process.env.RABBITMQ_URL,
		);

		await this.rabbitExternalService.start();

		contacts?.map(async contact => {
			this.rabbitExternalService.publishInQueue(
				process.env.QUEUE_NAME,
				JSON.stringify({ businessCodeToken, contact }),
			);
		});

		return true;
	}
}
