import {Subscriber} from "./Subscriber";

class ConsoleErrorLogger implements Subscriber {
  log(level: string, message: string) {
    if (level === 'error') {
      console.error(`${new Date().toISOString()} [ERROR]: ${message}`);
    }
  }
}

export { ConsoleErrorLogger };
