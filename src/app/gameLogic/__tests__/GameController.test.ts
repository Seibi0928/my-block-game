import { Block } from "../entities/Block";
import { BlockCluster, BlockClusterFactory } from "../entities/BlockCluster";
import { GameField } from "../entities/GameField";
import { GameController } from "../GameController";

describe('GameControllerTest', () => {
  let mockClusterFactory: jest.Mock<BlockClusterFactory, undefined[]>,
    blockClusterFactory: BlockClusterFactory,
    mockGameField: jest.Mock<GameField, undefined[]>,
    mockClusterCreate: jest.Mock<BlockCluster, undefined[]>;

  beforeEach(() => {
    mockClusterFactory = jest
      .fn<BlockClusterFactory, undefined[]>()
      .mockImplementation(() => {
        return { create: () => mockClusterCreate() };
      });
    blockClusterFactory = new mockClusterFactory();
    mockClusterCreate = jest
      .fn<BlockCluster, undefined[]>()
      .mockReturnValueOnce({ blocks: [] });
    mockGameField = jest.fn<GameField, undefined[]>();
  });

  describe('startTest', () => {
    test('ゲームオーバーでも中断状態でも無いときブロックの塊が作られる', () => {
      mockGameField.mockImplementation(() => {
        return {
          isGameOver: () => false,
          isGrounded: _ => false,
          place: _ => false
        };
      });
      const gameField = new mockGameField();
      const gameController = new GameController(blockClusterFactory, gameField);
      gameController.start(1);
      expect(mockClusterCreate).toHaveBeenCalledTimes(1);
    });
    test('ゲームオーバーのときブロックの塊は作られない', () => {
      const isGameOver = true;
      mockGameField.mockImplementation(() => {
        return {
          isGameOver: () => isGameOver,
          isGrounded: _ => false,
          place: _ => false
        };
      });
      const gameField = new mockGameField();
      const gameController = new GameController(blockClusterFactory, gameField);
      gameController.start(1);
      expect(mockClusterCreate).toHaveBeenCalledTimes(0);
    });
    test('指定されたターン数分ブロックの塊が作られる(ゲームオーバーにならないとする)', () => {
      mockGameField.mockImplementation(() => {
        return {
          isGameOver: () => false,
          isGrounded: _ => false,
          place: _ => false
        };
      });
      const gameField = new mockGameField();
      const gameController = new GameController(blockClusterFactory, gameField);
      const turnCount = 11;
      gameController.start(turnCount);
      expect(mockClusterCreate).toHaveBeenCalledTimes(turnCount);
    });
    test('指定されたターン数が0以下のとき例外が発生する', () => {
      mockGameField.mockImplementation(() => {
        return {
          isGameOver: () => false,
          isGrounded: _ => false,
          place: _ => false
        };
      });
      const gameField = new mockGameField();
      const gameController = new GameController(blockClusterFactory, gameField);
      expect(() => gameController.start(1)).rejects.not.toThrow();
      expect(() => gameController.start(0)).rejects.toThrow();
      expect(() => gameController.start(-1)).rejects.toThrow();      
    });
  });
});
