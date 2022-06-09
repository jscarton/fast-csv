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
describe('Issue #158 - https://github.com/C2FO/fast-csv/issues/158', function () {
    var Place = /** @class */ (function () {
        function Place(id, name) {
            this.id = id;
            this.name = name;
            this.calculatedValue = 0;
        }
        Place.prototype.calculateSomething = function () {
            this.calculatedValue = this.id * 2;
            return this;
        };
        return Place;
    }());
    it('should not write prototype methods in csv', function () {
        return new Promise(function (res, rej) {
            var rs = new __fixtures__1.RecordingStream();
            csv.write([
                new Place(1, 'a').calculateSomething(),
                new Place(2, 'b').calculateSomething(),
                new Place(3, 'c').calculateSomething(),
            ], { headers: true })
                .pipe(rs)
                .on('error', rej)
                .on('finish', function () {
                expect(rs.data.join('')).toBe('id,name,calculatedValue\n1,a,2\n2,b,4\n3,c,6');
                res();
            });
        });
    });
});
//# sourceMappingURL=issue158.spec.js.map