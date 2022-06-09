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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseString = exports.parseFile = exports.parseStream = exports.parse = exports.ParserOptions = exports.CsvParserStream = void 0;
var fs = __importStar(require("fs"));
var stream_1 = require("stream");
var ParserOptions_1 = require("./ParserOptions");
var CsvParserStream_1 = require("./CsvParserStream");
__exportStar(require("./types"), exports);
var CsvParserStream_2 = require("./CsvParserStream");
Object.defineProperty(exports, "CsvParserStream", { enumerable: true, get: function () { return CsvParserStream_2.CsvParserStream; } });
var ParserOptions_2 = require("./ParserOptions");
Object.defineProperty(exports, "ParserOptions", { enumerable: true, get: function () { return ParserOptions_2.ParserOptions; } });
exports.parse = function (args) {
    return new CsvParserStream_1.CsvParserStream(new ParserOptions_1.ParserOptions(args));
};
exports.parseStream = function (stream, options) { return stream.pipe(new CsvParserStream_1.CsvParserStream(new ParserOptions_1.ParserOptions(options))); };
exports.parseFile = function (location, options) {
    if (options === void 0) { options = {}; }
    return fs.createReadStream(location).pipe(new CsvParserStream_1.CsvParserStream(new ParserOptions_1.ParserOptions(options)));
};
exports.parseString = function (string, options) {
    var rs = new stream_1.Readable();
    rs.push(string);
    rs.push(null);
    return rs.pipe(new CsvParserStream_1.CsvParserStream(new ParserOptions_1.ParserOptions(options)));
};
//# sourceMappingURL=index.js.map