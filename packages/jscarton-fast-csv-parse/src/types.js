"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSyncValidate = exports.isSyncTransform = void 0;
exports.isSyncTransform = function (transform) { return transform.length === 1; };
exports.isSyncValidate = function (validate) {
    return validate.length === 1;
};
//# sourceMappingURL=types.js.map