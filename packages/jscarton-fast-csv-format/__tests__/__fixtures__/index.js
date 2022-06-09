"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiDimensionalRows = exports.arrayRows = exports.objectRows = exports.RecordingStream = void 0;
var RecordingStream_1 = require("./RecordingStream");
Object.defineProperty(exports, "RecordingStream", { enumerable: true, get: function () { return RecordingStream_1.RecordingStream; } });
exports.objectRows = [
    { a: 'a1', b: 'b1' },
    { a: 'a2', b: 'b2' },
];
exports.arrayRows = [
    ['a', 'b'],
    ['a1', 'b1'],
    ['a2', 'b2'],
];
exports.multiDimensionalRows = [
    [
        ['a', 'a1'],
        ['b', 'b1'],
    ],
    [
        ['a', 'a2'],
        ['b', 'b2'],
    ],
];
//# sourceMappingURL=index.js.map