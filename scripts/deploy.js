const hre = require("hardhat");

const name = "nFactorial Incubator";
const symbol = "N22R";

async function main() {

  // We get the contract to deploy
  const ERC20Factory = await hre.ethers.getContractFactory("ERC20");
  const erc20 = await ERC20Factory.deploy(name, symbol);

  await erc20.deployed();

  const nameERC = await erc20.name();
  const symbolERC = await erc20.symbol();


  console.log(`Name: ${nameERC}`);
  console.log(`Symbol: ${symbolERC}`);


  
  console.log("ERC20 deployed to:", erc20.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
