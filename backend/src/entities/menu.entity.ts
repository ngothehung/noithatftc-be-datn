import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from './article.entity';
import { Blog } from './blog.entity';

@Entity('menus', { schema: 'public' })
export class Menu {
	@PrimaryGeneratedColumn('increment',{name: "id"})
	id: number;

	@Column({ name: 'name', length: 255 })
	name: string | null;

	@Column({ name: 'slug', nullable: false })
	slug: string | null;

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

	@OneToMany(() => Blog, (blog) => blog.menu)
	@JoinColumn([{ name: "id", referencedColumnName: "menu_id" }])
    blogs: Blog[];
} 
