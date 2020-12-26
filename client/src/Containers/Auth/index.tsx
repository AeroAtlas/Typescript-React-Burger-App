import React, {Component} from "react";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import styles from "./style.module.css";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elemType: "input",
        elemConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elemType: "input",
        elemConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 64
        },
        valid: false,
        touched: false
      }
    }
  }

  checkValidity = (value: any, rules: any = {}): any => {
    let isValid = true;
    if(rules.required){
      isValid = isValid && value.trim() !== "";
    }
    if(rules.minLength){
      isValid = isValid && value.length >= rules.minLength;
    }
    if(rules.maxLength){
      isValid = isValid && value.length <= rules.maxLength;
    }
    if(rules.isEmail){
      const pattern = /\S+@\S+\.\S+/
      isValid = isValid && pattern.test(value)
    }
    // if(rules.isNumeric){
    //   const pattern = /^\d+$/;
    //   isValid = isValid && pattern.test(value)
    // }
    return isValid
  }

  inputChangeHandler = (e: Event, id: any): void => {
    const { controls } = this.state
    const name = (controls as any)[id]
    const value = (e.target as any).value
    const update = {...name, value, valid: this.checkValidity(value, name.validation), touched: true}

    const formIsValid = Object.keys(controls).reduce((acc, curr) => acc && (controls as any)[curr].valid, true)

    this.setState({
      controls:{
        ...controls,
        [id]: update
      },
      formIsValid
    })
  }

  render(){
    const formElemsArr = [];
    for (let key in this.state.controls){
      formElemsArr.push({
        id: key,
        config: (this.state.controls as any)[key],
      })
    }

    const form = formElemsArr.map(formElem => (
      <Input
        key={formElem.id}
        elemType={formElem.config.elemType}
        elemConfig={formElem.config.elemConfig}
        value={formElem.config.value}
        invalid={!formElem.config.valid}
        shouldValidate={formElem.config.validation}
        touched={formElem.config.touched}
        changed={(event: Event):void => this.inputChangeHandler(event, formElem.id)}
      /> 
      
    ))

    return (
      <div className={styles.Auth}>
        <form>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    )
  }
}

export default Auth;