import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'varchar' }) 
    email: string;

    @Column({ type: 'varchar' }) 
    password: string;

    @Column({ type: 'varchar' }) 
    name: string;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at: Date | null;
}