const alphabetTree = {
    value: "M",
    left: {
      value: "G",
      left: {
        value: "D",
        left: {
          value: "B",
          left: { value: "A", left: null, right: null },
          right: { value: "C", left: null, right: null },
        },
        right: {
          value: "F",
          left: { value: "E", left: null, right: null },
          right: null,
        },
      },
      right: {
        value: "J",
        left: {
          value: "H",
          left: null,
          right: { value: "I", left: null, right: null },
        },
        right: {
          value: "L",
          left: { value: "K", left: null, right: null },
          right: null,
        },
      },
    },
    right: {
      value: "T",
      left: {
        value: "Q",
        left: {
          value: "O",
          left: { value: "N", left: null, right: null },
          right: { value: "P", left: null, right: null },
        },
        right: {
          value: "S",
          left: { value: "R", left: null, right: null },
          right: null,
        },
      },
      right: {
        value: "W",
        left: {
          value: "U",
          left: null,
          right: { value: "V", left: null, right: null },
        },
        right: {
          value: "Y",
          left: { value: "X", left: null, right: null },
          right: { value: "Z", left: null, right: null },
        },
      },
    },

    [Symbol.iterator]: function*(){
        yield* iter(this);
    }
  };

const iter = function* (node){
    if(node === null) return;
    yield* iter(node.left);
    yield node.value;
    yield* iter(node.right);
}

for (const node of alphabetTree) {
    console.log(node); // Outputs A, B, C, ... Z
}