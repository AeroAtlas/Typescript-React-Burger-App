import React, {Component} from "react";
import {connect} from "react-redux";
import Order from "../../Components/Order";
import axios from "../../axios-order";
import withErrorHandler from "../../Hoc/withErrorHandler";
import * as actions from "../../store/actions";
import Spinner from "../../Components/UI/Spinner";

class Orders extends Component<any, any> {
  
  componentDidMount(){
    this.props.onFetchOrders();
  }

  render(){    
    return (
      <>
      {(this.props.loading)
      ? <Spinner/>
      : <div>
          {this.props.orders.map((order:any): any => (
            <Order key={order.id} 
              ingredients={order.ingredients}
              price={order.price} />
          ))}
        </div>
      }
    </>
    )
  }
}

const mapStateToProps = (state: any): Object => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  }
}

const mapDispatchToProps = (dispatch: Function): Object => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));