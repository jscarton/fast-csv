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
var path = __importStar(require("path"));
var domain = __importStar(require("domain"));
var csv = __importStar(require("../../src"));
describe('Issue #68 - https://github.com/C2FO/fast-csv/issues/68', function () {
    it('should handle bubble up parse errors properly', function () {
        return new Promise(function (res) {
            var d = domain.create();
            var called = false;
            d.on('error', function (err) {
                d.exit();
                if (called) {
                    return;
                }
                called = true;
                expect(err.message).toMatch(/^Parse Error/);
                res();
            });
            d.run(function () {
                return csv
                    .parseFile(path.resolve(__dirname, '__fixtures__', 'issue68-invalid.tsv'), {
                    headers: true,
                    delimiter: '\t',
                })
                    .on('data', function () { return null; });
            });
        });
    });
    it('should handle bubble up data errors properly', function () {
        return new Promise(function (res) {
            var d = domain.create();
            var called = false;
            d.on('error', function (err) {
                d.exit();
                if (called) {
                    throw err;
                }
                called = true;
                expect(err.message).toBe('Data error');
                res();
            });
            d.run(function () {
                var count = 0;
                csv.parseFile(path.resolve(__dirname, '__fixtures__', 'issue68.tsv'), {
                    headers: true,
                    delimiter: '\t',
                }).on('data', function () {
                    count += 1;
                    if (count % 1001 === 0) {
                        throw new Error('Data error');
                    }
                });
            });
        });
    });
});
//# sourceMappingURL=issue68.spec.js.map