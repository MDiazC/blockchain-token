import React, { Component } from "react";
import CovidTkn from "./contracts/CovidTkn.json";
import CovidTknSale from "./contracts/CovidTknSale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false, kycAdress: "0x123...." , CovidTknSaleAddress: null, userTokens:0};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      this.CovidTknInstance = new this.web3.eth.Contract(
        CovidTkn.abi,
        CovidTkn.networks[this.networkId] && CovidTkn.networks[this.networkId].address,
      );

      this.CovidTknSaleInstance = new this.web3.eth.Contract(
        CovidTknSale.abi,
        CovidTknSale.networks[this.networkId] && CovidTknSale.networks[this.networkId].address,
      );

      this.KycContractInstance = new this.web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      console.log("KycContractInstance = new web3.eth.Contract("+JSON.stringify(KycContract.abi)+", '0x73B38BD9a5e82f170B5d62959fB3D1339A55EeDa')");
      this.listenToTokenTransfer();
      this.setState({ loaded: true, CovidTknSaleAddress: CovidTknSale.networks[this.networkId].address }, this.updateUserTokens);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    var target = event.target;
    var value = (target.type === 'checkbox')?target.checked:target.value;

    var name = target.name;
    this.setState({ [name]: value })
  }

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  handleKycWhitelisting = async () =>{
    await this.KycContractInstance.methods.setKycCompleted(this.state.kycAdress).send({from: this.accounts[0]});
    alert("Address "+this.state.kycAdress+" added to whitelist");
  }

  handleAddTokens = async () =>{
    await this.CovidTknSaleInstance.methods.buyTokens(this.accounts[0]).send({from: this.accounts[0], value: this.web3.utils.toWei("1", "Wei") })
  }

  updateUserTokens = async () => {
    var userToken = await this.CovidTknInstance.methods.balanceOf(this.accounts[0]).call();
    this.setState({ userTokens: userToken })
  };

  listenToTokenTransfer = () => {
    this.CovidTknInstance.events.Transfer({to: this.accounts[0]}).on("data", this.updateUserTokens);
  };

  render() {

    return (
      <div className="App">
        <h1>CovidTkn Sale</h1>
        <p>Get more tokens today.</p>
        <h2>Kyc whitelisting</h2>
        <span>Adress to allow: <input type="text" name="kycAdress" value={this.state.kycAdress} onChange={this.handleInputChange}/></span>
        <button type="button" name="addWhitelist" onClick={this.handleKycWhitelisting}>Add to White list</button>
        <h2>Buy tokens</h2>
        <p> If you want to buy tokens send Wei to this address: {this.state.CovidTknSaleAddress}</p>
        <h2>Token balance</h2>
        <p>Currently you have {this.state.userTokens} CVT Tokens</p>
        <button type="button" name="addTokens" onClick={this.handleAddTokens}>Add 1 Token</button>
      </div>
    );
  }
}

export default App;
