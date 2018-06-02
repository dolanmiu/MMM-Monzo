import { Currency } from "currency-formatter";
import drawGraph from "./graph-renderer";

let canvas: HTMLCanvasElement;

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

        canvas = document.createElement("canvas");
        canvas.classList.add("monzo-canvas");
        wrapper.appendChild(canvas);

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

    setTransactions(transactions: MonzoTransaction[], currency: Currency): void {
        const element = document.getElementById("monzoTransactions");

        element.innerHTML = "";
        const opacityDelta = 1 / transactions.length;
        let currentOpacity = 1;

        for (const transaction of transactions) {
            const avatarUrl = `https://ui-avatars.com/api/?name=${
                transaction.description
            }&background=fff&color=000`;

            const transactionElement = createTransaction(
                transaction.merchant && transaction.merchant.logo
                    ? transaction.merchant.logo
                    : avatarUrl,
                transaction.merchant ? transaction.merchant.name : transaction.description,
                createFormattedPrice(currency, transaction.amount, true),
            );
            transactionElement.setAttribute("style", `opacity: ${currentOpacity}`);
            currentOpacity -= opacityDelta;
            element.appendChild(transactionElement);
        }
    },

    // tslint:disable-next-line:no-any
    socketNotificationReceived(notification: NotificationType, payload: any): void {
        Log.log(this.name + " received a notification: " + notification);
        switch (notification) {
            case "monzo-data":
                console.log(payload);
                const currentMonzoData = payload as MonzoData;

                this.setBalance(
                    createFormattedPrice(
                        currentMonzoData.currency,
                        currentMonzoData.balance.balance,
                    ),
                );
                this.setSpentToday(
                    createFormattedPrice(
                        currentMonzoData.currency,
                        currentMonzoData.balance.spend_today,
                        true,
                    ),
                );

                const latsetTransactions = currentMonzoData.transactions
                    .slice(Math.max(currentMonzoData.transactions.length - 10, 0))
                    .reverse();
                this.setTransactions(latsetTransactions, currentMonzoData.currency);
                drawGraph(canvas, currentMonzoData.transactions, currentMonzoData.balance.balance);
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
    const imageP = document.createElement("p");
    imageP.appendChild(image);
    image.setAttribute("src", logoString);

    const logo = document.createElement("div");
    logo.classList.add("monzo-transaction-logo");
    logo.appendChild(imageP);

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

function createFormattedPrice(
    currency: Currency,
    amount: number,
    absolute: boolean = false,
): string {
    let priceValue = amount / Math.pow(10, currency.decimalDigits);

    if (absolute) {
        priceValue = Math.abs(priceValue);
    }

    const output = `${currency.symbol}${priceValue.toFixed(2)}`;

    return output;
}
