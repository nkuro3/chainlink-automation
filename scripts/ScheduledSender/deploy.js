const { ethers, network } = require("hardhat")

const main = async () => {
  console.log("===== Start =====")

  const deployer = (await ethers.getSigners())[0]
  const contract = require("../../artifacts/contracts/ScheduledSender.sol/ScheduledSender.json")
  const factory = new ethers.ContractFactory(contract.abi, contract.bytecode, deployer);

  const receiver = "0x1553041E2c13741324514b0aE7690C1a960d9a6f"
  const instance = await factory.deploy(receiver)

  console.log(await instance.getAddress())

  console.log("===== End =====") 
}

main()

// sepolia: 0xAdEB0E5cd219CdE9002782D21D6cD99e1C7b67ea
