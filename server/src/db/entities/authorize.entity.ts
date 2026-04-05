import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: 'authorize' })
export class AuthorizeEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'uuid' })
    userId: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @Column({ type: 'varchar' })
    role: string;

    @Column({ type: 'simple-array', default: '' })
    permissions: string[];
}