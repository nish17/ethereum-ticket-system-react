# ethereum-ticket-system-react

## to view locally run this command into your terminal `npm run start`

## Steps after coding the smart contract

### first deploy your smart contract to the rinkeby test network

### get the address of the smart contract where it was deployed

### compile the smart contract and copy ABI and interface. Paste it in your UI project directory by creating a new file with same name as the name of the contract.

### also paste the address of that smart contract in that file.

### now type the following command in the same file at the end `export default new web3.eth.Contract(ABI_of_the_contract, address_of_deployed_contract);`

### For STRESS TESTING:

#### Run `ganache-cli -a 1000` in the terminal for gettings 1000 distinct accounts with ~100 ether.

#### In the new window of the terminal run `truffle test/test.js` it will automatically use the accounts from ganache and run all the tests.
