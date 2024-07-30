import { Server, Socket } from "socket.io";

import { ListEvent } from "../common/enums/enums";
import { Database } from "../data/database";
import { ReorderService } from "../services/reorder.service";
import {Logger} from "../logger/Logger";

abstract class SocketHandler {
  protected db: Database;

  protected reorderService: ReorderService;

  protected io: Server;

  protected logger: Logger;

  public constructor(io: Server, db: Database, reorderService: ReorderService, logger: Logger) {
    this.io = io;
    this.db = db;
    this.reorderService = reorderService;
    this.logger = logger;
  }

  public abstract handleConnection(socket: Socket): void;

  protected updateLists(): void {
    this.io.emit(ListEvent.UPDATE, this.db.getData());
  }
}

export { SocketHandler };
