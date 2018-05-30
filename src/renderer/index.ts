let monzoData: MonzoData;

Module.register("MMM-Monzo", {
    defaults: {},

    start(): void {
        this.sendSocketNotification("config", this.config);
    },

    getDom(): HTMLElement {
        const wrapper = document.createElement("div");
        wrapper.classList.add("monzo-wrapper");
        wrapper.appendChild(createBalance(""));
        wrapper.appendChild(createSpent(""));
        wrapper.appendChild(createTransactions());

        return wrapper;
    },

    getStyles(): Array<string> {
        return [this.file("styles/global.css")];
    },

    setBalance(value: string): void {
        const balance = document.getElementById("monzoBalance");
        balance.innerText = value;
    },

    setSpentToday(value: string): void {
        const balance = document.getElementById("monzoSpentToday");
        balance.innerText = value;
    },

    // tslint:disable-next-line:no-any
    socketNotificationReceived(notification: NotificationType, payload: any): void {
        Log.log(this.name + " received a notification: " + notification + " - Payload: " + payload);
        switch (notification) {
            case "monzo-data":
                const currentMonzoData = payload as MonzoData;
                monzoData = payload;
                this.setBalance(`£${currentMonzoData.balance.balance / 100}`);
                this.setSpentToday(`£${currentMonzoData.balance.spend_today / 100}`);
                break;
        }
    },
});

function createBalance(value: string): HTMLElement {
    const balanceAmount = document.createElement("h2");
    balanceAmount.setAttribute("id", "monzoBalance");
    balanceAmount.classList.add("amounts");
    balanceAmount.innerHTML = value;

    const balanceText = document.createElement("span");
    balanceText.classList.add("monzo-small");
    balanceText.innerHTML = "Card Amount";

    const balance = document.createElement("div");
    balance.classList.add("monzo-balance");
    balance.appendChild(balanceAmount);
    balance.appendChild(balanceText);

    return balance;
}

function createSpent(value: string): HTMLElement {
    const spentAmount = document.createElement("h2");
    spentAmount.setAttribute("id", "monzoSpentToday");
    spentAmount.classList.add("amounts");
    spentAmount.innerHTML = value;

    const spentText = document.createElement("span");
    spentText.classList.add("monzo-small");
    spentText.innerHTML = "Spent Today";

    const spentToday = document.createElement("div");
    spentToday.classList.add("monzo-spent-today");
    spentToday.appendChild(spentAmount);
    spentToday.appendChild(spentText);

    return spentToday;
}

function createTransactions(): HTMLElement {
    const transactions = document.createElement("div");
    transactions.classList.add("monzo-transactions");

    return transactions;
}
