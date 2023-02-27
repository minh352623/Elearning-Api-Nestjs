import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import moment from "moment-timezone";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @BeforeInsert()
  insertCreated() {
    this.created_at = new Date(
      moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss")
    );
    this.updated_at = new Date(
      moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss")
    );
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updated_at = new Date(
      moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss")
    );
  }
}
