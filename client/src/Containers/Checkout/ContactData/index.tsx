import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../../axios-order";
import Button from "../../../Components/UI/Button";
import Spinner from "../../../Components/UI/Spinner";
import Input from "../../../Components/UI/Input";
import styles from "./style.module.css";
import withErrorHandler from "../../../Hoc/withErrorHandler";
import * as actions from "../../../store/actions";
import { start } from "repl";

class ContactData extends Component<any,any> {
  formData = (placeholder: String, type: String = "text", validation: Object = {required: true}): Object => {
    return {
      elemType: "input",
      elemConfig: {
        type: type,
        placeholder: placeholder
      },
      value: "",
      validation,
      valid: false,
      touched: false
    }
  } 
  state = {
    orderForm:{
      name: this.formData("Your Name"),
      street: this.formData("Your Street"),
      zipCode: this.formData("Your ZIP Code", "text", {required:true, minLength:5, maxLength:5}),
      country: this.formData("Your Country"),
      email: this.formData("Your Email", "email", {required: true}),
      deliveryMethod: {
        elemType: "select",
        elemConfig: {
          options: [
            {value: "fastest", displayValue: "Fastest"},
            {value: "cheapest", displayValue: "Cheapest"}
          ]
        },
        value: "fastest",
        validation: {},
        valid: true,
        touched: true
      }
    },
    formIsValid: false
  }

  orderHandler = (event: any): any => {
    event.preventDefault();
    // this.setState({ loading: true });
    const {ings, price, onOrderBurger} = this.props
    const formData = {};
    for(let id in this.state.orderForm){
      (formData as any)[id] = (this.state.orderForm as any)[id].value
    }
    const order = {
      ingredients: ings,
      price: price,
      orderData: formData
    }
    onOrderBurger(order)
  }

  checkValidity = (value: any, rules: any = {}): any => {
    let isValid = true;
    if(rules.required){
      isValid = value.trim() !== "" && isValid;
    }
    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid
  }

  inputChangeHandler = (e: Event, id: any): void => {
    const { orderForm } = this.state
    const name = (orderForm as any)[id]
    const value = (e.target as any).value
    const update = {...name, value, valid: this.checkValidity(value, name.validation), touched: true}

    const formIsValid = Object.keys(orderForm).reduce((acc, curr) => acc && (orderForm as any)[curr].valid, true)

    this.setState({
      orderForm:{
        ...orderForm,
        [id]: update
      },
      formIsValid
    })
  }

  render(){
    const formElemsArr = [];
    for (let key in this.state.orderForm){
      formElemsArr.push({
        id: key,
        config: (this.state.orderForm as any)[key],
      })
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {(this.props.loading)
        ? <Spinner/>
        : <form onSubmit={this.orderHandler}>
            {formElemsArr.map(formElem => (
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
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>}
      </div>
    );
  }
}

const mapStateToProps = (state: any): Object => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = (dispatch: Function): Object => {
  return {
    onOrderBurger: (orderData: Object): void => dispatch(actions.purchaseBurger(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));