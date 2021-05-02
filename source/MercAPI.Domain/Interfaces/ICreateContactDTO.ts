import Contact from '../Models/Contact';

export default interface ICreateContactDTO {
	contacts: Contact[];
	businessCodeToken: string;
}
