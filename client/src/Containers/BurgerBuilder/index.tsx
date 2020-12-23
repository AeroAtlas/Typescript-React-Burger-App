import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
// import Auxil from '../../Components/Hoc/Auxil'
import axios from '../../axios-order';
import Burger from '../../Components/Burger';
import BuildControls from '../../Components/Burger/BuildControls';
import Modal from '../../Components/UI/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary';
import Spinner from '../../Components/UI/Spinner';
import WithErrorHandler from '../../Hoc/withErrorHandler';
import * as actions from "../../store/actions";

interface IngredientsObj {
  salad: "string"|"number",
  bacon: "string"|"number",
  cheese: "string"|"number",
  meat: "string"|"number",
}



class BurgerBuilder extends Component<any,any>{
  
  public readonly state = {
    // ingredients: null,
    // totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  public componentDidMount() {
    console.log(this.props);
    this.props.onIngInit();
  }

  // public updatePurchaseState(/*updatedIngredients: any*/): void {
  //   const ingredients = {
  //     ...this.props.ings
  //   }
  //   const sum = Object.keys(ingredients)
  //     .map((igKey: string) => (ingredients as any)[igKey])
  //     .reduce((acc: number, curr: number): number => acc + curr)
  //   this.setState({purchaseable: sum > 0})
  // }

  // public addIngredientHandler = (type: any): any => {
  //   if (this.state.ingredients) {
  //     //* Turn type into a keyof ingredientsObj 
  //     const key: (keyof IngredientsObj) = type;
  //     const oldCount: any = (this.state.ingredients as any)[key];

  //     //* Create new ingredients list with updated count
  //     const updatedCount = oldCount + 1;
  //     const updatedIngredients = { ...(this.state.ingredients as any)  };
  //     updatedIngredients[key] = updatedCount;

  //     //* Create new price with (old price) + (price from this ingredient)
  //     const newPrice = this.state.totalPrice + INGREDIENT_PRICES[key];
  //     this.setState({
  //       ingredients: updatedIngredients,
  //       totalPrice: newPrice,
  //     })
  //     this.updatePurchaseState(updatedIngredients)
  //   }
  // }

  // public removeIngredientHandler = (type: any): any => {
  //   if (this.state.ingredients) {
  //     //* Turn type into a keyof ingredientsObj 
  //     const key: (keyof IngredientsObj) = type;
  //     const oldCount: any = (this.state.ingredients as any)[key];

  //     //* Check for empty arrays and return if true
  //     if (oldCount <= 0) { return; };

  //     //* Create new ingredients list with updated count
  //     const updatedCount = oldCount - 1;
  //     const updatedIngredients = { ...(this.state.ingredients as any) };
  //     updatedIngredients[key] = updatedCount;

  //     //* Create new price with (old price) - (price from this ingredient)
  //     const newPrice = this.state.totalPrice - INGREDIENT_PRICES[key];
  //     this.setState({
  //       ingredients: updatedIngredients,
  //       totalPrice: newPrice,
  //     })
  //     this.updatePurchaseState(updatedIngredients)
  //   }
  // }

  public purchaseHandler = () => {
    this.setState({purchasing:true})
  }

  public purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  public purchaseContinueHandler = () => {
    // const {ings, price} = this.props
    // const queryParams = [];
    // for(let i in (ings as any)){
    //   queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(ings![i]));
    // }
    // queryParams.push("price=" + price);
    // const queryString = queryParams.join("&")
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // })
    this.props.history.push("/checkout")
  }

  render() {
    const { purchasing } = this.state;
    const { ings, price, purchase, error, onIngAdded, onIngRemoved } = this.props;

    const disableInfo = { ...(ings as any) }
    for (let key in disableInfo) {
      (disableInfo as any)[key] = (disableInfo as any)[key] <= 0 //*replaces array values with true or false
    }
    console.log(ings)
    return (
      <Fragment>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {/*Removed loading*/}
          {(!ings) 
            ? <Spinner />
            : <OrderSummary
              ingredients={ings}
              price={price}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              />}
        </Modal>
        {(!ings || error)
          ? <Spinner /> || <p style={{ textAlign: 'center', fontSize: '50px'}}>Ingredients can't be loaded</p>
          : <Burger ingredients={ings}/>}
        <BuildControls
          ingredientAdded={onIngAdded}
          ingredientRemoved={onIngRemoved}
          disabled={disableInfo}
          purchaseable={purchase}
          ordered={this.purchaseHandler}
          price={price}/>
      </Fragment>
    )
  }
}

const mapStateToProps = (state: any): any => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchase: state.burgerBuilder.purchaseable,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = (dispatch: any): any => {
  return {
    onIngAdded: (ingName: any): any => dispatch(actions.addIngredient(ingName)),
    onIngRemoved: (ingName: any): any => dispatch(actions.removeIngredient(ingName)),
    onIngInit: () => dispatch(actions.initIngredients()) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));