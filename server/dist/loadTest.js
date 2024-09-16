"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
exports.default = default_1;
const http_1 = __importDefault(require("k6/http"));
const k6_1 = require("k6");
exports.options = {
    vus: 50, // Number of Virtual Users
    duration: "1m", // Duration of the test
};
function default_1() {
    const res = http_1.default.get("http://localhost:8000/api/v2/blog/getAllPublicBlogs"); // Replace with your endpoint
    (0, k6_1.check)(res, {
        "is status 200": (r) => r.status === 200,
        "response time is < 200ms": (r) => r.timings.duration < 200,
    });
    (0, k6_1.sleep)(1); // Simulate user think time
}
