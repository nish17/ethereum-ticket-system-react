const path = require("path");
const fs = require("fs");
const solc = require("solc");

const Route = path.resolve(__dirname, "", "Route.sol");
const source = fs.readFileSync(Route, "utf-8");
// console.log(solc.compile(source, 2));
module.exports = {
  route: solc.compile(source, 2).contracts[":Route"],
  routeCreator: solc.compile(source, 2).contracts[":RouteCreator"]
};
