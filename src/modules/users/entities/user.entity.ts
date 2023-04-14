import { Exclude } from 'class-transformer';
import { userEnumStatus } from 'src/common/status.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', unique: true, length: 100 })
  email: string;

  @Column({ type: 'nvarchar', length: 100 })
  @Exclude()
  password: string;

  @Column({
    type: "enum",
    enum: userEnumStatus,
    default: userEnumStatus.UNACTIVE
})
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
