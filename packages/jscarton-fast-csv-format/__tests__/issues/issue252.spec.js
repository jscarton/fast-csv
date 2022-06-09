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
var csv = __importStar(require("../../src"));
var __fixtures__1 = require("../__fixtures__");
describe('Issue #252 - https://github.com/C2FO/fast-csv/issues/252', function () {
    it('should keep the original row', function () {
        return new Promise(function (res, rej) {
            var rs = new __fixtures__1.RecordingStream();
            var data = [
                ['a', 'b', 'c'],
                ['d', 'e', 'f'],
            ];
            csv.write(data, {
                headers: ['header1', 'header2', 'header3'],
            })
                .pipe(rs)
                .on('error', rej)
                .on('finish', function () {
                expect(rs.data.join('')).toBe('header1,header2,header3\na,b,c\nd,e,f');
                res();
            });
        });
    });
});
//# sourceMappingURL=issue252.spec.js.map