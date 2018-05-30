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
        const element = document.getElementById("monzoBalance");
        element.innerText = value;
    },

    setSpentToday(value: string): void {
        const element = document.getElementById("monzoSpentToday");
        element.innerText = value;
    },

    setTransactions(transactions: MonzoTransaction[]): void {
        const element = document.getElementById("monzoTransactions");

        element.innerHTML = "";
        console.log(transactions);
        const opacityDelta = 1 / transactions.length;
        let currentOpacity = 1;

        for (const transaction of transactions) {
            const transactionElement = createTransaction(
                transaction.merchant ? transaction.merchant.logo : "",
                transaction.merchant ? transaction.merchant.name : transaction.description,
                `£${Math.abs(transaction.amount) / 100}`,
            );
            transactionElement.setAttribute("style", `opacity: ${currentOpacity}`);
            currentOpacity -= opacityDelta;
            element.appendChild(transactionElement);
        }
    },

    // tslint:disable-next-line:no-any
    socketNotificationReceived(notification: NotificationType, payload: any): void {
        Log.log(this.name + " received a notification: " + notification + " - Payload: " + payload);
        switch (notification) {
            case "monzo-data":
                const currentMonzoData = payload as MonzoData;
                monzoData = payload;
                this.setBalance(`£${currentMonzoData.balance.balance / 100}`);
                this.setSpentToday(`£${Math.abs(currentMonzoData.balance.spend_today) / 100}`);
                this.setTransactions(currentMonzoData.transactions);
                break;
        }
    },
});

function createBalance(value: string): HTMLElement {
    const balanceAmount = document.createElement("h2");
    balanceAmount.setAttribute("id", "monzoBalance");
    balanceAmount.classList.add("monzo-amounts");
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
    spentAmount.classList.add("monzo-amounts");
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
    transactions.setAttribute("id", "monzoTransactions");
    transactions.classList.add("monzo-transactions");

    return transactions;
}

function createTransaction(logoString: string, text: string, amountString: string): HTMLElement {
    const image = document.createElement("img");
    image.setAttribute("src", logoString);

    const logo = document.createElement("div");
    logo.classList.add("monzo-transaction-logo");
    logo.appendChild(image);

    const descriptionText = document.createElement("p");
    descriptionText.innerText = text;

    const description = document.createElement("div");
    description.classList.add("monzo-transaction-description");
    description.appendChild(descriptionText);

    const amountText = document.createElement("p");
    amountText.innerText = amountString;

    const amount = document.createElement("div");
    amount.classList.add("monzo-transaction-amount");
    amount.appendChild(amountText);

    const transaction = document.createElement("div");
    transaction.classList.add("monzo-transaction");
    transaction.appendChild(logo);
    transaction.appendChild(description);
    transaction.appendChild(amount);

    return transaction;
}
