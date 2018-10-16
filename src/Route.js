// import web3 from "./web3.js";
const web3 = require("./web3.js");
const address = "0xf0e42e951719EE37AFeBDc39C470bE32b6e03967";
const abi = [
  {
    constant: true,
    inputs: [],
    name: "getNumberOfTrips",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "routeID",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "description", type: "string" },
      { name: "dateTime", type: "uint256" }
    ],
    name: "createTrip",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "manager",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "tickets",
    outputs: [
      { name: "travelDescription", type: "string" },
      { name: "amount", type: "uint256" },
      { name: "isUsed", type: "bool" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "busStopCount",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getNumberOfTickets",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "description", type: "string" }],
    name: "purchaseTicket",
    outputs: [{ name: "", type: "uint256" }],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "index", type: "uint256" }],
    name: "completeTrip",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "tripIndex", type: "uint256" },
      { name: "ticketIndex", type: "uint256" }
    ],
    name: "approveTrip",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "routeDescription",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "trips",
    outputs: [
      { name: "tripDescription", type: "string" },
      { name: "startDateTime", type: "uint256" },
      { name: "amount", type: "uint256" },
      { name: "approversCount", type: "uint256" },
      { name: "isComplete", type: "bool" },
      { name: "reportedArrivalTimes", type: "uint256" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "tripIndex", type: "uint256" },
      { name: "busStop", type: "bytes32" },
      { name: "arrivalTime", type: "uint256" }
    ],
    name: "arrival",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "creator", type: "address" },
      { name: "route", type: "string" },
      { name: "count", type: "uint256" },
      { name: "description", type: "bytes32[]" }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "index", type: "uint256" }],
    name: "ValueLogger",
    type: "event"
  }
];

// export default new web3.eth.Contract(abi, address);
module.exports = new web3.eth.Contract(abi, address);
