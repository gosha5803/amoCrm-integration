import { Model, Table, Column, DataType } from "sequelize-typescript";

interface SecretKeysProps {
    refreshToken: string
    accessToken: string
    authCode: string
}

@Table({tableName:'secret-codes'})
export class SecretKeys extends Model <SecretKeys, SecretKeysProps> {
    @Column({type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true})
    id: number

    @Column({type: DataType.TEXT})
    accessToken: string

    @Column({type: DataType.TEXT})
    @Column
    refreshToken: string

    @Column({type: DataType.TEXT})
    @Column
    authCode: string
}