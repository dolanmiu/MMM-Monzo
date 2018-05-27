import * as request from "request-promise";

export class MonzoFetcher {
    constructor(private config: Config) {}

    private async fetch(accountId: string): Promise<MonzoTransactionResponse> {
        const body: MonzoTransactionResponse = await request.get(
            `https://api.monzo.com/transactions?expand[]=merchant&account_id=${accountId}&limit=7`,
            {
                json: true,
            },
        );

        return body;
    }
}
