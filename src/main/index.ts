import * as NodeHelper from "node_helper";

import { MonzoFetcher } from "./monzo-fetcher";
import { TokenManager } from "./token-manager";

let tokenManager: TokenManager;
let fetcher: MonzoFetcher;

function checkConfig(config: UncheckedConfig): Config {
    if (config.accountId === undefined) {
        throw Error("Missing accountId");
    }

    if (config.clientId === undefined) {
        throw Error("Missing clientId");
    }

    if (config.clientSecret === undefined) {
        throw Error("Missing clientSecret");
    }

    if (config.refreshToken === undefined) {
        throw Error("Missing refreshToken");
    }

    return config as Config;
}

module.exports = NodeHelper.create({
    start(): void {
        // TODO
    },

    async fetch(): Promise<void> {
        const token = await tokenManager.AccessToken$;
        const data = await fetcher.fetch(token);
        this.sendSocketNotification("monzo-data", data);
    },

    // tslint:disable-next-line:no-any
    async socketNotificationReceived(notification: NotificationType, payload: any): Promise<void> {
        switch (notification) {
            case "config":
                const config = checkConfig(payload as UncheckedConfig);
                tokenManager = new TokenManager(config);
                fetcher = new MonzoFetcher(config.accountId);
                await this.fetch();
                setInterval(() => {
                    this.fetch();
                }, 60000);
                break;
        }
    },
});
