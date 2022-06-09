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
var domain = __importStar(require("domain"));
var os_1 = require("os");
var csv = __importStar(require("../../src"));
describe('Issue #93 - https://github.com/C2FO/fast-csv/issues/93', function () {
    var csvContent = ['a,b', 'c,d', 'e,f'].join(os_1.EOL);
    it('should not catch errors thrown in end with headers enabled', function () {
        return new Promise(function (res, rej) {
            var d = domain.create();
            var called = false;
            d.on('error', function (err) {
                d.exit();
                if (called) {
                    throw err;
                }
                called = true;
                expect(err.message).toBe('End error');
                res();
            });
            d.run(function () {
                return csv
                    .parseString(csvContent, { headers: true, delimiter: '\t' })
                    .on('error', function () { return rej(new Error('Should not get here!')); })
                    .on('data', function () {
                    /* do nothing */
                })
                    .on('end', function () {
                    throw new Error('End error');
                });
            });
        });
    });
    it('should not catch errors thrown in end with headers disabled', function () {
        return new Promise(function (res, rej) {
            var d = domain.create();
            var called = false;
            d.on('error', function (err) {
                d.exit();
                if (called) {
                    throw err;
                }
                called = true;
                expect(err.message).toBe('End error');
                res();
            });
            d.run(function () {
                return csv
                    .parseString(csvContent, { headers: false })
                    .on('error', function () { return rej(new Error('Should not get here!')); })
                    .on('data', function () {
                    /* do nothing */
                })
                    .on('end', function () {
                    throw new Error('End error');
                });
            });
        });
    });
});
//# sourceMappingURL=issue93.spec.js.map