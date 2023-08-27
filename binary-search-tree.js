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

  insert(value, node = this.root) {
    if (node === null) {
      node = new Node(value);
    }

    if (value < node.value) {
      node.leftChild = this.insert(value, node.leftChild);
    } else if (node.value < value) {
      node.rightChild = this.insert(value, node.rightChild);
    }

    return node;
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

  find(value, node = this.root) {
    if (node === null || node.value === value) {
      return node;
    }

    if (value < node.value) {
      return this.find(value, node.leftChild);
    } else {
      return this.find(value, node.rightChild);
    }
  }

  levelOrder(node = this.root, orderedList = [], queue = []) {
    if (node === null) {
      return;
    }

    orderedList.push(node.value);
    queue.push(node.leftChild);
    queue.push(node.rightChild);

    while (queue.length) {
      let currentNode = queue[0];
      queue.shift();
      this.levelOrder(currentNode, orderedList, queue);
    }

    return orderedList;
  }

  preOrder(node = this.root, orderedList = []) {
    if (node === null) {
      return;
    }

    orderedList.push(node.value);

    if (node.leftChild) {
      this.preOrder(node.leftChild, orderedList);
    }

    if (node.rightChild) {
      this.preOrder(node.rightChild, orderedList);
    }

    return orderedList;
  }

  inOrder(node = this.root, orderedList = []) {
    if (node === null) {
      return;
    }

    if (node.leftChild) {
      this.inOrder(node.leftChild, orderedList);
    }

    orderedList.push(node.value);

    if (node.rightChild) {
      this.inOrder(node.rightChild, orderedList);
    }

    return orderedList;
  }

  postOrder(node = this.root, orderedList = []) {
    if (node === null) {
      return;
    }

    if (node.leftChild) {
      this.postOrder(node.leftChild, orderedList);
    }

    if (node.rightChild) {
      this.postOrder(node.rightChild, orderedList);
    }

    orderedList.push(node.value);

    return orderedList;
  }

  height(value, node = this.root) {
    if (node === null) {
      return -1;
    }

    if (value === node.value) {
      return this.subtreeHeight(node);
    }

    if (value < node.value) {
      return this.height(value, node.leftChild);
    } else {
      return this.height(value, node.rightChild);
    }
  }

  subtreeHeight(node) {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.subtreeHeight(node.leftChild);
    const rightHeight = this.subtreeHeight(node.rightChild);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value, node = this.root) {
    if (node === null) {
      return -1;
    }

    if (value === node.value) {
      return 0;
    }

    if (value < node.value) {
      const leftDepth = this.depth(value, node.leftChild);
      if (leftDepth === -1) {
        return -1;
      }
      return leftDepth + 1;
    } else {
      const rightDepth = this.depth(value, node.rightChild);
      if (rightDepth === -1) {
        return -1;
      }
      return rightDepth + 1;
    }
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }

    const leftHeight = this.subtreeHeight(node.leftChild);
    const rightHeight = this.subtreeHeight(node.rightChild);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return this.isBalanced(node.leftChild) && this.isBalanced(node.rightChild);
  }

  reBalance() {
    let values = this.levelOrder();
    return (this.root = this.buildTree(values));
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

let randomNumbers = [];
for (let i = 0; i < 15; i++) {
  randomNumbers.push(Math.floor(Math.random() * 100));
}
console.log("Random numbers array:", randomNumbers);
const newTree = new Tree(randomNumbers);
console.log(newTree.prettyPrint(newTree.root));
console.log("Is balanced:", newTree.isBalanced());

console.log("Level order:", newTree.levelOrder());
console.log("Preorder:", newTree.preOrder());
console.log("Inorder:", newTree.inOrder());
console.log("Postorder:", newTree.postOrder());

newTree.insert(110);
newTree.insert(120);
newTree.insert(130);

console.log("Is balanced:", newTree.isBalanced());

newTree.reBalance();

console.log("Is balanced:", newTree.isBalanced());

console.log(newTree.prettyPrint(newTree.root));

console.log("Level order:", newTree.levelOrder());
console.log("Preorder:", newTree.preOrder());
console.log("Inorder:", newTree.inOrder());
console.log("Postorder:", newTree.postOrder());
