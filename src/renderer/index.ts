import { TokenManager } from "./token-manager";

let tokenManager: TokenManager;

Module.register("MMM-Monzo", {
    defaults: {},

    start(): void {
        tokenManager = new TokenManager(this.config);
        this.sendSocketNotification("config", this.config);
    },

    getDom(): HTMLElement {
        const wrapper = document.createElement("div");

        return wrapper;
    },

    getStyles(): Array<string> {
        return [this.file("styles/global.css")];
    },

    socketNotificationReceived<T>(notification: NotificationType, payload: T): void {
        Log.log(this.name + " received a notification: " + notification + " - Payload: " + payload);
    },
});
