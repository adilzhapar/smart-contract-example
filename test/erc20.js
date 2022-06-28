const chai = require("chai");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const { solidity } = require("ethereum-waffle"); 

chai.use(solidity);

const name = "nFactorial Incubator";
const symbol = "N22R";


describe("ERC20", function () {
  let erc20;
  let alice, bob;

  before(async () => {
    const ERC20Factory = await hre.ethers.getContractFactory("ERC20");
    erc20 = await ERC20Factory.deploy(name, symbol);
    await erc20.deployed();

    const signers = await ethers.getSigners();
    alice = signers[0];
    bob = signers[1];
  });

  it("Bob sends 50 tokens but he doesn't have them", async () => {
    await expect(erc20.connect(bob).transfer(alice.address, 50))
    .to.be.revertedWith("INSUFFICIENT_FUNDS");
  });

  it("Bob mints 100 tokens", async () => {
    await erc20.connect(bob).mint(100);
    const bobBalance = await erc20.getBalance(bob.address);
    // console.log("bobBalance:", bobBalance);
    expect(bobBalance).to.eq(100);
  }); 


  it("Alice sends 10 tokens to Bob", async () => {
    await erc20.connect(alice).mint(100);
    await erc20.connect(alice).transfer(bob.address, 10);
    const bobBalance = await erc20.getBalance(bob.address);
    const aliceBalance = await erc20.getBalance(alice.address);
    console.log("aliceBalance:", aliceBalance);
    console.log("bobBalance:", bobBalance);
    // expect(bobBalance).to.eq(100);
  }); 

});
