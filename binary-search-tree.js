class Node {
  constructor(value = null, leftChild = null, rightChild = null) {
    this.value = value;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(this.array);
  }

  buildTree(array) {
    if (array.length === 0) return null;
    if (array.length === 1) return new Node(array[0]);

    const sortedUniqueArray = Array.from(new Set(array)).sort((a, b) => a - b);
    const middleIndex = parseInt((sortedUniqueArray.length - 1) / 2);
    const rootValue = sortedUniqueArray[middleIndex];

    const leftArray = sortedUniqueArray.slice(0, middleIndex);
    const rightArray = sortedUniqueArray.slice(middleIndex + 1);

    const rootNode = new Node(
      rootValue,
      this.buildTree(leftArray),
      this.buildTree(rightArray)
    );
    return rootNode;
  }

  insert(value) {
    const newNode = new Node(value);
    let currentNode = this.root;

    while (true) {
      if (newNode.value < currentNode.value) {
        if (currentNode.leftChild === null) {
          currentNode.leftChild = newNode;
          return;
        }
        currentNode = currentNode.leftChild;
      } else {
        if (currentNode.rightChild === null) {
          currentNode.rightChild = newNode;
          return;
        }
        currentNode = currentNode.rightChild;
      }
    }
  }

  delete(value) {}

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      this.prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftChild !== null) {
      this.prettyPrint(
        node.leftChild,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }
}

// let newArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// let newTree = new Tree(newArray);
// console.log(newTree.root);
// newTree.prettyPrint(newTree.root);
// newTree.insert(10);
// newTree.prettyPrint(newTree.root);
