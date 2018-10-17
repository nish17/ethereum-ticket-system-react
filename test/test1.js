const Route = artifacts.require("Route.sol");
const RouteCreator = artifacts.require("RouteCreator.sol");
const { PerformanceObserver, performance } = require("perf_hooks");
const fs = require("fs");
// console.log(Route);
// console.log(`-------------`);
// console.log(RouteCreator);
// console.log(`-------------`);
let x;
/* THE WORKING CODE
contract("test contract", accounts => {
  it("should perform the given test", () => {
    Route.deployed()
      .then(function(instance) {
        x = instance;
        return x.purchaseTicket("a to c", {
          from: accounts[0],
          value: "1",
          gas: "1000000"
        });
      })
      .then(result => {
        console.log("Transaction was successfull", result.logs);
        return x.getNumberOfTickets().call(accounts[0]);
        // fs.appendFile("log_test1.txt", `${result}\r\n`, err => {
        //   if (err) {
        //     console.log(err);
        //   }
        // });
        // console.log(result.logs);
      })
      .then(number => {
        console.log(`Total ${number} tickets purchased`);
        assert.equal(number, 1);
      });
  });
}); */
/* 
    contract("Route", accounts => {
      it("should purchase the ticket", () => {
        return Route.deployed()
          .then(function(instance) {
            let routes = instance;
            return routes.purchaseTicket("a to c", {
              from: accounts[0],
              gas: "1000000"
            });
            // .send();
          })
          .then(function(result) {
            console.log(result.receipt);
          });
      });
    });
     */
/*         fs.appendFile("log_test1.txt", `${x}\r\n`, err => {
              if (err) console.log(err);
            }); */

// beforeEach({});
// afterEach({});
const reportTest = (participants, accounts) => {
  for (let i = 0; i < participants; i++)
    Route.deployed()
      .then(function(instance) {
        x = instance;
        return x.purchaseTicket("a to c", {
          from: accounts[i],
          value: "1",
          gas: "1000000"
        });
      })
      .then(result => {
        // console.log(`transactionHash:${result.logs[0].transactionHash}`);
        // console.log(`BlockNumber:${result.logs[0].BlockNumber}`);
        // fs.appendFile("log_test1.txt", `${result.logs}\r\n`, err => {
        //   if (err) {
        //     console.log(err);
        //   }
        // });
        // console.log(result);
        // return x.getNumberOfTickets().call({ from: accounts[i] });
      });
  // .then(number => {
  //   console.log(`Total ${number} tickets purchased`);
  //   assert.equal(number, 1);
  // });
};
let timings;
contract("Stress test", function(accounts) {
  describe("stress test", function() {
    // it("can handle 1 participants",  function() {
    //   await reportTest(1, accounts);
    // });

    it("can handle 950 participants", function() {
      // console.log(accounts.length);
      reportTest(950, accounts);
    });

    // it("can handle 10 participants", function() {
    //   reportTest(10, accounts);
    // });

    // it("can handle 10 participants", function() {
    //   reportTest(10, accounts);
    // });

    // it("can handle 20 participants", function() {
    //   reportTest(20, accounts);
    // });

    // it("can handle 30 participants", function() {
    //   reportTest(30, accounts);
    // });

    // it("can handle 50 participants", function() {
    //   reportTest(50, accounts);
    // });

    // it("can handle 50 participants", function() {
    //   reportTest(50, accounts);
    // });
    // it("can handle 50 participants",  function() {
    //   reportTest(50, accounts);
    // });
    // it("can handle 50 participants",  function() {
    //   reportTest(50, accounts);
    // });
    // it("can handle 50 participants",  function() {
    //   reportTest(50, accounts);
    // });
    // it("can handle 200 participants",  function() {
    //   await reportTest(200, accounts);
    // });
    // it("can handle 300 participants",  function() {
    //   await reportTest(300, accounts);
    // });
  });
});
