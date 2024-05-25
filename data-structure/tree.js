export default function Tree(value) {
  this.value = value;
  this.children = [];
}

Tree.prototype.addChild = function (value) {
  const createdNode = new Tree(value);

  this.children.push(createdNode);
};

Tree.prototype.contains = function (target) {
  if (this.value === target) {
    return true;
  }

  for (const child of this.children) {
    if (child.contains(target)) {
      return true;
    }
  }

  return false;
};
