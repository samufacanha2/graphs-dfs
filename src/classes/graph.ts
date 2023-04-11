import { node } from "./node";

class graph {
  time = 0;
  matrix: number[][] = [];
  nodes: node[] = [];

  constructor() {}

  addNode(parentNode: string, childNode: string) {
    let parent = this.nodes.find((node) => node.id === parentNode);
    if (!parent) {
      parent = new node(parentNode);
      this.nodes.push(parent);
    }
    let child = this.nodes.find((node) => node.id === childNode);
    if (!child) {
      child = new node(childNode);
      this.nodes.push(child);
    }

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

  ClosingTimePrint() {
    this.DFSPrint();

    const nodeList = this.nodes;

    console.log(
      `Sort by Closing Time: ${nodeList
        .sort((a, b) => a.finishTime - b.finishTime)
        .map((node) => node.id)}`
    );
  }

  getAdjacencyMatrix() {
    this.matrix = [];

    this.nodes.forEach((node) => {
      const row: number[] = [];
      this.nodes.forEach((node2) => {
        if (node.hasChild(node2)) {
          row.push(1);
        } else {
          row.push(0);
        }
      });
      this.matrix.push(row);
    });
  }

  printAdjacencyMatrix() {
    this.getAdjacencyMatrix();

    let str = "  ";

    this.nodes.forEach((node) => {
      str += node.id + " ";
    });

    console.log(str);

    this.matrix.forEach((row, index) => {
      str = this.nodes[index].id + " ";
      row.forEach((col) => {
        str += col + " ";
      });
      console.log(str);
    });
  }

  isReflexive() {
    this.getAdjacencyMatrix();

    for (let i = 0; i < this.matrix.length; i++) {
      if (this.matrix[i][i] !== 1) {
        return false;
      }
    }

    return true;
  }

  isSymmetric() {
    this.getAdjacencyMatrix();

    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix.length; j++) {
        if (this.matrix[i][j] !== this.matrix[j][i]) {
          return false;
        }
      }
    }

    return true;
  }

  isAssymetric() {
    this.getAdjacencyMatrix();

    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix.length; j++) {
        if (i !== j && this.matrix[i][j] === this.matrix[j][i]) {
          return false;
        } else if (i === j) {
          if (this.matrix[i][j] !== 0) {
            return false;
          }
        }
      }
    }

    return true;
  }

  isAntiSymmetric() {
    this.getAdjacencyMatrix();

    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix.length; j++) {
        if (i !== j && this.matrix[i][j] === 1 && this.matrix[j][i] === 1) {
          return false;
        }
      }
    }

    return true;
  }
}

export { graph };
