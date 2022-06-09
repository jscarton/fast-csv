"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var stream_1 = require("stream");
var csv = __importStar(require("../../src"));
describe('Issue #87 - https://github.com/C2FO/fast-csv/issues/87', function () {
    var MyStream = /** @class */ (function (_super) {
        __extends(MyStream, _super);
        function MyStream() {
            var _this = _super.call(this, {
                objectMode: true,
                highWaterMark: 16,
                transform: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return _this.transform.apply(_this, args);
                },
                flush: function (done) { return done(); },
            }) || this;
            _this.rowCount = 0;
            return _this;
        }
        MyStream.prototype.transform = function (data, encoding, done) {
            this.rowCount += 1;
            if (this.rowCount % 2 === 0) {
                setTimeout(function () { return done(); }, 10);
            }
            else {
                done();
            }
        };
        return MyStream;
    }(stream_1.Transform));
    it('should not emit end until data is flushed from source', function () {
        return new Promise(function (res, rej) {
            var myStream = new MyStream();
            fs.createReadStream(path.resolve(__dirname, '__fixtures__', 'issue87.csv'))
                .pipe(csv.parse({ headers: true }))
                .on('error', rej)
                .pipe(myStream)
                .on('error', rej)
                .on('finish', function () {
                expect(myStream.rowCount).toBe(99);
                res();
            });
        });
    });
});
//# sourceMappingURL=issue87.spec.js.map