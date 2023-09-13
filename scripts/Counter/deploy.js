const { ethers, network } = require("hardhat")

const main = async () => {
  console.log("===== Start =====")

  const deployer = (await ethers.getSigners())[0]
  const contract = require("../../artifacts/contracts/Counter.sol/Counter.json")
  const factory = new ethers.ContractFactory(contract.abi, contract.bytecode, deployer);

  const instance = await factory.deploy(60)

  console.log(await instance.getAddress())

  console.log("===== End =====") 
}

main()

// sepolia: 0x3Bb895Fd1768E5dA868E28EfBAb4Db2E7e88E7a9
