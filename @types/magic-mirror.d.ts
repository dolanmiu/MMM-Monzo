declare interface MagicMirrorModule {
    defaults: { [key: string]: any };
    start: Function;
    getDom: Function;
    getScripts: Function;
    getStyles: Function;
    socketNotificationReceived: Function;
}

declare const Module: {
    register(moduleName: string, moduleProperties: object): void;
};

declare const Log: {
    log(text: string): void;
};
