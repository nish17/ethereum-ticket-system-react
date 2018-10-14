const Web3 = require("web3");

let web3;
//  = new Web3(window.web3.currentProvider);

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/232565dedf3b408ea93b991ed92c70c4"
  );
  web3 = new Web3(provider);
}

export default web3;
// // import Web3 from "web3";
// const Web3 = require("web3");
// let web3;
// // function isLocked() {}
// try {
//   web3 = new Web3(window.web3.currentProvider);
// } catch (e) {
//   if (typeof web3 !== "undefined") {
//     // Use Mist/MetaMask's provider
//     web3 = new Web3(web3.currentProvider);
//   } else {
//     console.log("No web3? You should consider trying MetaMask!");
//     // isLocked();
//     web3 = window.ethereum;
//     // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:3000"));

//     // console.log(
//     //   "web3.eth.getAccounts().then().catch"
//     //   // web3.eth
//     //   //   .getAccounts()
//     //   //   .then(result => {
//     //   //     console.log(result);
//     //   //   })
//     //   //   .catch(e => {
//     //   //     console.log("error: ", e);
//     //   //   })
//     // );
//     web3.eth.getAccounts((err, accounts) => {
//       if (err) {
//         console.log("err", err);
//       } else if (accounts.length === 0) {
//         console.log("MetaMask is locked");
//       } else {
//         console.log("MetaMask is unlocked");
//       }
//     });
//     // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
//   }
// }
// // async function letstry() {
// //   if (window.ethereum) {
// //     window.web3 = new Web3("ethereum");
// //     try {
// //       // Request account access if needed
// //       await ethereum.enable();
// //       // Acccounts now exposed
// //       web3.eth.sendTransaction({
// //         /* ... */
// //       });
// //     } catch (error) {
// //       // User denied account access...
// //     }
// //   }
// // }

// // export default
// module.exports = web3;
