import React, { Component } from "react";
import axios from "../../../axios-order";
import Button from "../../../Components/UI/Button";
import Spinner from "../../../Components/UI/Spinner";
import styles from "./style.module.css";

class ContactData extends Component<any,any> {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  }

  orderHandler = (event: Event): void => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Bob Robertson',
        address: {
          street: '123 Street St',
          zipCode: '12345',
          country: 'USA'
        },
        email: "test@test.com"
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then((_res: any): any => { 
        this.setState({ loading: false, purchasing: false }) 
        this.props.history.push("/");
      })
      .catch((_err: any): any => { this.setState({ loading: false, purchasing: false }) });
  }

  render(){
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {(this.state.loading)
        ? <Spinner/>
        : <form>
          <input className={styles.Input} type="text" name="name" placeholder="Your name"/>
          <input className={styles.Input} type="text" name="email" placeholder="Your email"/>
          <input className={styles.Input} type="text" name="street" placeholder="Your street"/>
          <input className={styles.Input} type="text" name="postal" placeholder="Postal code"/>
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>}
      </div>
    );
  }
}

export default ContactData;