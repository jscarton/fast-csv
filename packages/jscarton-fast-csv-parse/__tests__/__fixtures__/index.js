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
exports.write = void 0;
var fs_1 = require("fs");
var path = __importStar(require("path"));
__exportStar(require("./alternateEncoding"), exports);
__exportStar(require("./noHeadersAndQuotes"), exports);
__exportStar(require("./skipLines"), exports);
__exportStar(require("./withHeaders"), exports);
__exportStar(require("./withHeadersAndQuotes"), exports);
__exportStar(require("./withHeadersAndAlternateQuote"), exports);
__exportStar(require("./withHeadersAndMissingColumns"), exports);
__exportStar(require("./withHeadersAlternateDelimiter"), exports);
__exportStar(require("./withHeadersAndSkippedLines"), exports);
__exportStar(require("./headerColumnMismatch"), exports);
__exportStar(require("./malformed"), exports);
__exportStar(require("./trailingComma"), exports);
__exportStar(require("./emptyRows"), exports);
__exportStar(require("./duplicateHeaders"), exports);
__exportStar(require("./RecordingStream"), exports);
__exportStar(require("./helpers"), exports);
var mkDirIfNotExists = function (filePath) {
    var dir = path.dirname(filePath);
    if (!fs_1.existsSync(dir)) {
        fs_1.mkdirSync(dir);
    }
};
exports.write = function (opts) {
    mkDirIfNotExists(opts.path);
    fs_1.writeFileSync(opts.path, opts.content);
};
//# sourceMappingURL=index.js.map