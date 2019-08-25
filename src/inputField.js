import React from 'react';
import { TextField } from '@rmwc/textfield';

class InputField extends React.Component {


  render(){
      return (
            <TextField label={this.props.placeholder} value={this.props.address} onChange={(num) => this.props.updateAddress(num.target.value)} />
      );

  }

}

export default InputField;
