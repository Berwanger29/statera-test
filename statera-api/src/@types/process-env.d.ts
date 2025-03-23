declare global {
    namespace NodeJS {
        interface ProcessEnv {
            POSTGRES_PASSWORD: string;
            POSTGRES_USER:string;
            POSTGRES_PORT: number;
            PORT: number;
            STRIPE_SK: string
        }
    }
}