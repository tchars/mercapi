import { Channel, Connection, connect, Message } from 'amqplib';

import { IRabbitMQBroker } from '../../MercAPI.Domain/Interfaces/IRabbitMQBroker';

export default class RabbitMQBroker implements IRabbitMQBroker {
	private connection: Connection;
	private channel: Channel;

	constructor(private uri: string) {}

	async start(): Promise<void> {
		this.connection = await connect(this.uri);
		this.channel = await this.connection.createChannel();
	}

	async publishInQueue(queue: string, message: string): Promise<boolean> {
		return this.channel.sendToQueue(queue, Buffer.from(message));
	}

	async consume(
		queue: string,
		callback: (message: Message) => void,
	): Promise<unknown> {
		return this.channel.consume(queue, message => {
			callback(message);
			this.channel.ack(message);
		});
	}
}
