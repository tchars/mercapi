import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contacts')
export default class Contact {
	@PrimaryGeneratedColumn()
	id: bigint;

	@Column('text', { nullable: false })
	nome: string;

	@Column('text', { nullable: false })
	telefone: string;
}
