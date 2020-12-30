Tokenization project.

This project we developped with:
- Truffle v5.1.21 (core: 5.1.21)
- Solidity - v0.6.2 (solc-js)
- Node v11.15.0
- Web3.js v1.2.1
- Ganache v2.5.4
- Truffle React box
- chai v4.2.0
- chai-bn v0.2.1
- chai-as-promised v7.1.1
- dotenv v8.2.0
- truffle/hdwallet-provider v1.2.1

The goal of this project was to mock up a token. The project is divided in three contracts.
- CovidTkn.sol That manages the tokens using standard ERC20. 
- CovidTknSale.sol and Crowdsale.sol That manages the purchase of tokens.
- KycContract.sol  It's a way to whitelist addresses in order to allow them to buy tokens. This contract inherit the oppenzeppelin contract Ownable.sol to prevent that only the owner of contract can whitelist addresses.

The contracts are deployed in Göerli network, the addresses are:
- CovidTkn: 0xcc7193eA44b88Fc93A8Ec527d8Cf992F1dA55823
- KycContract: 0x73B38BD9a5e82f170B5d62959fB3D1339A55EeDa
- CovidTknSale: 0x45b4aB3c98Ea98827DbE18f1666d6C4E797c7EDd

However only the deployer address can whitelist addresses in order to buy tokens.
Also this prodject uses dotenv to store sensible variales like infure tokens and the mnemonic to import metamask addresses

The project is developped with the Truffle React box so there is a frontend where you can interact with the smartontract.

