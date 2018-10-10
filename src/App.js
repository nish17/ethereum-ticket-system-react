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
    RouteID: "",
    stopCount: 0,
    Description: "",
    value4: "",
    value5: "",
    value6: 0,
    value7: 0,
    value8: 0,
    value9: 0,
    tripIndex: 0,
    busStopName: "",
    arrivalTime: 0,
    message: ""
  };

  async componentDidMount() {
    const manager = await Route.methods.manager().call();
    const DeployedRoutes = await RouteCreator.methods
      .getDeployedRoutes()
      .call();
    // const balance = await web3.eth.get
    const NumberOfTrips = await Route.methods.getNumberOfTrips().call();
    const NumberOfTickets = await Route.methods.getNumberOfTickets().call();
    this.setState({ manager, DeployedRoutes, NumberOfTrips, NumberOfTickets });
  }

  onSubmit1 = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    this.setState({ message: `Creating a new route...` });

    await RouteCreator.methods
      .createRoute(this.state.RouteID, this.state.stopCount, [
        web3.utils.fromAscii(this.state.Description)
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
      message: `Ticket Purchased, and your ticket number is ${returnedValue} and your tripID is ${
        this.state.NumberOfTrips
      }.`
    });
  };

  onSubmit4 = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: `Completing the ticket...` });

    await Route.methods.completeTrip(this.state.value7).send({
      from: accounts[0]
    });

    this.setState({
      message: `Trip Completed!`
    });
  };

  onSubmit5 = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: `Approving your ticket...` });

    await Route.methods.approveTrip(this.state.value8, this.state.value9).send({
      from: accounts[0]
    });

    this.setState({
      message: `Trip Approved`
    });
  };

  onSubmit6 = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: `Arrival request` });

    await Route.methods
      .arrival(
        this.state.tripIndex,
        web3.utils.fromAscii(this.state.busStopName),
        this.state.arrivalTime
      )
      .send({
        from: accounts[0]
      });

    this.setState({
      message: `Noted! Thanks for travelling with us.`
    });
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
              RouteID={this.state.RouteID}
              placeholder="int"
              onChange={event => {
                this.setState({ RouteID: event.target.value });
              }}
            />
            <br />
            <label>Count:</label>
            <input
              stopCount={this.state.stopCount}
              placeholder="int"
              onChange={event => {
                this.setState({ stopCount: event.target.value });
              }}
            />
            <br />
            <label>Description:</label>
            <input
              Description={this.state.Description}
              placeholder="string[]"
              onChange={event => {
                this.setState({ Description: event.target.value });
              }}
            />
            <br />
          </div>
          <button>Enter</button>
          <br />
        </form>
        <hr />
        <h4>Create Trip on the created routes</h4>
        <p>Trips Registered: {this.state.NumberOfTrips}</p>
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
            <br />
          </div>
          <button>Enter</button>
          <br />
        </form>

        <hr />
        <h4>Purchase Ticket</h4>
        <p>Total tickets purchased: {this.state.NumberOfTickets}</p>
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
            <br />
            <label>Price of the ticket:</label>
            <input
              value6={this.state.value6}
              placeholder="int"
              onChange={event => {
                this.setState({ value6: event.target.value });
              }}
            />
            <br />
          </div>
          <button>Enter</button>
          <br />
        </form>

        <hr />
        <h4>Complete Trip</h4>
        <form onSubmit={this.onSubmit4}>
          <div>
            <label>Input ticket Number:</label>
            <input
              value7={this.state.value7}
              placeholder="int"
              onChange={event => {
                this.setState({ value7: event.target.value });
              }}
            />
            <br />
          </div>
          <button>Enter</button>
          <br />
        </form>

        <hr />
        <h4>Approve Trip</h4>
        <form onSubmit={this.onSubmit5}>
          <div>
            <label>Input tripID:</label>
            <input
              value8={this.state.value8}
              placeholder="int"
              onChange={event => {
                this.setState({ value8: event.target.value });
              }}
            />
            <br />
            <label>Input Ticket Number:</label>
            <input
              value9={this.state.value9}
              placeholder="int"
              onChange={event => {
                this.setState({ value9: event.target.value });
              }}
            />
            <br />
          </div>
          <button>Enter</button>
          <br />
        </form>

        <hr />
        <h4>Arrival at the stop</h4>
        <form onSubmit={this.onSubmit6}>
          <div>
            <label>Input tripID:</label>
            <input
              tripIndex={this.state.tripIndex}
              placeholder="int"
              onChange={event => {
                this.setState({ tripIndex: event.target.value });
              }}
            />
            <br />
            <label>Bus Stop Name:</label>
            <input
              busStopName={this.state.busStopName}
              placeholder="int"
              onChange={event => {
                this.setState({ busStopName: event.target.value });
              }}
            />
            <br />
            <label>Arrival Time:</label>
            <input
              arrivalTime={this.state.arrivalTime}
              placeholder="int"
              onChange={event => {
                this.setState({ arrivalTime: event.target.value });
              }}
            />
            <br />
          </div>
          <button>Enter</button>
          <br />
        </form>

        <hr />
        <h3>{this.state.message}</h3>
      </div>
    );
  }
}

export default App;
