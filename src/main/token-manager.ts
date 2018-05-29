// https://github.com/monzo/docs/blob/master/source/includes/_authentication.md
import * as fs from "fs";
import * as request from "request-promise";

export class TokenManager {
    private currentRefreshToken: string;
    private accessToken$: Promise<string>;

    constructor(private readonly config: Config) {
        this.currentRefreshToken = this.config.refreshToken;

        this.accessToken$ = this.refreshAccess();
        this.accessToken$.catch(console.error);
        setInterval(() => {
            this.accessToken$ = this.refreshAccess();
            this.accessToken$.catch(console.error);
        }, 21600000);
    }

    private async refreshAccess(): Promise<string> {
        const body: MonzoRefreshAccessResponse = await request.post(
            "https://api.monzo.com/oauth2/token",
            {
                form: {
                    grant_type: "refresh_token",
                    client_id: this.config.clientId,
                    client_secret: this.config.clientSecret,
                    refresh_token: this.currentRefreshToken,
                },
                json: true,
            },
        );

        console.log(body.refresh_token);

        this.writeNewRefreshToken(this.currentRefreshToken, body.refresh_token);
        this.currentRefreshToken = body.refresh_token;
        return body.access_token;
    }

    private writeNewRefreshToken(oldRefreshToken: string, newRefreshToken: string): void {
        if (!oldRefreshToken) {
            throw Error("No Refresh Token");
        }

        const configPath = "./config/config.js";
        const configFile = fs.readFileSync(configPath, "utf-8");
        const newConfigFile = configFile.replace(oldRefreshToken, newRefreshToken);

        fs.writeFileSync(configPath, newConfigFile, "utf-8");

        console.log("Written new refresh token");
    }

    public get AccessToken$(): Promise<string> {
        return this.accessToken$;
    }
}
