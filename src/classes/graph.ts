import { node } from "./node";

class graph {
  time = 0;
  constructor(public nodes: node[]) {
    this.nodes = nodes;
  }

  addNode(parentNode: string, childNode: string) {
    const parent = this.nodes.find((node) => node.id === parentNode);
    const child = this.nodes.find((node) => node.id === childNode);

    if (parent && child) {
      parent.addChild(child);
      child.addParent(parent);
    }
  }

  print() {
    this.nodes.forEach((node) => {
      console.log(node.id + " -> " + node.children.map((node) => node.id));
    });
  }

  DFS() {
    this.time = 0;
    this.nodes.forEach((node) => {
      if (node.color === "white") {
        this.DFSVisit(node);
      }
    });
  }

  DFSVisit(node: node) {
    node.color = "gray";
    this.time++;
    node.discoveryTime = this.time;
    node.children.forEach((child) => {
      if (child.color === "white") {
        this.DFSVisit(child);
      }
    });
    node.color = "black";
    this.time++;
    node.finishTime = this.time;
  }

  DFSPrint() {
    this.DFS();

    this.nodes.forEach((node) => {
      console.log(
        node.id +
          " ( " +
          node.discoveryTime +
          " | " +
          node.finishTime +
          " ) -> " +
          node.children.map((node) => node.id)
      );
    });
  }
}

export { graph };
