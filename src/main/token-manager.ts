// https://github.com/monzo/docs/blob/master/source/includes/_authentication.md
import * as fs from "fs";
import * as request from "request-promise";

export class TokenManager {
    private accessToken: string;
    private currentRefreshToken: string;

    constructor(private readonly config: Config) {
        this.currentRefreshToken = this.config.refreshToken;
        this.writeNewRefreshToken("test");

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
        console.log(body);
        console.log(this.accessToken);
    }

    private writeNewRefreshToken(newRefreshToken: string): void {
        if (this.currentRefreshToken) {
            throw Error("No Refresh Token");
        }

        const configPath = "./config/config.js";
        const configFile = fs.readFileSync(configPath, "utf-8");
        const newConfigFile = configFile.replace(this.currentRefreshToken, newRefreshToken);

        fs.writeFileSync(configPath, newConfigFile, "utf-8");
    }

    public get AccessToken(): string {
        return this.accessToken;
    }
}
