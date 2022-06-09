"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("os");
var csv = __importStar(require("../../src"));
describe('Issue #214 - https://github.com/C2FO/fast-csv/issues/214', function () {
    var CSV_CONTENT = [
        'firstName,lastName,emailAddress',
        'First1,Last1,email1@email.com',
        'First2,Last2,email2@email.com',
        'First3,Last3,email3@email.com',
        'First4,Last4,email4@email.com',
    ].join(os_1.EOL);
    var expectedRows = [
        { firstName: 'First1', lastName: 'Last1', emailAddress: 'email1@email.com' },
        { firstName: 'First2', lastName: 'Last2', emailAddress: 'email2@email.com' },
        { firstName: 'First3', lastName: 'Last3', emailAddress: 'email3@email.com' },
        { firstName: 'First4', lastName: 'Last4', emailAddress: 'email4@email.com' },
    ];
    it('should emit data when using the on method', function () {
        return new Promise(function (res, rej) {
            var rows = [];
            csv.parseString(CSV_CONTENT, { headers: true })
                .on('data', function (r) { return rows.push(r); })
                .on('error', rej)
                .on('end', function (count) {
                expect(rows).toEqual(expectedRows);
                expect(count).toBe(expectedRows.length);
                res();
            });
        });
    });
    it('should emit data when using the addListener method', function () {
        return new Promise(function (res, rej) {
            var rows = [];
            csv.parseString(CSV_CONTENT, { headers: true })
                .addListener('data', function (r) { return rows.push(r); })
                .on('error', rej)
                .on('end', function (count) {
                expect(rows).toEqual(expectedRows);
                expect(count).toBe(expectedRows.length);
                res();
            });
        });
    });
});
//# sourceMappingURL=issue214.spec.js.map