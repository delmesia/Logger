class LogLevel {

    static Debug = 0;
    static Info = 1;
    static Warn = 2;
    static Error = 3;
    static Critical = 5;

    static assert(log_level) {
        if (![LogLevel.Debug, LogLevel.Info, LogLevel.Warn, LogLevel.Error, LogLevel.Critical].includes(log_level)) {
            throw new Error(`log_level must be an instance of LogLevel. Unsupported param
                 ${JSON.stringify(log_level)}`);
        };
    };

}

class Logger {
    #config;
    constructor(log_config) {
        //TODO: with_defaults function.
        // This will initialize log_config with the client/user value, or will short-circuit to the default value
        log_config = log_config || LogConfig.with_defaults();
        //Using the `LogConfig` assert method, we'll supply the clint/user given parameter and check if it's valid.
        LogConfig.assert(log_config);
        //if the assertion is valid/true, set the value of the private field config to log_config
        this.#config = log.config;
    }
}

class LogConfig {

    #level = LogLevel.Info;
    #rolling_config;
    #file_prefix = "Logtar_";

    static assert(log_config) {
        if (arguments.length > 0 && !(log_config instanceof LogConfig)) {
            throw new Error(
                `log_config must be an instance of LogConfig
                ${JSON.stringify(log_config)}`
            );
        }
    }

    get level() { return this.#level; };
    get rolling_config() { return this.#rolling_config; };
    get file_prefix() { return this.#file_prefix; };
}

const logger = new Logger(LogLevel.Warn);