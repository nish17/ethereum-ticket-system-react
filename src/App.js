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
    this.setState({ message: `Generating your ticket...` });

    await Route.methods
      .purchaseTicket(this.state.value5)
      .send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value6, "ether")
      })
      .then(s => {
        console.log("s=%d", s);
      });

    this.setState({ message: `Ticket Purchased` });
  };

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
