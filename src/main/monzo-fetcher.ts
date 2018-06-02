import { currencies } from "currency-formatter";
import * as request from "request-promise";

export class MonzoFetcher {
    constructor(private accountId: string) {}

    public async fetch(accessToken: string): Promise<MonzoData> {
        const transactions$ = this.fetchTransactions(this.accountId, accessToken);
        const balance$ = this.fetchBalance(this.accountId, accessToken);

        const [transactions, balance] = await Promise.all([transactions$, balance$]);
        const currency = currencies.find(c => c.code === balance.currency);

        return {
            transactions: transactions,
            balance: balance,
            currency: currency,
        };
    }

    private async fetchTransactions(
        accountId: string,
        accessToken: string,
    ): Promise<MonzoTransaction[]> {
        const body: MonzoTransactionResponse = await request.get(
            `https://api.monzo.com/transactions?expand[]=merchant&account_id=${accountId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                json: true,
            },
        );

        const lastTransactions = body.transactions.slice(
            Math.max(body.transactions.length - 80, 0),
        );

        return lastTransactions;
    }

    private async fetchBalance(
        accountId: string,
        accessToken: string,
    ): Promise<MonzoBalanceResponse> {
        const body: MonzoBalanceResponse = await request.get(
            `https://api.monzo.com/balance?account_id=${accountId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                json: true,
            },
        );

        return body;
    }
}
