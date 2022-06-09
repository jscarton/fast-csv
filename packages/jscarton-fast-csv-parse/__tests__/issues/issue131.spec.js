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
describe('Issue #131 - https://github.com/C2FO/fast-csv/issues/131', function () {
    var csvWithBom = [
        '\ufefffirst_name,last_name,email_address,address',
        'First1,Last1,email1@email.com,"1 Street St, State ST, 88888"',
    ].join(os_1.EOL);
    it('should parse a csv with a UTF-8 Byte Order Mark', function () {
        return new Promise(function (res, rej) {
            var actual = [];
            csv.parseString(csvWithBom, { headers: true })
                .on('error', rej)
                .on('data', function (data) { return actual.push(data); })
                .on('end', function (count) {
                expect(actual[0].first_name).toBe('First1');
                expect(count).toBe(actual.length);
                res();
            });
        });
    });
});
//# sourceMappingURL=issue131.spec.js.map