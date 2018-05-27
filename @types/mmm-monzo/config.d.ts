interface Config {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
}

interface UncheckedConfig {
    clientId?: string;
    clientSecret?: string;
    refreshToken?: string;
}
