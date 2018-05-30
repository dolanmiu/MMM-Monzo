import * as NodeHelper from "node_helper";

import { MonzoFetcher } from "./monzo-fetcher";
import { TokenManager } from "./token-manager";

let tokenManager: TokenManager;
let fetcher: MonzoFetcher;

module.exports = NodeHelper.create({
    start(): void {
        // TODO
    },

    async fetch(): Promise<void> {
        const token = await tokenManager.AccessToken$;
        const data = await fetcher.fetch(token);
        console.log(data);
        this.sendSocketNotification("monzo-data", data);
    },

    // tslint:disable-next-line:no-any
    async socketNotificationReceived(notification: NotificationType, payload: any): Promise<void> {
        switch (notification) {
            case "config":
                const config = payload as Config;
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
