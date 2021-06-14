import { Block } from "./Block";
import { BlockCluster } from "./BlockCluster";

export interface GameField {
  isGameOver(): boolean;
  isGrounded(blockCluster: BlockCluster): boolean;
  place(blockCluster: BlockCluster): void;
}

export class NormalGameField implements GameField {
  private readonly blockSize: number;
  private readonly width: number;
  private readonly height: number;
  private readonly canvasContext: CanvasRenderingContext2D;
  private readonly accumulatedBlocks: Block[] = [];

  constructor(blockSize: number,
    [width, height]: [number, number],
    canvasContext: CanvasRenderingContext2D
  ) {
    this.blockSize = blockSize;
    this.width = width;
    this.height = height;
    this.canvasContext = canvasContext;
  }
  isGameOver(): boolean {
    throw new Error("Method not implemented.");
  }
  isGrounded(blockCluster: BlockCluster): boolean {
    throw new Error("Method not implemented.");
  }
  place(blockCluster: BlockCluster): void {
    throw new Error("Method not implemented.");
  }

  get numberOfHorizontalSquares() {
    throw new Error();
  }

  get numberOfVerticalSquares() {
    throw new Error();
  }

  private render(blockCluster: BlockCluster): void {
    throw new Error();
  }
}