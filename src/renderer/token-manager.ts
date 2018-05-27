// https://github.com/monzo/docs/blob/master/source/includes/_authentication.md
import * as request from "request-promise";
import { setInterval } from "timers";

export class TokenManager {
    private accessToken: string;
    private currentRefreshToken: string;

    constructor(private readonly config: Config) {
        this.currentRefreshToken = this.config.refreshToken;

        this.refreshAccess();
        setInterval(() => {
            this.refreshAccess();
        }, 21600000);
    }

    private async refreshAccess(): Promise<void> {
        const body: MonzoRefreshAccessResponse = await request.post(
            "https://api.monzo.com/oauth2/token",
            {
                form: {
                    grant_type: "refresh_token",
                    client_id: this.config.clientId,
                    client_secret: this.config.clientSecret,
                    refresh_token: this.currentRefreshToken,
                },
            },
        );

        this.currentRefreshToken = body.refresh_token;
        this.accessToken = body.access_token;
    }

    public get AccessToken(): string {
        return this.accessToken;
    }
}
