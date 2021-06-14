import { BlockClusterFactory } from "./entities/BlockCluster";
import { GameField } from "./entities/GameField";

export class GameController {
  private isStopped: boolean = false;
  private readonly blockClusterFactory: BlockClusterFactory;
  private readonly gameField: GameField;

  constructor(
    blockClusterFactory: BlockClusterFactory,
    gameField: GameField
  ) {
    this.blockClusterFactory = blockClusterFactory;
    this.gameField = gameField;
  }

  async start(turnCount: number) {
    if (turnCount <= 0) {
      throw new Error('turnCountには1以上の整数を指定してください。');
    }
    this.isStopped = false;
    while (!this.gameField.isGameOver() && !this.isStopped && turnCount > 0) {
      // 新ブロックの塊出現
      const blockCluster = this.blockClusterFactory.create();

      // 新ブロックが接地するまで下降させる

      turnCount--;
    }
  }



  async stop() {
    this.isStopped = true;
  }
}

