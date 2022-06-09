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
describe('Issue #446 - https://github.com/C2FO/fast-csv/issues/446', function () {
    it('should not quote a field that contains a single quote if it is not the quote character', function () {
        return new Promise(function (res, rej) {
            var rs = new __fixtures__1.RecordingStream();
            var data = [["a quick' brown fox", 'jumped', 'over the lazy brown "dog"']];
            csv.write(data, {
                headers: ['header1', 'header2', 'header3'],
            })
                .pipe(rs)
                .on('error', rej)
                .on('finish', function () {
                expect(rs.data).toEqual([
                    'header1,header2,header3',
                    "\na quick' brown fox,jumped,\"over the lazy brown \"\"dog\"\"\"",
                ]);
                res();
            });
        });
    });
});
//# sourceMappingURL=issue446.spec.js.map