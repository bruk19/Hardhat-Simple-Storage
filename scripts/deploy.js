const { ethers, run, network } = require("hardhat")

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploging contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  console.log(simpleStorage.target)
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deploymentTransaction().wait(6)
    await verify(simpleStorage.target, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`Current Value is: ${currentValue}`)

  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse().wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated Value is: ${updatedValue}`)
}

async function verify(contractAddress, args) {
  console.log("verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })