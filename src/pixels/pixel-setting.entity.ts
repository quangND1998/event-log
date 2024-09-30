import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, OneToOne, ManyToOne, OneToMany, JoinColumn, AfterUpdate, ManyToMany, JoinTable, BeforeUpdate } from 'typeorm';
@Entity('fb_pixel_settings')
export class PixelSettingEntity {
    @PrimaryGeneratedColumn('increment') id: number;

    @Column({ type: "varchar", length: 250, nullable: false, default: false, collation: "latin1_swedish_ci", })
    shop: string;

    @Column('int', { default: false })
    skip_onboarding_fb_ads: number;

    @Column('int', { default: false })
    accept_permission_fb_ads: number;

    @Column('int', { default: 1 })
    content_type_event: number;

    @Column({ type: 'varchar', collation: "latin1_swedish_ci", default: '{"step_1": 0, "step_2": 0, "step_3": 0, "is_completed": 0}' })
    step_onboarding: string


    @Column('int', { default: 1 })
    show_banner_extension: number;

    @Column('int', { default: null, unsigned: true })
    plan_id: number;


    @Column('int', { default: 0 })
    enable_analytics: number;

    @Column('int', { default: 0 })
    use_basecode_fb: number;


    @Column('int', { default: 0 })
    isTimeOnPage: number;

    @Column('int', { default: 0 })
    isDelayTrack: number;


    @Column('int', { default: 1 })
    intervalTrackTimeOnPage: number;

    @Column('int', { default: 10 })
    delayTimeTrack: number

    @Column('int', { default: 1 })
    is_show_modal_survey: number


    @Column('int', { default: 1 })
    is_show_modal_feedback: number

    @Column('datetime', { default: null })
    last_date_feedback: Date


    @Column('int', { default: 1 })
    is_show_banner: number


    @Column({ type: "text", default: null, collation: "utf8_unicode_ci" })
    feedback_text: string

    @Column({ type: "int", default: null })
    feedback_rating: number

    @Column({ type: 'int', default: null })
    count_open_app: number

    @Column({ type: 'int', default: 0 })
    is_show_modal_review: number


    @Column({ type: 'int', default: 1 })
    is_show_re_branding: number

    @Column({ type: 'int', default: 0 })
    status_show_re_branding: number


    @Column({ type: "varchar", nullable: true, default: 'Default customer timezone', collation: "latin1_swedish_ci", })
    date_timezone_offset: string

    @Column({ type: "varchar", length: 100, default: 0, collation: "latin1_swedish_ci", })
    price: string


    @Column({ type: "longtext", nullable: true, default: null, collation: "latin1_swedish_ci" })
    group_accept_information_customer: string

    @Column({ type: 'int', default: 1 })
    capi_track_viewcontent: number

    @Column({ type: 'int', default: 1 })
    capi_track_search: number

    @Column({ type: 'int', default: 1 })
    capi_track_pageview: number

    @Column({ type: 'int', default: 1 })
    capi_track_addtocart: number

    @Column({ type: 'int', default: 1 })
    capi_track_checkout: number

    @Column({ type: 'int', default: 1 })
    capi_track_purchase: number

    @Column({ type: 'int', default: 1 })
    maximum_id_conversion_api: number


    @Column({ type: "varchar", length: 150, nullable: true, default: 0, collation: "latin1_swedish_ci", })
    id_pixel_shopify: string

    @Column({ type: 'int', default: 1 })
    enable: number

    @Column({ type: 'int', default: 1 })
    plan: number

    @Column({ type: "varchar", length: 15, nullable: true, default: null, collation: "latin1_swedish_ci", })
    active_plan_at: string

    @Column({ type: 'int', default: 1 })
    statusFeedback: number

    @Column({ type: 'datetime' , nullable: false, default: null })
    lastUpdate: Date

    @Column({ type: 'varchar', collation: 'latin1_swedish_ci', nullable: true })
    timeOnline: string

    @Column({ type: 'varchar', length: 1, collation: 'latin1_swedish_ci', nullable: true })
    reasonDisable: string

    @Column({ type: 'text', collation: 'latin1_swedish_ci', nullable: true })
    reasonOtherDisable: string

    @Column({ type: "varchar", length: 150, nullable: true, collation: "latin1_swedish_ci", })
    DiscountCode: string

    @Column({ type: 'varchar', length: 150, nullable: true, default: 'basic', collation: 'latin1_swedish_ci' })
    PlanShopify: string

    @Column({ type: 'int', nullable: true, default: 0 })
    updated_theme: number

    @Column({ type: 'int', nullable: true, default: 0 })
    status_use_conversion: number

    @Column({ type: "varchar",length:25, nullable: true, collation: "utf8mb4_general_ci", })
    test_event_code: string

    @Column({ type: 'text', nullable: true })
    fb_access_token: string

    @Column({ type: 'int', nullable: true, default: 0 })
    include_shippping_cost: number

    @Column({ type: 'int', nullable: true, default: 0 })
    use_multi_currency: number

    @Column({ type: 'int', default: 0 })
    usePixelFromShopify: number

    @Column({ type: 'datetime', nullable: true })
    first_catalog_feed_created_at: Date


    @Column({ type: 'int', nullable: true, default: 0 })
    is_new_version: number


    @Column({ type: 'int',  default: 0 })
    utm_tracking: number

    @Column({ type: 'text', nullable: true, collation: 'latin1_swedish_ci' })
    apps_installed: string

    @Column({ type: 'tinyint', default: 0 })
    is_enable_trigger: number

    @Column({ type: 'tinyint', default: 0 })
    is_using_webhook_product_update: number

    @Column({ type: 'int', default: 0 })
    is_using_web_pixel: number


    @Column({ type: 'int', nullable: true })
    total_product: number

    @Column({ type: 'tinyint', default: 0 })
    is_use_feed: number

    @Column({ type: 'tinyint', default: 0 })
    is_use_utm: number

    @Column({ type: 'tinyint', default: 0 })
    is_use_catalog: number


    @Column({ type: 'int', default: 0 })
    is_save_consent: number

    @Column({ type: 'longtext',collation:"latin1_swedish_ci" , nullable: true })
    setup_ads_report: string

    @Column({ type: 'tinyint', nullable:true, default:0})
    is_using_plan_promote: string

    @Column({type:'datetime', nullable:true, default:null} )
    first_pixel_at: Date
}