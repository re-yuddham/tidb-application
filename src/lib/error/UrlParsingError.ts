class UrlParsingError extends Error {

    public static PARSING_ERROR: string = "Url parsing error";

    public name: string;
    public code: number;


    constructor(message: string) {
        super(message);
        this.name = "PARSING_ERROR";
        this.code =  400;
        this.stack = (<any> new Error()).stack;
    }

    toString() {
        return `${this.name} - ${this.message} : error code : ${this.code} - \n ${this.stack}`;
    }
}