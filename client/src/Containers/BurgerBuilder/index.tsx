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
import * as aTypes from "../../store/actions";

interface IngredientsObj {
  salad: "string"|"number",
  bacon: "string"|"number",
  cheese: "string"|"number",
  meat: "string"|"number",
}


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

class BurgerBuilder extends Component<any,any>{
  
  public readonly state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  public componentDidMount() {
    // axios.get('https://burger-app-c0e9b.firebaseio.com/ingredients.json')
    //   .then((res: any): any => {
    //     console.log(res)
    //     this.setState({ ingredients: res.data });
    //   }).catch((err: any): any => {
    //     this.setState({ error: true });
    //   });
  }

  public updatePurchaseState(updatedIngredients: any): void {
    const ingredients = {
      ...updatedIngredients
    }
    const sum = Object.keys(ingredients)
      .map((igKey: string) => (ingredients as any)[igKey])
      .reduce((prev: number, curr: number): number => prev + curr)
    this.setState({purchaseable: sum > 0})
  }

  public addIngredientHandler = (type: any): any => {
    if (this.state.ingredients) {
      //* Turn type into a keyof ingredientsObj 
      const key: (keyof IngredientsObj) = type;
      const oldCount: any = (this.state.ingredients as any)[key];

      //* Create new ingredients list with updated count
      const updatedCount = oldCount + 1;
      const updatedIngredients = { ...(this.state.ingredients as any)  };
      updatedIngredients[key] = updatedCount;

      //* Create new price with (old price) + (price from this ingredient)
      const newPrice = this.state.totalPrice + INGREDIENT_PRICES[key];
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice,
      })
      this.updatePurchaseState(updatedIngredients)
    }
  }

  public removeIngredientHandler = (type: any): any => {
    if (this.state.ingredients) {
      //* Turn type into a keyof ingredientsObj 
      const key: (keyof IngredientsObj) = type;
      const oldCount: any = (this.state.ingredients as any)[key];

      //* Check for empty arrays and return if true
      if (oldCount <= 0) { return; };

      //* Create new ingredients list with updated count
      const updatedCount = oldCount - 1;
      const updatedIngredients = { ...(this.state.ingredients as any) };
      updatedIngredients[key] = updatedCount;

      //* Create new price with (old price) - (price from this ingredient)
      const newPrice = this.state.totalPrice - INGREDIENT_PRICES[key];
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice,
      })
      this.updatePurchaseState(updatedIngredients)
    }
  }

  public purchaseHandler = () => {
    this.setState({purchasing:true})
  }

  public purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  public purchaseContinueHandler = () => {
    const queryParams = [];
    for(let i in (this.state.ingredients as any)){
      queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients![i]));
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&")
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    })
  }

  render() {
    const { totalPrice, purchaseable, purchasing, loading } = this.state;
    const { ings, onIngAdded, onIngRemoved } = this.props;

    const disableInfo = { ...(ings as any) }
    for (let key in disableInfo) {
      (disableInfo as any)[key] = (disableInfo as any)[key] <= 0 //*replaces array values with true or false
    }

    return (
      <Fragment>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {(loading || (!ings))
            ? <Spinner />
            : <OrderSummary
              ingredients={ings}
              price={totalPrice}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              />}
        </Modal>
        {(!ings)
          ? <p style={{ textAlign: 'center', fontSize: '50px'}}>Ingredients can't be loaded</p>
          : <Burger ingredients={ings}/>}
        <BuildControls
          ingredientAdded={onIngAdded}
          ingredientRemoved={onIngRemoved}
          disabled={disableInfo}
          purchaseable={purchaseable}
          ordered={this.purchaseHandler}
          price={totalPrice}/>
      </Fragment>
    )
  }
}

const mapStateToProps = (state: any): any => {
  return {
    ings: state.ingredients
  }
}

const mapDispatchToProps = (dispatch: any): any => {
  return {
    onIngAdded: (ingName: any): any => dispatch({type: aTypes.ADD_INGREDIENT, payload: {ingName}}),
    onIngRemoved: (ingName: any): any => dispatch({type: aTypes.REMOVE_INGREDIENT, payload: {ingName}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));