import React, { Component } from "react";
import "./App.css";
import web3 from "./web3.js";
// import logo from "./logo.svg";
import Route from "./Route.js";
import RouteCreator from "./RouteCreator.js";
// const date = new Date();
class App extends Component {
  state = {
    manager: "",
    DeployedRoutes: [],
    value1: "",
    value2: 0,
    value3: "",
    value4: "",
    value5: "",
    value6: 0,
    message: ""
  };

  async componentDidMount() {
    const manager = await Route.methods.manager().call();
    const DeployedRoutes = await RouteCreator.methods
      .getDeployedRoutes()
      .call();
    // const balance = await web3.eth.get
    this.setState({ manager, DeployedRoutes });
  }

  onSubmit1 = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    this.setState({ message: `Creating a new route...` });

    await RouteCreator.methods
      .createRoute(this.state.value1, this.state.value2, [
        web3.utils.fromAscii(this.state.value3)
      ])
      .send({
        from: accounts[0]
      });

    this.setState({ message: "New Route created successfully!" });
  };

  onSubmit2 = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: `Creating a new trip...` });

    await Route.methods
      .createTrip(this.state.value4, Math.round(new Date().getTime() / 1000))
      .send({ from: accounts[0] });

    this.setState({ message: `New Trip created` });
  };

  onSubmit3 = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    let returnedValue;
    this.setState({ message: `Generating your ticket...` });

    await Route.methods
      .purchaseTicket(this.state.value5)
      .send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value6, "ether")
      })
      .then(s => {
        console.log(s);
        returnedValue = s.events.ValueLogger.returnValues.index;
      });

    this.setState({
      message: `Ticket Purchased, and your ticket number is ${returnedValue}.`
    });
  };

  // getValueLogger() {
  //   // const accounts = web3.eth.getAccounts();
  //   const routeContract = new web3.eth.Contract([
  //     {
  //       constant: true,
  //       inputs: [],
  //       name: "routeID",
  //       outputs: [{ name: "", type: "string" }],
  //       payable: false,
  //       stateMutability: "view",
  //       type: "function"
  //     },
  //     {
  //       constant: false,
  //       inputs: [
  //         { name: "description", type: "string" },
  //         { name: "dateTime", type: "uint256" }
  //       ],
  //       name: "createTrip",
  //       outputs: [],
  //       payable: false,
  //       stateMutability: "nonpayable",
  //       type: "function"
  //     },
  //     {
  //       constant: true,
  //       inputs: [],
  //       name: "manager",
  //       outputs: [{ name: "", type: "address" }],
  //       payable: false,
  //       stateMutability: "view",
  //       type: "function"
  //     },
  //     {
  //       constant: true,
  //       inputs: [{ name: "", type: "uint256" }],
  //       name: "tickets",
  //       outputs: [
  //         { name: "travelDescription", type: "string" },
  //         { name: "amount", type: "uint256" },
  //         { name: "isUsed", type: "bool" }
  //       ],
  //       payable: false,
  //       stateMutability: "view",
  //       type: "function"
  //     },
  //     {
  //       constant: true,
  //       inputs: [],
  //       name: "busStopCount",
  //       outputs: [{ name: "", type: "uint256" }],
  //       payable: false,
  //       stateMutability: "view",
  //       type: "function"
  //     },
  //     {
  //       constant: false,
  //       inputs: [{ name: "description", type: "string" }],
  //       name: "purchaseTicket",
  //       outputs: [{ name: "", type: "uint256" }],
  //       payable: true,
  //       stateMutability: "payable",
  //       type: "function"
  //     },
  //     {
  //       constant: false,
  //       inputs: [{ name: "index", type: "uint256" }],
  //       name: "completeTrip",
  //       outputs: [],
  //       payable: false,
  //       stateMutability: "nonpayable",
  //       type: "function"
  //     },
  //     {
  //       constant: false,
  //       inputs: [
  //         { name: "tripIndex", type: "uint256" },
  //         { name: "ticketIndex", type: "uint256" }
  //       ],
  //       name: "approveTrip",
  //       outputs: [],
  //       payable: false,
  //       stateMutability: "nonpayable",
  //       type: "function"
  //     },
  //     {
  //       constant: true,
  //       inputs: [{ name: "", type: "uint256" }],
  //       name: "routeDescription",
  //       outputs: [{ name: "", type: "bytes32" }],
  //       payable: false,
  //       stateMutability: "view",
  //       type: "function"
  //     },
  //     {
  //       constant: true,
  //       inputs: [{ name: "", type: "uint256" }],
  //       name: "trips",
  //       outputs: [
  //         { name: "tripDescription", type: "string" },
  //         { name: "startDateTime", type: "uint256" },
  //         { name: "amount", type: "uint256" },
  //         { name: "approversCount", type: "uint256" },
  //         { name: "isComplete", type: "bool" },
  //         { name: "reportedArrivalTimes", type: "uint256" }
  //       ],
  //       payable: false,
  //       stateMutability: "view",
  //       type: "function"
  //     },
  //     {
  //       constant: false,
  //       inputs: [
  //         { name: "tripIndex", type: "uint256" },
  //         { name: "busStop", type: "bytes32" },
  //         { name: "arrivalTime", type: "uint256" }
  //       ],
  //       name: "arrival",
  //       outputs: [],
  //       payable: false,
  //       stateMutability: "nonpayable",
  //       type: "function"
  //     },
  //     {
  //       inputs: [
  //         { name: "creator", type: "address" },
  //         { name: "route", type: "string" },
  //         { name: "count", type: "uint256" },
  //         { name: "description", type: "bytes32[]" }
  //       ],
  //       payable: false,
  //       stateMutability: "nonpayable",
  //       type: "constructor"
  //     },
  //     {
  //       anonymous: false,
  //       inputs: [{ indexed: false, name: "index", type: "uint256" }],
  //       name: "ValueLogger",
  //       type: "event"
  //     }
  //   ]);
  //   const routeCo = routeContract.at(
  //     "0x2fCA6db231a8912cF3E852CE493aa86CCFa4cA42"
  //   );
  //   const valueEvent = routeCo.ValueLogger;
  //   console.log(Route);
  //   valueEvent.watch((error, result) => {
  //     console.log(result.args.index);
  //   });
  // }

  render() {
    return (
      <div>
        <h2>Route Contract</h2>
        <p>
          This contract is managed by {this.state.manager}.<br /> There are
          currently {this.state.DeployedRoutes.length} routes deployed to the
          network.
        </p>
        <hr />

        <form onSubmit={this.onSubmit1}>
          <h4>Create Route</h4>
          <div>
            <label>Route ID:</label>
            <input
              value1={this.state.value1}
              placeholder="int"
              onChange={event => {
                this.setState({ value1: event.target.value });
              }}
            />
            <label>Count:</label>
            <input
              value2={this.state.value2}
              placeholder="int"
              onChange={event => {
                this.setState({ value2: event.target.value });
              }}
            />
            <label>Description:</label>
            <input
              value3={this.state.value3}
              placeholder="string[]"
              onChange={event => {
                this.setState({ value3: event.target.value });
              }}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h4>Create Trip on the created routes</h4>
        <form onSubmit={this.onSubmit2}>
          <div>
            <label>Input Description about the trip:</label>
            <input
              value4={this.state.value4}
              placeholder="string"
              onChange={event => {
                this.setState({ value4: event.target.value });
              }}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />
        <h4>Purchase Ticket</h4>
        <form onSubmit={this.onSubmit3}>
          <div>
            <label>Input Description about the trip:</label>
            <input
              value5={this.state.value5}
              placeholder="string"
              onChange={event => {
                this.setState({ value5: event.target.value });
              }}
            />
            <label>Price of the ticket:</label>
            <input
              value6={this.state.value6}
              placeholder="int"
              onChange={event => {
                this.setState({ value6: event.target.value });
              }}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />
        <h3>{this.state.message}</h3>
      </div>
    );
  }
}

export default App;
