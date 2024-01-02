import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Menu } from './menu.entity';

@Entity('blogs', { schema: 'public' })
export class Blog {
	@PrimaryGeneratedColumn('increment',{name: "id"})
	id: number;

	@Column()
	title: string;

	@Column({ name: 'slug', nullable: false })
	slug: string | null;

	@Column({ name: 'tags', nullable: true })
	tags: string | null;

	@Column({ name: 'description', nullable: true })
	description: string | null;

	@Column({ name: 'content', nullable: true })
	content: string | null;

	@Column({ name: 'avatar', nullable: true })
	avatar: string | null;

	@Column()
	status: number;

	@Column()
	menu_id: number;

	@Column({ name: 'author_email', nullable: true })
	author_email: string | null;

	@Column({ name: 'author_name', nullable: true })
	author_name: string | null;

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


	@ManyToOne(() => Menu, (menus) => menus.blogs)
	@JoinColumn({ name: 'menu_id', referencedColumnName: 'id' })
	menu: Menu;
} 
