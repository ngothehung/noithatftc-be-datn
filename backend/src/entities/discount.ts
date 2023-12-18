import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('discounts', { schema: 'public' })
export class Discount {
	@PrimaryGeneratedColumn('increment',{name: "id"})
	id: number;

	@Column({ name: 'name', length: 255 })
	name: string | null;

	@Column({ name: 'code', nullable: false })
	code: string | null;

	@Column('smallint', { name: 'status', nullable: false, default: 0 })
	status: number | 0;

	@Column('float', { name: 'price', nullable: false, default: 0 })
	price: number | 0;

	@Column('timestamp', {
		name: 'created_at',
		default: () => 'now()',
	})
	created_at: Date;

	@Column('timestamp', {
		name: 'updated_at',
		nullable: true,
		default: () => 'now()',
	})
	updated_at: Date;
}
