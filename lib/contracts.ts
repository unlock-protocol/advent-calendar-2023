
const contracts = {
  hook: {
    network: 5,
    address: "0x29eE24817a3aA5A89be094728558A3E3511a1eb6",
    ABI: [{"inputs":[{"internalType":"uint256","name":"day","type":"uint256"}],"name":"BAD_DAY","type":"error"},{"inputs":[{"internalType":"uint256","name":"day","type":"uint256"}],"name":"MISSING_PREVIOUS_DAY","type":"error"},{"inputs":[{"internalType":"uint256","name":"day","type":"uint256"}],"name":"TOO_EARLY","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"player","type":"address"},{"indexed":true,"internalType":"uint256","name":"random","type":"uint256"},{"indexed":true,"internalType":"string","name":"prize","type":"string"}],"name":"Random","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"dayByLock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_locks","type":"address[]"},{"internalType":"uint256","name":"_start","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"keyPurchasePrice","outputs":[{"internalType":"uint256","name":"minKeyPrice","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lockByDay","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"onKeyPurchase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"start","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
  },
  lock: {
    ABI: [
      {
        inputs: [
          { internalType: "address", name: "_keyOwner", type: "address" },
        ],
        name: "getHasValidKey",
        outputs: [{ internalType: "bool", name: "isValid", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        "inputs": [
          { "internalType": "uint256[]", "name": "_values", "type": "uint256[]" },
          {
            "internalType": "address[]",
            "name": "_recipients",
            "type": "address[]"
          },
          {
            "internalType": "address[]",
            "name": "_referrers",
            "type": "address[]"
          },
          {
            "internalType": "address[]",
            "name": "_keyManagers",
            "type": "address[]"
          },
          { "internalType": "bytes[]", "name": "_data", "type": "bytes[]" }
        ],
        "name": "purchase",
        "outputs": [
          { "internalType": "uint256[]", "name": "", "type": "uint256[]" }
        ],
        "stateMutability": "payable",
        "type": "function"
      },
    ]
  }
}

export default contracts