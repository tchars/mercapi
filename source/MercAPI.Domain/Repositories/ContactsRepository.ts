import ICreateContactDTO from '../Interfaces/ICreateContactDTO';
import Contact from '../Models/Contact';

class ContactsRepository {
	private contacts: Contact[];

	constructor() {
		this.contacts = [];
	}
}

export { ContactsRepository };
