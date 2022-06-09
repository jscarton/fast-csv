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
var sinon = __importStar(require("sinon"));
var src_1 = require("../../../src");
var column_1 = require("../../../src/parser/column");
var parser_1 = require("../../../src/parser");
describe('ColumnParser', function () {
    describe('#parse', function () {
        describe('with un-quoted data', function () {
            it('should call the nonQuotedColumnParser', function () {
                var line = 'HELLO';
                var parserOptions = new src_1.ParserOptions({});
                var lineParser = new column_1.ColumnParser(parserOptions);
                var scanner = new parser_1.Scanner({ line: line, parserOptions: parserOptions, hasMoreData: true });
                var expectedResult = { scanner: scanner, items: [] };
                var mock = sinon.mock(lineParser.nonQuotedColumnParser);
                mock.expects('parse').once().withArgs(scanner).returns(expectedResult);
                expect(lineParser.parse(scanner)).toEqual(expectedResult);
                mock.verify();
            });
        });
        describe('with quoted data', function () {
            it('should call the quotedColumnParser', function () {
                var line = '"HELLO"';
                var parserOptions = new src_1.ParserOptions({});
                var lineParser = new column_1.ColumnParser(parserOptions);
                var scanner = new parser_1.Scanner({ line: line, parserOptions: parserOptions, hasMoreData: true });
                var expectedResult = { scanner: scanner, items: [] };
                var mock = sinon.mock(lineParser.quotedColumnParser);
                mock.expects('parse').once().withArgs(scanner).returns(expectedResult);
                expect(lineParser.parse(scanner)).toEqual(expectedResult);
                mock.verify();
            });
        });
    });
});
//# sourceMappingURL=ColumnParser.spec.js.map