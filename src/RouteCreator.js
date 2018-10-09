import web3 from "./web3.js";

const address = "0x6d1b1A9a03f1817a2f0fcDee6F5913A88Fcd62aA";
const abi = [
  {
    constant: false,
    inputs: [
      { name: "routeID", type: "string" },
      { name: "count", type: "uint256" },
      { name: "description", type: "bytes32[]" }
    ],
    name: "createRoute",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getDeployedRoutes",
    outputs: [{ name: "", type: "address[]" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "deployedRoutes",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

export default new web3.eth.Contract(abi, address);
