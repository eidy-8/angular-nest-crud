import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'entity' })
export class EntityEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar" })
    id_entity: string;
    
    @Column({ type: "varchar" })
    name: string;
    
    @Column({ type: "text" })
    description: string;
    
    @Column({ type: "varchar" })
    invite: string;
    
    @Column({ type: "boolean" })
    active: boolean;

    @Column({ type: "varchar" })
    logo: string;

    @Column({ type: "text" })
    theme: string;
    
    @Column({ type: "timestamp" })
    created_at: Date;
   
    @Column({ type: "timestamp", nullable: true })
    updated_at: Date;
   
    @Column({ type: "timestamp", nullable: true })
    deleted_at: Date | null;
}