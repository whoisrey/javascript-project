export default function BinarySearchTree(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

BinarySearchTree.prototype.insert = function (value) {
  const createdNode = new BinarySearchTree(value);
  let parentNode = this;
  const leftChild = parentNode.left;
  const rightChild = parentNode.right;

  if (parentNode.value > createdNode.value) {
    parentNode = leftChild ?? (parentNode.left = createdNode);
    parentNode.insert(value);
  }

  if (parentNode.value < createdNode.value) {
    parentNode = rightChild ?? (parentNode.right = createdNode);
    parentNode.insert(value);
  }
};

BinarySearchTree.prototype.contains = function (target) {
  let parentNode = this;

  while (parentNode) {
    if (parentNode.value === target) {
      return true;
    }

    parentNode = parentNode.value > target ? parentNode.left : parentNode.right;
  }

  return false;
};

BinarySearchTree.prototype.depthFirstLog = function (storeValue) {
  function searchValue(node) {
    if (node) {
      storeValue(node.value);
      searchValue(node.left);
      searchValue(node.right);
    }
  }

  searchValue(this);
};
