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
exports.writeToPath = exports.writeToString = exports.writeToBuffer = exports.writeToStream = exports.write = exports.format = exports.FormatterOptions = exports.CsvFormatterStream = void 0;
var util_1 = require("util");
var stream_1 = require("stream");
var fs = __importStar(require("fs"));
var FormatterOptions_1 = require("./FormatterOptions");
var CsvFormatterStream_1 = require("./CsvFormatterStream");
__exportStar(require("./types"), exports);
var CsvFormatterStream_2 = require("./CsvFormatterStream");
Object.defineProperty(exports, "CsvFormatterStream", { enumerable: true, get: function () { return CsvFormatterStream_2.CsvFormatterStream; } });
var FormatterOptions_2 = require("./FormatterOptions");
Object.defineProperty(exports, "FormatterOptions", { enumerable: true, get: function () { return FormatterOptions_2.FormatterOptions; } });
exports.format = function (options) {
    return new CsvFormatterStream_1.CsvFormatterStream(new FormatterOptions_1.FormatterOptions(options));
};
exports.write = function (rows, options) {
    var csvStream = exports.format(options);
    var promiseWrite = util_1.promisify(function (row, cb) {
        csvStream.write(row, undefined, cb);
    });
    rows.reduce(function (prev, row) { return prev.then(function () { return promiseWrite(row); }); }, Promise.resolve())
        .then(function () { return csvStream.end(); })
        .catch(function (err) {
        csvStream.emit('error', err);
    });
    return csvStream;
};
exports.writeToStream = function (ws, rows, options) { return exports.write(rows, options).pipe(ws); };
exports.writeToBuffer = function (rows, opts) {
    if (opts === void 0) { opts = {}; }
    var buffers = [];
    var ws = new stream_1.Writable({
        write: function (data, enc, writeCb) {
            buffers.push(data);
            writeCb();
        },
    });
    return new Promise(function (res, rej) {
        ws.on('error', rej).on('finish', function () { return res(Buffer.concat(buffers)); });
        exports.write(rows, opts).pipe(ws);
    });
};
exports.writeToString = function (rows, options) { return exports.writeToBuffer(rows, options).then(function (buffer) { return buffer.toString(); }); };
exports.writeToPath = function (path, rows, options) {
    var stream = fs.createWriteStream(path, { encoding: 'utf8' });
    return exports.write(rows, options).pipe(stream);
};
//# sourceMappingURL=index.js.map