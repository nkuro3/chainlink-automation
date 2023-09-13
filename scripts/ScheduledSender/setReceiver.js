const { ethers, network } = require("hardhat")

const address = "0x636C27F008d4D3453b3CBf84f40004C5fD0164f8";

const main = async () => {
  console.log("===== Start =====")

  const deployer = (await ethers.getSigners())[0]
  const abi = require("../../artifacts/contracts/ScheduledSender.sol/ScheduledSender.json").abi

  const contract = new ethers.Contract(address, abi, deployer);
  console.log("Before:")
  console.log(await contract.receiver())
  
  const tx = await contract.setReceiver(deployer.address, { gasLimit: 1000000 });
  await tx.wait();

  console.log("After:")
  console.log(await contract.receiver())

  console.log("===== End =====") 
}

main()

// sepolia: 0x636C27F008d4D3453b3CBf84f40004C5fD0164f8
