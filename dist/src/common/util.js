"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
class Util {
    static generateId() {
        const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let autoId = '';
        for (let i = 0; i < 10; i++) {
            autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
        }
        return autoId;
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map