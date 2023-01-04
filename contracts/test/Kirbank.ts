import { ethers } from "hardhat";
const { expect } = require("chai");

describe("Kirbank Contract", () => {
	const setup = async () => {
		const [owner] = await ethers.getSigners();
		const Kibank = await ethers.getContractFactory("KirbankToken");
		const deployed = await Kibank.deploy();

		return {
			owner,
			deployed
		};
	};

	describe("Deployment", () => {
		it("Deploy del contract", async () => {
			const { deployed } = await setup();
			console.log("Desplegado en:", deployed.address);
		});
	});

	describe("Minting", () => {
		it("Minting a new token", async () => {
			const { owner, deployed } = await setup();

			await deployed.mint();

			const ownerOfMinted = await deployed.ownerOf(0);
			console.log("Owner ofminted:", ownerOfMinted);
			expect(ownerOfMinted).to.equal(owner.address);
		});
	});

	describe("TokenURI", () => {
		it("Retorna metadata valida", async () => {
			const { deployed } = await setup();

			await deployed.mint();

			const tokenURI = await deployed.tokenURI(0);
			const stringifiedTokenURI = await tokenURI.toString();
			const [, base64JSON] = stringifiedTokenURI.split("data:application/json;base64,");
			// Convertir de base64 a json
			const stringifiedMetadata = await Buffer.from(base64JSON, "base64").toString("ascii");
			const metadata = JSON.parse(stringifiedMetadata);
			console.log("Metadata:", metadata);
			expect(metadata).to.have.all.keys("name", "description", "image");
		});
	});
});
