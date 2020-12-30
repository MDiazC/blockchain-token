var MyToken = artifacts.require("./CovidTkn.sol");
var MyTokenSale = artifacts.require("./CovidTknSale.sol");
var MyKycContract = artifacts.require("./KycContract.sol");
require("dotenv").config({path: "../.env"});

module.exports = async function(deployer) {
  const accounts = await web3.eth.getAccounts();
	const owner = accounts[0];

  await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
  await deployer.deploy(MyKycContract);
  await deployer.deploy(MyTokenSale, 1, owner, MyToken.address, MyKycContract.address);
  var instance = await MyToken.deployed();
  await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
};
