import hre from "hardhat";

// Ethereum
const PoolAddressesProvider_Aave = '0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e';

async function main() {
  const fixedStakeRate = await hre.viem.deployContract("FixedStakeRate", [PoolAddressesProvider_Aave]);

  console.log(`FixedStakeRate contract deployed: ${fixedStakeRate.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
