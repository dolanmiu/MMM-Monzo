export class ConfigService {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    public get Config(): Config {
        return this.config;
    }
}
