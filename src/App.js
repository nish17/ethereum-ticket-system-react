import React, { Component } from "react";
import "./App.css";
import web3 from "./web3.js";
// import Web3 from "web3";
// import logo from "./logo.svg";
// import ganache from "ganache-cli";
import Route from "./Route.js";
import "semantic-ui-css/semantic.min.css";
import RouteCreator from "./RouteCreator.js";
import {
  Button,
  Icon,
  Input,
  Label,
  Form,
  Container,
  Header
} from "semantic-ui-react";
// const date = new Date();
class App extends Component {
  state = {
    manager: "",
    deployedroutes: [],
    routeid: "",
    stopcount: 0,
    description: "",
    inputdescription: "",
    buyticket: "",
    ticketprice: 0,
    ticketnumber: 0,
    value8: 0,
    value: 0,
    tripindex: 0,
    busstopname: "",
    arrivaltime: 0,
    message: ""
  };

  async componentDidMount() {
    const manager = await Route.methods.manager().call();
    const deployedroutes = await RouteCreator.methods
      .getDeployedRoutes()
      .call();
    // const balance = await web3.eth.get
    const NumberOfTrips = await Route.methods.getNumberOfTrips().call();
    const NumberOfTickets = await Route.methods.getNumberOfTickets().call();
    this.setState({ manager, deployedroutes, NumberOfTrips, NumberOfTickets });
  }

  onSubmit1 = async event => {
    event.preventDefault();
    let accounts = await web3.eth.getAccounts();
    console.log(accounts);
    // if (accounts === undefined) {
    //   web3 = new Web3(ganache.provider());
    //   console.log(accounts);
    //   accounts = await web3.eth.getAccounts();
    // }

    this.setState({ message: `Creating a new route...` });

    await RouteCreator.methods
      .createRoute(this.state.routeid, this.state.stopcount, [
        web3.utils.fromAscii(this.state.description)
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
      .createTrip(
        this.state.inputdescription,
        Math.round(new Date().getTime() / 1000)
      )
      .send({ from: accounts[0] });

    this.setState({ message: `New Trip created` });
  };

  onSubmit3 = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    let returnedValue;
    this.setState({ message: `Generating your ticket...` });
    const start_time = performance.now();
    await Route.methods
      .purchaseTicket(this.state.buyticket)
      .send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.ticketprice, "ether")
      })
      .then(s => {
        console.log(s);
        returnedValue = s.events.ValueLogger.returnValues.index;
      });
    const end_time = performance.now();
    this.setState({
      message: `Ticket Purchased, and your ticket number is ${returnedValue} and your tripID is ${
        this.state.NumberOfTrips
      }. \nIt took ${Math.floor((end_time - start_time) / 1000) %
        60} seconds to book the ticket`
    });
  };

  onSubmit4 = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: `Completing the Trip...` });

    await Route.methods.completeTrip(this.state.ticketnumber).send({
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

    await Route.methods.approveTrip(this.state.value8, this.state.value).send({
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
        this.state.tripindex,
        web3.utils.fromAscii(this.state.busstopname),
        this.state.arrivaltime
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
        <Container text>
          <Header as="h2">
            <Icon name="ethereum" />
            <Header.Content>Route Contract</Header.Content>
          </Header>
          <p>
            This contract is managed by
            {this.state.manager ? ` ${this.state.manager}` : " none"}.<br />{" "}
            There are currently {this.state.deployedroutes.length} routes
            deployed to the network.
          </p>
          <hr />
          <Form id="form1" name="routeForm" onSubmit={this.onSubmit1}>
            <Form.Field>
              <Label>Route ID:</Label>
              <input
                routeid={this.state.routeid}
                placeholder="int"
                onChange={event => {
                  this.setState({ routeid: event.target.value });
                }}
              />{" "}
            </Form.Field>
            <Form.Field>
              <Label>Count:</Label>
              <input
                stopcount={this.state.stopcount}
                placeholder="int"
                onChange={event => {
                  this.setState({ stopcount: event.target.value });
                }}
              />
            </Form.Field>
            <Form.Field>
              <Label>description:</Label>
              <input
                description={this.state.description}
                placeholder="string[]"
                onChange={event => {
                  this.setState({ description: event.target.value });
                }}
              />
            </Form.Field>
            <Button animated="fade" positive>
              <Button.Content visible>Submit</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </Form>
          <hr />
          <Header as="h4">Create Trip on the created routes</Header>
          <Header as="h4">Trips Registered: {this.state.NumberOfTrips}</Header>

          <Form id="form2" name="tripForm" onSubmit={this.onSubmit2}>
            <Form.Field>
              <Label>Input description about the trip:</Label>
              <input
                inputdescription={this.state.inputdescription}
                placeholder="string"
                onChange={event => {
                  this.setState({ inputdescription: event.target.value });
                }}
              />
              <br />
            </Form.Field>
            <Button animated="fade" positive>
              <Button.Content visible>Submit</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </Form>
          <br />

          <hr />
          <Header as="h4">Purchase Ticket</Header>
          <Header as="h4">
            Total tickets purchased: {this.state.NumberOfTickets}
          </Header>
          <Form
            id="purchase-form"
            name="purhcaseTicketForm"
            onSubmit={this.onSubmit3}
          >
            <Form.Field>
              <Label>Input description about the trip:</Label>
              <input
                buyticket={this.state.buyticket}
                placeholder="string"
                onChange={event => {
                  this.setState({ buyticket: event.target.value });
                }}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <Label>Price of the ticket:</Label>
              <Input placeholder="int">
                <input
                  ticketprice={this.state.ticketprice}
                  onChange={event => {
                    this.setState({ ticketprice: event.target.value });
                  }}
                />
              </Input>
              <Input LabelPosition="right" type="text" placeholder="Amount">
                <Label basic>ETH ⧫</Label>
                <Label>.00</Label>
              </Input>
            </Form.Field>
            <br />
            {/* </div> */}
            <Button animated="fade" positive>
              <Button.Content visible>Purchase Ticket</Button.Content>
              <Button.Content hidden>
                {this.state.ticketprice} ether
              </Button.Content>
            </Button>
            <br />
          </Form>

          <hr />
          <Header as="h4">Complete Trip</Header>
          <Form id="form4" name="completeTripForm" onSubmit={this.onSubmit4}>
            <Form.Field>
              <Label>Input ticket Number:</Label>
              <input
                ticketnumber={this.state.ticketnumber}
                placeholder="int"
                onChange={event => {
                  this.setState({ ticketnumber: event.target.value });
                }}
              />
            </Form.Field>
            <br />
            <Button animated="fade" positive>
              <Button.Content visible>Submit</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
            <br />
          </Form>
          <hr />
          <Header as="h4">Approve Trip</Header>
          <Form id="form5" name="ApproveTripForm" onSubmit={this.onSubmit5}>
            <Form.Field>
              <Label>Input tripID:</Label>
              <input
                value8={this.state.value8}
                placeholder="int"
                onChange={event => {
                  this.setState({ value8: event.target.value });
                }}
              />
            </Form.Field>
            <br />
            <Label>Input Ticket Number:</Label>
            <input
              value={this.state.value}
              placeholder="int"
              onChange={event => {
                this.setState({ value: event.target.value });
              }}
            />
            <br />
            <Button animated="fade" positive>
              <Button.Content visible>Submit</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
            <br />
          </Form>

          <hr />
          <Header as="h4">Arrival at the stop</Header>
          <Form id="form6" name="ArrivalForm" onSubmit={this.onSubmit6}>
            <Form.Field>
              <Label>Input tripID:</Label>
              <input
                tripindex={this.state.tripindex}
                placeholder="int"
                onChange={event => {
                  this.setState({ tripindex: event.target.value });
                }}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <Label>Bus Stop Name:</Label>
              <input
                busstopname={this.state.busstopname}
                placeholder="string"
                onChange={event => {
                  this.setState({ busstopname: event.target.value });
                }}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <Label>Arrival Time:</Label>
              <input
                arrivaltime={this.state.arrivaltime}
                placeholder="int"
                onChange={event => {
                  this.setState({ arrivaltime: event.target.value });
                }}
              />
            </Form.Field>
            <br />
            <Button animated="fade" positive>
              <Button.Content visible>Submit</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
            <br />
          </Form>

          <hr />
          <h3>{this.state.message}</h3>
        </Container>
      </div>
    );
  }
}

export default App;
