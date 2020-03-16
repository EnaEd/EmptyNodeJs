import amqp, { Connection } from "amqplib/callback_api";

export class Publisher {
  publisherChanel: any = null;
  offlinePublisherQueue: any[] = [];
  public start(
    amqpConn: Connection,
    closeOnError: (error: any, amqpConnection: Connection) => boolean
  ) {
    amqpConn.createConfirmChannel((err, chanel) => {
      if (closeOnError(err, amqpConn)) {
        return;
      }
      chanel.on(`error`, err => {
        console.error(`[AMQP] chanel error`, err.message);
      });
      chanel.on(`close`, () => {
        console.log(`[AMQP] chanel closed`);
      });

      this.publisherChanel = chanel;
      while (true) {
        var messageArray = this.offlinePublisherQueue.shift();
        if (!messageArray) {
          break;
        }
        this.publish(messageArray[0], messageArray[1], messageArray[2]);
      }
    });
  }

  private publish(exchange: string, routingKey: string, content: Buffer) {
    try {
      this.publisherChanel.publish(
        exchange,
        routingKey,
        content,
        { persistent: true },
        (err: any, ok: any) => {
          if (err) {
            console.error(`[AMQP] publish`, err);
            this.offlinePublisherQueue.push([exchange, routingKey, content]);
          }
        }
      );
    } catch (err) {
      console.error(`[AMQP publish]`, err.message);
      this.offlinePublisherQueue.push([exchange, routingKey, content]);
    }
  }
}
