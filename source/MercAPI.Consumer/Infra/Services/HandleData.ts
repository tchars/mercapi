import { getConnection } from 'typeorm';

import Contact from '../../../MercAPI.Domain/Models/Contact';
import { ContactDataUtil } from '../../../MercAPI.Domain/Utils/ContactDataUtil';

class HandleData {
	public static async saveMySQL({ name, cellphone }): Promise<Contact> {
		const mysqlConnector = getConnection('mysql');
		const mysqlRepository = mysqlConnector.getRepository(Contact);

		const newName = ContactDataUtil.formatAsMacapaClientName(name);
		const newNumber = ContactDataUtil.formatAsMacapaClientNumber(cellphone);

		const contact = new Contact();

		contact.nome = newName;
		contact.telefone = newNumber;

		return mysqlRepository.save(contact);
	}

	public static async savePostgres({ name, cellphone }): Promise<Contact> {
		const postgresConnector = getConnection('postgres');
		const postgreRepository = postgresConnector.getRepository(Contact);

		const newName = ContactDataUtil.formatAsVarejaoClientName(name);
		const newNumber = ContactDataUtil.formatasVarejaoClientNumber(
			cellphone,
		);

		const contact = new Contact();

		contact.nome = newName;
		contact.telefone = newNumber;

		return postgreRepository.save(contact);
	}
}

export { HandleData };
