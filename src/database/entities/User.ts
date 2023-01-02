import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
} from "typeorm";
import { ColumnNumericTransformer } from "../../utils/ColumnNumericTransformer";

@Entity()
@Check(
  `suscription_date > birth_date`
)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "integer", nullable: false })
  age: number;

  @Column({ type: "timestamp without time zone", nullable: false, name:'birth_date' })
  birthDate: Date;

  @Column({ type: "timestamp without time zone",nullable: false, name:'suscription_date' })
  suscriptionDate: Date;

  @Column({ type: "numeric", default: null,transformer: new ColumnNumericTransformer(), })
  cost: number;
}
