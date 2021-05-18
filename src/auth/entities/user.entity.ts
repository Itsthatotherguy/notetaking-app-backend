import { Note } from 'src/note/entities/note.entity';
import { Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['emailAddress'])
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  emailAddress: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany((type) => Note, (note) => note.user, { eager: true })
  notes: Note[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
