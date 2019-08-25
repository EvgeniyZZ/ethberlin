const configJson = require("./config.json")
const abi = configJson["contractValidator"]["abi"];
const contractAddress = configJson["contractValidator"]["address"];

class ValidatorContract {
    constructor(web3) {
        this.web3 = web3;
        this.contract = new web3.eth.Contract(abi, contractAddress);
    }

    async validate(address owner, string filename) {
        let result = this.contract.methods.validate(owner, string filename);
        return result;
    }
}