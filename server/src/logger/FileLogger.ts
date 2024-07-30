import {Subscriber} from "./Subscriber";
import * as fs from "fs";

class FileLogger implements Subscriber {
  private readonly logFile: string;

  constructor(logFile: string) {
    this.logFile = logFile;
  }

  log(level: string, message: string) {
    const logMessage = `${new Date().toISOString()} [${level.toUpperCase()}]: ${message}\n`;
    fs.appendFileSync(this.logFile, logMessage);
  }
}

export { FileLogger };
