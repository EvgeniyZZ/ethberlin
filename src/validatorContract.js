const configJson = require('./config.json');
const abi = configJson['abi'];
const contractAddress = configJson['address'];

class ValidatorContract {
	constructor (web3) {
		this.web3 = web3;
		this.contract  = new web3.eth.Contract(abi, contractAddress);
	}

	async validate(address, fileName) {
	    console.log('aaaa');
		let result = await this.contract.methods.validate(address, fileName).call({gas: 100000000, gasPrice: 0});
		console.log('bbbb');
		return result;
	}
}

module.exports = ValidatorContract;