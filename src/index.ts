import { node } from "./classes/node";
import { graph } from "./classes/graph";

const graph1 = new graph([
  new node("A"),
  new node("B"),
  new node("C"),
  new node("D"),
]);
graph1.addNode("A", "B");
graph1.addNode("A", "C");
graph1.addNode("B", "D");
graph1.addNode("C", "D");
graph1.DFSPrint();
