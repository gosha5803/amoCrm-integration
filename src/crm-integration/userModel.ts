import { Model, Table, Column, DataType } from "sequelize-typescript";


interface UserProps {
    name: string
}

@Table({tableName: 'User'})
export class UserModel extends Model<UserModel, UserProps> {
    
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number

    @Column({})
    name: string
}