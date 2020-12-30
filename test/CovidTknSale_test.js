var Token = artifacts.require("./CovidTkn.sol");
var TokenSale = artifacts.require("./CovidTknSale.sol");
var KycContract = artifacts.require("./KycContract.sol");

var chai = require("./setupChai.js");
var BN = web3.utils.BN;
var expect = chai.expect;

contract("TokenSale test", async (accounts) => {

  const [deployerAccount, recipientAccount, anotherAccount] = accounts;

  it("Should not have any tokens in my deployerAccount", async ()=> {
    var instance = await Token.deployed();
    //return is important in projects with lots of tests
    return expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(new BN(0));
  });

  it("All tokens should be in the tknSale smartcontract by default", async ()=> {
    var instance = await Token.deployed();
    var balanceOfTknSaleSC = await instance.balanceOf(TokenSale.address);
    var totalSupply = await instance.totalSupply();

    return expect(balanceOfTknSaleSC).to.be.a.bignumber.equal(totalSupply);
  });

  it("It should be possible to buy tokens", async ()=> {
    var instance = await Token.deployed();
    var tokenSaleInstance = await TokenSale.deployed();
    var KycInstance = await KycContract.deployed();
    var balanceBefore = await instance.balanceOf(deployerAccount);
    var totalSupply = await instance.totalSupply();
    await KycInstance.setKycCompleted(recipientAccount, {from: deployerAccount});

    expect(instance.balanceOf(recipientAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    expect(tokenSaleInstance.sendTransaction({from: recipientAccount, value: web3.utils.toWei("1","wei")})).to.be.fulfilled;
    return expect(instance.balanceOf(recipientAccount)).to.eventually.be.a.bignumber.equal(new BN(1));
  });
});
