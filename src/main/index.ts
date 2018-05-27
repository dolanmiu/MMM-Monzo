import * as NodeHelper from "node_helper";

import { TokenManager } from "./token-manager";

let tokenManager: TokenManager;

module.exports = NodeHelper.create({
    start(): void {},

    // tslint:disable-next-line:no-any
    socketNotificationReceived(notification: NotificationType, payload: any): void {
        switch (notification) {
            case "config":
                tokenManager = new TokenManager(payload as Config);
                break;
        }
    },
});
