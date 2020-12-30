pragma solidity >=0.6.0;

// contract version v3.0.0-beta-0
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract CovidTkn is ERC20, ERC20Detailed {
    constructor(uint256 initialSupply) ERC20Detailed("Covid Token", "CVT", 0)  public {
        _mint(msg.sender, initialSupply);
        //_setupDecimals(0);
    }
}
