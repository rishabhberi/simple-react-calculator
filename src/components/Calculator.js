import React, {Component} from 'react';
import Button from './Button';
import Display from './Display';

const initialState = {
  operand1: 0,
  operator: null,
  operand2: null
}

class Calculator extends Component {

  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {...initialState};
  }

  handleButtonClick = (e) => {

    const operand1 = this.state.operand1;
    const operator = this.state.operator;
    const operand2 = this.state.operand2;
    const value = e.target.textContent;

    let calculateResult = () => {
      switch(operator) {
        case "+": return operand1 + operand2;
        case "-": return operand1 - operand2;
        case "*": return operand1 * operand2;
        case "/": if(operand2 !== 0) return operand1 / operand2;
                  else return NaN;
      }
    }

    switch(e.target.getAttribute("type")) {
      case "number": {
        let numberValue= parseInt(value);
        if(operator === null) {
          this.setState({
            operand1: operand1*10 + numberValue
          });
        } else {
          this.setState({
            operand2: operand2===null ? numberValue : operand2*10 + numberValue
          });
        }
        break;
      }

      case "operator": {
        if(operand2 !== null) {
          this.setState({
            ...initialState,
            operand1: calculateResult()
          });
        }
        this.setState({
          operator: value
        });
        break;
      }

      case "clear": this.setState({
        ...initialState
      });
      break;

      case "equal": {
        if(operand2 !== null && operator !== null) {
          this.setState({
            ...initialState,
            operand1: calculateResult()
          });
        }
        break;
      }
    }
  }

  render () {
    return (
      <div className="calculator-grid">
        <Display value={isNaN(this.state.operand1)?"Error":this.state.operand1} />
        <Button value="1" type="number" handleButtonClick={this.handleButtonClick} />
        <Button value="2" type="number" handleButtonClick={this.handleButtonClick} />
        <Button value="3" type="number" handleButtonClick={this.handleButtonClick} />
        <Button value="+" type="operator" handleButtonClick={this.handleButtonClick} />
        <Button value="4" type="number" handleButtonClick={this.handleButtonClick} />
        <Button value="5" type="number" handleButtonClick={this.handleButtonClick} />
        <Button value="6" type="number" handleButtonClick={this.handleButtonClick} />
        <Button value="-" type="operator" handleButtonClick={this.handleButtonClick} />
        <Button value="7" type="number" handleButtonClick={this.handleButtonClick} />
        <Button value="8" type="number" handleButtonClick={this.handleButtonClick} />
        <Button value="9" type="number" handleButtonClick={this.handleButtonClick} />
        <Button value="*" type="operator" handleButtonClick={this.handleButtonClick} />
        <Button value="C" type="clear" handleButtonClick={this.handleButtonClick} />
        <Button value="0" type="number" handleButtonClick={this.handleButtonClick} />
        <Button value="=" type="equal" handleButtonClick={this.handleButtonClick} />
        <Button value="/" type="operator" handleButtonClick={this.handleButtonClick} />
      </div>
    )
  }
}

export default Calculator;