import { PrismaClient } from "@prisma/client";
import { PORT } from "../config";
import { app } from "../app";
/*
 console.log(`
                  **************************************************************
                            connected to the database successfully!!

                       Server is running on port:- http://localhost:${PORT}
                  **************************************************************
         
*/

const prisma = new PrismaClient({});
export default async function connectDB() {
  prisma
    .$connect()
    .then(() => {
      app.listen(PORT, () => {
        console.log(
          `Connected to the database successfully \n Server is running on port ${PORT}`,
        );
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
}
export { prisma };
