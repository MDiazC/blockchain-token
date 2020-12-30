var Token = artifacts.require("./CovidTkn.sol");

var chai = require("./setupChai.js");
var BN = web3.utils.BN;
var expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("Token test", async (accounts) => {

  const [deployerAccount, recipientAccount, anotherAccount] = accounts;

  beforeEach( async () => {
    this.tokenInstance = await Token.new(process.env.INITIAL_TOKENS);
  });

  it("all tokens should be in my account", async ()=> {
    var instance = this.tokenInstance;
    var totalSupply = await instance.totalSupply();

    //old version
    // var balance = await instance.balanceOf(accounts[0]);
    // assert.equals(balance.valueOf(), initialSupply.valueOf(), "The balance is not  the same");

    //using chai-bn
    expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(totalSupply);

    //using chai-as-promised
    //return is important in projects with lots of tests
    return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it("possible to send tokens between accounts", async ()=> {
    var sendTokens = 1;
    var instance = this.tokenInstance;
    var totalSupply = await instance.totalSupply();


    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    expect(instance.balanceOf(recipientAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    expect(instance.transfer(recipientAccount, sendTokens)).to.eventually.be.fulfilled;
    expect(instance.balanceOf(recipientAccount)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    //return is important in projects with lots of tests
    return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
  });

  it("not possible to send tokens than available", async ()=> {
    var instance = this.tokenInstance;
    var balanceDeployer = await instance.balanceOf(deployerAccount);

    expect(instance.transfer(recipientAccount, new BN(balanceDeployer+1))).to.eventually.be.rejected;
    //return is important in projects with lots of tests
    return expect(instance.balanceOf(deployerAccount)).to.be.eventually.be.bignumber.equal(balanceDeployer);
  });

});
