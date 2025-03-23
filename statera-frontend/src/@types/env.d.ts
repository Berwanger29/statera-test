declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_STRIPE_PK: string
        }
    }
}