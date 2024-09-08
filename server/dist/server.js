"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./src/db"));
(0, db_1.default)()
    .then(() => console.log("success:true"))
    .catch((err) => {
    console.log("success:false");
});
