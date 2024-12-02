export const log = function (msg: string) {
    if (process.env.LOGGING === 'true') {
        console.log('===LOGGING=== ', msg);
    }
}

export const prettyJson = function (data: string | object): string {
    return JSON.stringify(data, null, 2)
}

export const genUrlParams = function (skip: number, limit: number): string {
    let urlParams = '';
    if (isNumeric(skip) && isNumeric(limit)) {
        urlParams += `?skip=${skip}&limit=${limit}`;
    } else if (isNumeric(skip)) {
        urlParams += `?skip=${skip}`;
    } else if (isNumeric(limit)) {
        urlParams += `?limit=${limit}`;
    }
    return urlParams;
}

export const isNumeric = function (value: any): boolean {
    return !isNaN(value - parseFloat(value));
}