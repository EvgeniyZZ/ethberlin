const configJson = require('./config.json');
const abi = configJson['Validator']['abi'];
const contractAddress = configJson['Validator']['address'];

class ValidatorContract {
	constructor (web3) {
		this.web3 = web3;
		this.contract  = new web3.eth.Contract(abi, contractAddress);
	}

	async validate(address, fileName) {
		let result = this.contract.methods.validate(address, fileName);
		return result;
	}
}
