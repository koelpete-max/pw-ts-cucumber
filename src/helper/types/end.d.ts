export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: "chromium" | "firefox" | "webkit",
            BASEURL: string,
            HEADLESS: string,
            ENV: "staging" | "prod" | "test"
        }
    }
}