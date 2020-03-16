import { Scraper } from "./puppeteer/index";
import { Publisher } from "./publisher/index";
import { bit } from "./bit/index";
import { job } from "./job/index";
import koa from "koa";
import { handler } from "./error-handler";
import mount from "koa-mount";
import amqp from "amqplib/callback_api";

// class Application {
//   amqpConn: amqp.Connection = null;

//   public start() {
//     amqp.connect(
//       `${process.env.CLOUDAMQP_URP}?heartbeat=60`,
//       (err, connection: amqp.Connection) => {
//         if (err) {
//           console.error("[AMQP]: ", err.message);
//           return setTimeout(() => this.start(), 1000);
//         }
//         if (!connection) {
//           console.error(`[AMQP] no connection was established`);
//           return setTimeout(() => this.start(), 1000);
//         }
//         connection.on(`error`, err => {
//           if (err.message !== `Connection closing`) {
//             console.error(`[AMQP] connection error`, err.message);
//             return setTimeout(() => this.start(), 1000);
//           }
//         });
//         connection.on(`close`, () => {
//           console.error(`[AMQP] reconnection`);
//           return setTimeout(() => this.start(), 1000);
//         });

//         console.log(`[AMQP] connected`);
//         this.amqpConn = connection;
//         this.whenConnected();
//       }
//     );
//   }
//   private whenConnected() {
//     new Publisher().start(this.amqpConn, this.closeOnError);
//     //this.startWorkers();
//   }

//   private closeOnError(error: any, amqpConnection: amqp.Connection) {
//     if (!error) {
//       return false;
//     }

//     console.error("[AMQP] error:", error);
//     amqpConnection.close();
//     return true;
//   }

//   // app.use(handler);

//   // app.use(mount("/job", job));
//   // app.use(mount("/bit", bit));

//   // app.listen(3010, () => {
//   //   console.log(`server start on 3010`);
//   // });
// }

const app = new koa();

app.use(handler);

app.use(mount("/job", job));
app.use(mount("/bit", bit));
app.use(mount("/puppeteer", new Scraper().Scrape));

app.listen(3010, () => {
  console.log(`server start on 3010`);
});
