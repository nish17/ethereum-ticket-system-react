// const assert = require("assert");
// const ganache = require("ganache-cli");
// const Web3 = require("web3");
// const { route, routeCreator } = require("../ethereum/compile");
// const RInterface = route.interface;
// const RByte = route.bytecode;
// const RCInterface = routeCreator.interface;
// const RCByte = routeCreator.bytecode;
// const web3 = new Web3(ganache.provider());

// let accounts;
// var Rcreator123, Route;
// beforeEach(async () => {
//   await web3.eth.getAccounts().then(result => {
//     accounts = result;
//   });
//   // console.log(web3.eth.getBalance(accounts[0]));
//   Rcreator123 = await new web3.eth.Contract(JSON.parse(RCInterface))
//     .deploy({ data: RCByte })
//     .send({ from: accounts[0], gas: "3000000" });
//   // console.log(RCreator123);
//   Route = await new web3.eth.Contract(JSON.parse(RInterface))
//     .deploy({
//       data: RByte,
//       arguments: [
//         `${accounts[0]}`,
//         "a to c",
//         3,
//         [
//           web3.utils.fromAscii("abcjaslkdfjalskdfjlkasjlasdjfl"),
//           web3.utils.fromAscii("bcajaslkdfjalskdfjlkasjlasdjfl"),
//           web3.utils.fromAscii("cabjaslkdfjalskdfjlkasjlasdjfl")
//         ]
//       ]
//     })
//     .send({ from: accounts[0], gas: "3000000" });
// });

// // fun();
// // console.log(web3);

// // describe("In RouteCreator Contract", () => {
// //   it("creates the route", async () => {
// //     await RCreator123.methods
// //       .createRoute("1", 2, [
// //         web3.utils.fromAscii("jaslkdfjalskdfjlkasjlasdjfl"),
// //         web3.utils.fromAscii("abcjaslkdfjalsasdffscffdekj")
// //       ])
// //       .send({
// //         from: accounts[0]
// //       });
// //     const deployedRoutes = await routeCreator.methods
// //       .getDeployedRoutes()
// //       .call();
// //     assert.equal(1, deployedRoutes);
// //   });
// // });

// describe("In Route Contract", () => {
//   it("purchases ticket", async () => {
//     // for (let i = 0; i < 1; i++) {
//     await Route.methods.purchaseTicket("a to c").send({
//       from: accounts[0],
//       value: web3.utils.toWei("0.00002", "ether")
//       // args: ["a to b"]
//     });
//     // }
//     const NoOfTicketPurchased = await Route.methods.getNumberOfTickets().call({
//       from: accounts[0]
//     });

//     // for (let i = 0; i < accounts.length; i++) {
//     // }
//     assert.equal(accounts[0], NoOfTicketPurchased[0]);
//   });
// });
