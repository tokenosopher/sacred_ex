const { expect } = require("chai");


function weiFromEther(amount) {
    return ethers.utils.parseUnits(amount)
}


describe("Token", () => {
    let owner;
    let token;

    const initialSupply = weiFromEther("100")

    before(async () => {
        [owner] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy("Test Token", "TKN", initialSupply);
        await token.deployed();
    });

    it("sets name and symbol when created", async () => {
        expect(await token.name()).to.equal("Test Token");
        expect(await token.symbol()).to.equal("TKN");
    });

    it("mints initialSupply to msg.sender when created", async () => {
        expect(await token.totalSupply()).to.equal(initialSupply);
        expect(await token.balanceOf(owner.address)).to.equal(initialSupply);
    });
});


