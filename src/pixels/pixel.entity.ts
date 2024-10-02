import { Entity, PrimaryGeneratedColumn,  Column,CreateDateColumn, UpdateDateColumn , Index } from 'typeorm';
@Entity('fb_pixel')
export class PixelEntity {
    @PrimaryGeneratedColumn('increment') id: number;
    
    @Index()
    @Column({ type: 'bigint',nullable: false})
    pixel_id: string;

    @Index()
    @Column({ type: "varchar", length: 255, nullable: false, default: false, collation: "utf8mb4_general_ci", })
    shop: string;

    @Column({ type: "varchar", length: 255, nullable: true, default: null, collation: "utf8mb4_general_ci", })
    title: string;

    @Column({ type: "integer", nullable: false, default: 1 })
    status: number;

    @Column({ type: "integer",  nullable: false, default: 0 })
    isMaster: Boolean;

    @Column({ type: "integer",  nullable: false, default: 0 })
    is_conversion_api: number;

    @Column({ type: "text",  nullable: false, default: null, collation: "utf8mb4_general_ci" })
    fb_access_token: string

    @Column({ type: "varchar", length: 20,  nullable: false , default: null})
    test_event_code: string
    
    @Column({ type: 'timestamp', nullable: true , default: null})
    first_capi_enabled_at: Date

    @Column({ type: 'bigint', nullable: true , default: null})
    market_id: number

    @Column({ type: 'timestamp', nullable: true , default: null})
    first_pixel_at:Date

    @CreateDateColumn({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    @UpdateDateColumn({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
    
}

