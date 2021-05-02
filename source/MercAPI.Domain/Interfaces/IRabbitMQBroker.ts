import { Message } from 'amqplib';

interface IRabbitMQBroker {
	start(): Promise<void>;

	publishInQueue(queue: string, message: string): Promise<boolean>;

	consume(
		queue: string,
		callback: (message: Message) => void,
	): Promise<unknown>;
}

export { IRabbitMQBroker };
