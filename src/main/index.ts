import * as NodeHelper from "node_helper";

module.exports = NodeHelper.create({
    start(): void {},

    socketNotificationReceived<T>(notification: any, payload: T): void {},
});
