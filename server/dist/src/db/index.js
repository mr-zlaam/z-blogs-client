"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.default = connectDB;
const client_1 = require("@prisma/client");
const config_1 = require("../config");
const app_1 = require("../app");
/*
 console.log(`

         
*/
const prisma = new client_1.PrismaClient({});
exports.prisma = prisma;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        prisma
            .$connect()
            .then(() => {
            app_1.app.listen(config_1.PORT, () => {
                console.log(`
                  **************************************************************
                            connected to the database successfully!!

                       Server is running on port:- http://localhost:${config_1.PORT}
                  **************************************************************
         `);
            });
        })
            .catch((err) => {
            console.error(`
                        **************************************************************
                                  X  ERRR while connecting to database X \n ${err.message}
                        **************************************************************
      `);
            process.exit(1);
        });
    });
}
