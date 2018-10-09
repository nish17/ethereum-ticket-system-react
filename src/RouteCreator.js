import web3 from "./web3.js";

const address = "0x08E3803A463C4c3da85DC4024961F9F8164a6606";
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
