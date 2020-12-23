import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../Components/Order/CheckoutSummary";
import ContactData from "./ContactData";
import * as actions from "../../store/actions";

class Checkout extends Component<any,any> {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0
  // }

  // componentWillMount(){ //changed from didmount to will mount to prevent rendering of null state
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let totalPrice = 0;
  //   for (let param of query.entries()) {
  //     if(param[0] === "price"){ 
  //       totalPrice = +param[1] 
  //     } else {
  //       (ingredients as { [key: string]: any})[param[0]] = +param[1]
  //     }
  //   }
  //   this.setState({ingredients, totalPrice})
  // }

  public checkoutCancelledHandler = (): void => {
    this.props.history.goBack();
  }

  public checkoutContinuedHandler = (): void => {
    this.props.history.replace("/checkout/contact-data");
  }
  
  public render(){
    const {ings, purchased} = this.props
    return (
      <div>
        {(!ings)
        ? <Redirect to="/"/>
        : <>
          {purchased && <Redirect to="/"/>}
          <CheckoutSummary 
            ingredients={ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
          
          <Route 
            path={this.props.match.path + "/contact-data"} 
            component={ContactData} />
          </>
        }
      </div>
    )
  }
}

const mapStateToProps = (state: any): Object => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}


export default connect(mapStateToProps)(Checkout);