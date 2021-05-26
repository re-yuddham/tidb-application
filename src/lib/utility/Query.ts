class Query {
    query: string;
    params: string[];

    public static INSERT_QUERY_TEMPLATE: string = "INSERT INTO $1.$2 values(";
    public static SELECT_QUERY_TEMPLATE: string = "SELECT * FROM $1.$2 ";

    build() {
        const stringParams = this.query.split(new RegExp("$[0-9]"));

        if(stringParams.length !== this.params.length) {
            throw new UrlParsingError("params do not match");
        }

        return stringParams.reduce((preValue, currValue, index)=> preValue + currValue + this.params[index], "");
    }
}