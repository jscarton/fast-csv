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
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var csv = __importStar(require("../../src"));
describe('Issue #77 - https://github.com/C2FO/fast-csv/issues/77', function () {
    it('should sort columns by order of headers defined when formatting a csv', function () {
        return new Promise(function (res, rej) {
            var writable = fs.createWriteStream(path.resolve(__dirname, '__fixtures__/test.csv'), {
                encoding: 'utf8',
            });
            var csvStream = csv.format({ headers: ['second', 'first'] }).on('error', rej);
            writable.on('finish', function () {
                expect(fs.readFileSync(path.resolve(__dirname, '__fixtures__', 'test.csv'))).toEqual(Buffer.from('second,first\n2,1'));
                fs.unlinkSync(path.resolve(__dirname, '__fixtures__', 'test.csv'));
                res();
            });
            csvStream.pipe(writable);
            [{ first: '1', second: '2' }].forEach(function (item) { return csvStream.write(item); });
            csvStream.end();
        });
    });
    it('should write headers even with no data when formatting a csv', function () {
        return new Promise(function (res, rej) {
            var writable = fs.createWriteStream(path.resolve(__dirname, '__fixtures__/test.csv'), {
                encoding: 'utf8',
            });
            var csvStream = csv.format({ headers: ['first', 'second'] }).on('error', rej);
            writable.on('finish', function () {
                expect(fs.readFileSync(path.resolve(__dirname, '__fixtures__/test.csv'))).toEqual(Buffer.from('first,second\n,'));
                fs.unlinkSync(path.resolve(__dirname, '__fixtures__/test.csv'));
                res();
            });
            csvStream.pipe(writable);
            [{}].forEach(function (item) { return csvStream.write(item); });
            csvStream.end();
        });
    });
});
//# sourceMappingURL=issue77.spec.js.map