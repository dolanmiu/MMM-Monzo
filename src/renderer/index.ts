Module.register("MMM-Monzo", {
    defaults: {},

    start(): void {
        this.sendSocketNotification("config", this.config);
    },

    getDom(): HTMLElement {
        const wrapper = document.createElement("div");

        return wrapper;
    },

    getStyles(): Array<string> {
        return [this.file("styles/global.css")];
    },

    // tslint:disable-next-line:no-any
    socketNotificationReceived(notification: NotificationType, payload: any): void {
        Log.log(this.name + " received a notification: " + notification + " - Payload: " + payload);
        switch (notification) {
            case "monzo-data":
                console.log(payload);
                break;
        }
    },
});
