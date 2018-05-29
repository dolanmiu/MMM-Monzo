interface MonzoTransactionResponse {
    transactions: [
        {
            id: string;
            created: string;
            description: string;
            amount: number;
            fees: {};
            currency: string;
            merchant: {
                id: string;
                group_id: string;
                created: string;
                name: string;
                logo: string;
                emoji: string;
                category: string;
                online: true;
                atm: boolean;
                address: {
                    short_formatted: string;
                    formatted: string;
                    address: string;
                    city: string;
                    region: string;
                    country: string;
                    postcode: string;
                    latitude: number;
                    longitude: number;
                    zoom_level: number;
                    approximate: true;
                };
                updated: string;
                metadata: {
                    created_for_merchant: string;
                    created_for_transaction: string;
                    foursquare_id: string;
                    foursquare_website: string;
                    google_places_icon: string;
                    google_places_id: string;
                    google_places_name: string;
                    suggested_tags: string;
                    twitter_id: string;
                    website: string;
                };
                disable_feedback: boolean;
            };
            notes: string;
            metadata: {
                hide_amount: string;
                mastercard_auth_message_id: string;
                mastercard_lifecycle_id: string;
                notes: string;
            };
            labels: string[];
            account_balance: number;
            attachments: any[];
            category: string;
            is_load: boolean;
            settled: string;
            local_amount: number;
            local_currency: string;
            updated: string;
            account_id: string;
            user_id: string;
            counterparty: {};
            scheme: string;
            dedupe_id: string;
            originator: boolean;
            include_in_spending: boolean;
            can_be_excluded_from_breakdown: true;
        },
        {
            id: string;
            created: string;
            description: string;
            amount: number;
            fees: {};
            currency: string;
            merchant: {
                id: string;
                group_id: string;
                created: string;
                name: string;
                logo: string;
                emoji: string;
                category: string;
                online: true;
                atm: boolean;
                address: {
                    short_formatted: string;
                    formatted: string;
                    address: string;
                    city: string;
                    region: string;
                    country: string;
                    postcode: string;
                    latitude: number;
                    longitude: number;
                    zoom_level: number;
                    approximate: boolean;
                };
                updated: string;
                metadata: {
                    created_for_merchant: string;
                    created_for_transaction: string;
                    foursquare_category: string;
                    foursquare_category_icon: string;
                    foursquare_id: string;
                    foursquare_website: string;
                    google_places_icon: string;
                    google_places_id: string;
                    google_places_name: string;
                    provider: string;
                    provider_id: string;
                    suggested_name: string;
                    suggested_tags: string;
                    twitter_id: string;
                    website: string;
                };
                disable_feedback: boolean;
            };
            notes: string;
            metadata: {
                ledger_insertion_id: string;
                mastercard_auth_message_id: string;
                mastercard_lifecycle_id: string;
                notes: string;
            };
            labels: null;
            account_balance: number;
            attachments: any[];
            category: string;
            is_load: boolean;
            settled: string;
            local_amount: number;
            local_currency: string;
            updated: string;
            account_id: string;
            user_id: string;
            counterparty: {};
            scheme: string;
            dedupe_id: string;
            originator: boolean;
            include_in_spending: true;
            can_be_excluded_from_breakdown: true;
        }
    ];
}
