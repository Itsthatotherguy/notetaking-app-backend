import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryColumn()
  id: string;

  @Column()
  body: string;

  @Column()
  createdAt: Date;
}
