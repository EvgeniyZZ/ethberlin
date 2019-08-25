import React from 'react';
import './App.css';
import 'material-components-web/dist/material-components-web.min.css';
import '@material/button/dist/mdc.button.css';

import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import Web3 from 'web3';

import InputField from './inputField.js';

const Filestorage = require('@skalenetwork/filestorage.js/src/index');
require('dotenv').config();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        addressFrom: '',
        addressTo: '',
        uploadedImage: '',
        result: '',
        Amount: ''

    }
    this.updateAddressFrom = this.updateAddressFrom.bind(this);
    this.updateAddressTo = this.updateAddressTo.bind(this);
    this.upload = this.upload.bind(this);
    this.getResult = this.getResult.bind(this);

  };


   updateAddressFrom(address){
    this.setState({'addressFrom': address});
   }


   updateAddressTo(address){
    this.setState({'addressTo': address});
   }



   getResult(){
    this.setState({'result': this.state.addressFrom + "->" + this.state.addressTo});
   }


   async upload(event){
      event.preventDefault();
      //create web3 connection
      const web3Provider = new Web3.providers.HttpProvider(
//      "http://ethberlin01.skalenodes.com:10145"
        "http://165.22.64.233:2234"
      );
      let web3 = new Web3(web3Provider);

      //get filestorage instance
      let filestorage = new Filestorage(web3Provider, true);

      //provide your account & private key
      //note this must include the 0x prefix
      let privateKey = '5B879CA653D3C015637C4614C411BE4865B7F3AC0853C55259733DD1EF33C396';
      let account = "0x8424e7f510753dc4123F427E436c324B3786f0Ab";

      //get file data from file upload input field
      let file = document.getElementById('files').files[0];
      let reader = new FileReader();

      //file storage method to upload file
      let self = this;
      reader.onload = async function(e) {

        console.log(reader.result);

        const arrayBuffer = reader.result;
            const bytes = new Uint8Array(arrayBuffer);

           let conv = btoa(String.fromCharCode.apply(null, bytes));
        self.setState({uploadedImage:  "data:image/png;base64,"+conv})
        const bytes1 = new Uint8Array(arrayBuffer);
        let link = await filestorage.uploadFile(
          account,
          file.name,
          bytes1,
          privateKey
       );
       console.log(link);
       let validate_result = contractValidator.validate();
      };
      reader.readAsArrayBuffer(file);
    }



  render(){

      return (
        <div className="App">
          <header className="App-header">

            <InputField address={this.state.addressFrom} updateAddress={this.updateAddressFrom} placeholder='Enter address from' />
            <InputField address={this.state.addressTo} updateAddress={this.updateAddressTo}  placeholder='Enter address to'  />


            <input onChange={(e) => this.upload(e)}
                type="file" id="files" / >


            <Button label="Send" onClick={this.getResult} raised />

            <p>
                addressFrom: {this.state.addressFrom}
            </p>


            <p>
                addressTo: {this.state.addressTo}
            </p>


            <img id="ItemPreview" style={{maxWidth: "200px"}} src={this.state.uploadedImage} />

            <h2>
                Result: {this.state.result}
            </h2>

          </header>
        </div>
      );

  }

}

export default App;
