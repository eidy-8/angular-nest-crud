import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: 'authenticate' })
export class AuthenticateEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'uuid' })
    userId: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @Column({ type: 'varchar', unique: true })
    token: string;

    @Column({ type: 'timestamp' })
    expiresAt: Date;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}