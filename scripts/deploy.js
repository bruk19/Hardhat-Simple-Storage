const { ethers } = require("hardhat")

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploging contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  console.log(simpleStorage.target)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })