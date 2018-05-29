interface MonzoBalanceResponse {
    balance: number;
    total_balance: number;
    currency: string;
    spend_today: number;
    local_currency: string;
    local_exchange_rate: number;
    local_spend: [
        {
            spend_today: number;
            currency: string;
        }
    ];
}
