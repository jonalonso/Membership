import { initialMigration1649182879358 } from "./database/migration/1649182879358-initialMigration";
import "reflect-metadata";
import { DataSource } from "typeorm";
import Entity from "./database/entities/_entities";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: Entity.entities,
  migrations: [initialMigration1649182879358],
  subscribers: ["./database/subscribers/**"],
  migrationsTableName: "custom_migration_table",
});
