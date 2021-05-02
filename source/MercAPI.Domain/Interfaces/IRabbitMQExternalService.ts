import ICreateContactDTO from './ICreateContactDTO';

interface IRabbitMQExternalService {
	sendToQueue({
		contacts,
		businessCodeToken,
	}: ICreateContactDTO): Promise<boolean>;
}

export { IRabbitMQExternalService };
