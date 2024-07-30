import {Subscriber} from "./Subscriber";

// PATTERN:Observer
class Logger {
  private subscribers: Subscriber[] = [];

  public subscribe(subcriber: Subscriber): void {
    this.subscribers.push(subcriber);
  }

  public log(level: string, message: string): void {
    for (const subscriber of this.subscribers) {
      subscriber.log(level, message);
    }
  }
}

export { Logger };
