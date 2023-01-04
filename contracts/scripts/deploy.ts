import { ethers } from "hardhat";

const deploy = async () => {
	const [deployer] = await ethers.getSigners();

	console.log(`Cuenta que desplegara el contrato: ${deployer.address}`);

	const Kirbank = await ethers.getContractFactory("KirbankToken");
	const deployed = await Kirbank.deploy();

	console.log(`SmartContract desplegado en: ${deployed.address}`);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy().catch((error) => {
	console.error("Ha ocurrido un error!", error);
	process.exitCode = 1;
});
