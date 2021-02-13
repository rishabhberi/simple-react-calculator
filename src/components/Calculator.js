import React, {Component} from 'react';
import Button from './Button';
import Display from './Display';

const initialState = {
  operand1: 0,
  operator: null,
  operand2: null
}

const DARK_THEME = "dark-theme";
const LIGHT_THEME = "light-theme";

class Calculator extends Component {

  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      ...initialState,
      scientificMode: false,
      theme: "Light Theme"
    };
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

  toggleScientificMode = () => {
    this.setState({
      scientificMode: !this.state.scientificMode
    })
  }

  handleScientificFunction = (e) => {

    const value = e.target.textContent;
    const operand1 = this.state.operand1;
    let result;

    switch(value) {
      case "+/-": result = -operand1;
        break;
      case "Square": result = Math.pow(operand1,2);
        break;
      case "Root": result = Math.sqrt(operand1);
        break;
    }

    this.setState({
      ...initialState,
      operand1: result
    });

  }

  handleThemeChange = (e) => {
    
    const value = e.target.textContent;
    this.setState({
      theme: value
    });
  }

  render () {

    var gridClass = "calculator-grid ";
    var displayValue = isNaN(this.state.operand1)?"Error":this.state.operand1;

    if(this.state.theme === "Light Theme") {
      document.body.classList.add(LIGHT_THEME);
      document.body.classList.remove(DARK_THEME);
      gridClass += LIGHT_THEME;
    } else {
      document.body.classList.add(DARK_THEME);
      document.body.classList.remove(LIGHT_THEME);
      gridClass += DARK_THEME;
    }

    return (
      <div className={gridClass}>
        <Button value="Light Theme" type="theme" handleButtonClick={this.handleThemeChange} />
        <Button value="Dark Theme" type="theme" handleButtonClick={this.handleThemeChange} />
        <Display value={displayValue} />
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
        <Button value="Scientific Mode" type="scientific" handleButtonClick={this.toggleScientificMode} />
        {
          this.state.scientificMode ? 
            <React.Fragment>
              <Button value="+/-" handleButtonClick={this.handleScientificFunction} />
              <Button value="Square" type="function" handleButtonClick={this.handleScientificFunction} />
              <Button value="Root" type="function" handleButtonClick={this.handleScientificFunction} />
            </React.Fragment>
            : null
        }
      </div>
    )
  }
}

export default Calculator;