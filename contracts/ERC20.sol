//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// ERC20
// ERC721 - NFT

contract ERC20 {
    string public name;
    string public symbol;
    mapping(address => uint256) public balanceOf;
    uint256 public totalSupply;


    event Transfer(address from, address to, uint256 amount);

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    function mint(uint256 amount) public {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
    }

    function getBalance(address user) public view returns (uint256) {
        return balanceOf[user];
    }

    function transfer(address recipient, uint256 amount)
        external
        returns (bool)
    {
        require(balanceOf[msg.sender] >= amount, "INSUFFICIENT_FUNDS");
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function burn(uint256 amount) public {
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
    }
}
