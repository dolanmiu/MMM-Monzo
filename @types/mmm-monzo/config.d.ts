interface Config {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    accountId: string;
}

interface UncheckedConfig {
    clientId?: string;
    clientSecret?: string;
    refreshToken?: string;
    accountId?: string;
}
