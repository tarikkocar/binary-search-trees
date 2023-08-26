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
          break;
        }
        currentNode = currentNode.leftChild;
      } else {
        if (currentNode.rightChild === null) {
          currentNode.rightChild = newNode;
          break;
        }
        currentNode = currentNode.rightChild;
      }
    }
  }

  delete(value, node = this.root) {
    if (node === null) {
      throw new Error("Value not found.");
    }

    if (value < node.value) {
      node.leftChild = this.delete(value, node.leftChild);
    } else if (value > node.value) {
      node.rightChild = this.delete(value, node.rightChild);
    }
    // Node found
    else {
      // Node has no children or only one child
      if (node.leftChild === null) {
        return node.rightChild;
      } else if (node.rightChild === null) {
        return node.leftChild;
      }

      // Node has two children
      let nextMinNode = node.rightChild;
      while (nextMinNode.leftChild !== null) {
        nextMinNode = nextMinNode.leftChild;
      }
      node.value = nextMinNode.value;
      node.rightChild = this.delete(nextMinNode.value, node.rightChild);
    }

    return node;
  }

  find(value) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (value === currentNode.value) {
        return currentNode;
      } else if (value < currentNode.value) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }
    return currentNode;
  }

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

let newArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let newArray2 = [1, 7];
let newTree = new Tree(newArray);
console.log(newTree.root);
newTree.prettyPrint(newTree.root);
// newTree.insert(10);
// newTree.prettyPrint(newTree.root);
// console.log(newTree.find(9));
// console.log(newTree.find(15));
// newTree.delete(3);
// newTree.prettyPrint(newTree.root);
// newTree.delete(5);
// newTree.prettyPrint(newTree.root);

let newTree2 = new Tree(newArray2);
newTree2.prettyPrint(newTree2.root);
newTree2.delete(1);
newTree2.prettyPrint(newTree2.root);
