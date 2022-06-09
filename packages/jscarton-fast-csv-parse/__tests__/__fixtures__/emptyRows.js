"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyRows = void 0;
var path_1 = require("path");
var os_1 = require("os");
exports.emptyRows = {
    path: path_1.resolve(__dirname, 'tmp', 'empty_rows.csv'),
    content: ['first_name,last_name,email_address', '"","",""', '"","",""', '"","",', '"",,""', ',,', ''].join(os_1.EOL),
    parsed: [
        {
            first_name: '',
            last_name: '',
            email_address: '',
        },
        {
            first_name: '',
            last_name: '',
            email_address: '',
        },
        {
            first_name: '',
            last_name: '',
            email_address: '',
        },
        {
            first_name: '',
            last_name: '',
            email_address: '',
        },
        {
            first_name: '',
            last_name: '',
            email_address: '',
        },
    ],
};
//# sourceMappingURL=emptyRows.js.map