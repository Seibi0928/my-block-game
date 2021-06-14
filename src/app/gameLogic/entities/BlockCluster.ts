import { Block } from "./Block";

export interface BlockCluster {
  blocks: Block[];
}

export interface BlockClusterFactory {
  create(): BlockCluster;

}