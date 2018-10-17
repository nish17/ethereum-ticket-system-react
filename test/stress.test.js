/* const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
// const RouteContract = artifacts.require('')
const { route, routeCreator } = require("../ethereum/compile");
const RInterface = route.interface;
const RByte = route.bytecode;
const RCInterface = routeCreator.interface;
const RCByte = routeCreator.bytecode;
// const Route = require("../src/Route");
// const routeCreator = require("../src/RouteCreator");
const web3 = new Web3(ganache.provider());

let accounts, tickets;
let Route, RouteCreator;
const gasPrice = "1000000";
// web3.utils.toWei(new web3.utils.BN(2), "gwei");
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  // console.log(accounts);
  RouteCreator = await new web3.eth.Contract(JSON.parse(RCInterface))
    .deploy({ data: RCByte })
    .send({ from: accounts[0], gas: gasPrice });
  // console.log(RouteCreator);
  Route = await new web3.eth.Contract(JSON.parse(RInterface))
    .deploy({
      data: RByte,
      arguments: [
        `${accounts[0]}`,
        "a to c",
        3,
        [
          web3.utils.fromAscii("abcjaslkdfjalskdfjlkasjlasdjfl"),
          web3.utils.fromAscii("bcajaslkdfjalskdfjlkasjlasdjfl"),
          web3.utils.fromAscii("cabjaslkdfjalskdfjlkasjlasdjfl")
        ]
      ]
    })
    .send({ from: accounts[0], gas: gasPrice });

  console.log(web3.eth.getBalance(accounts[0]).then(console.log));
});
const reportTest = async (participants, accounts) => {
  // const addresses = [];
  // const transactions = [];
  const owner = "0xd0B35059366388df5901e519BBdcFc8994fD26b7";
  console.log(participants, accounts);
  for (let i = 0; i < participants; i++)
    tickets = await Route.methods.purchaseTicket("test1 to test2").send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether")
    });
  console.log(tickets);
  const getTickets = await Route.getNumberOfTickets().call();
  console.log(getTickets);
  assert.strictEqual(getTickets, participants);
};

describe("stress test", function() {
  it("can handle 2 participants", async function() {
    this.timeout(10000);
    await reportTest(2, accounts);
  });

  it("can handle 10 participants", async function() {
    this.timeout(10000);
    await reportTest(10, accounts);
  });

  // it("can handle 100 participants", async function() {
  //   await reportTest(100, accounts);
  // });

  // it("can handle 200 participants", async function() {
  //   await reportTest(200, accounts);
  // });

  // it("can handle 300 participants", async function() {
  //   await reportTest(300, accounts);
  // });
});
 */
