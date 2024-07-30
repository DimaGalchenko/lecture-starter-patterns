import {ReorderService} from "./reorder.service";
import {Logger} from "../logger/Logger";
import {List} from "../data/models/list";

// PATTERN:Proxy
class ReorderServiceProxy extends ReorderService{
  private reorderService: ReorderService;
  private logger: Logger;

  constructor(reorderService: ReorderService, logger: Logger) {
    super();
    this.reorderService = reorderService;
    this.logger = logger;
  }

  public reorder<T>(items: T[], startIndex: number, endIndex: number): T[] {
    this.logger.log('info', `reorder called with items: ${JSON.stringify(items)}, startIndex: ${startIndex}, endIndex: ${endIndex}`);
    return this.reorderService.reorder(items, startIndex, endIndex);
  }

  public reorderCards({
                        lists,
                        sourceIndex,
                        destinationIndex,
                        sourceListId,
                        destinationListId,
                      }: {
    lists: List[];
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): List[] {
    this.logger.log('info', `reorderCards called with lists: ${JSON.stringify(lists)}, sourceIndex: ${sourceIndex}, destinationIndex: ${destinationIndex}, sourceListId: ${sourceListId}, destinationListId: ${destinationListId}`);
    return this.reorderService.reorderCards({
      lists: lists,
      sourceIndex: sourceIndex,
      destinationIndex: destinationIndex,
      sourceListId: sourceListId,
      destinationListId: destinationListId
    });
  }
}

export { ReorderServiceProxy };
