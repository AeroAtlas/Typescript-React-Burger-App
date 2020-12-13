import React from "react";
import styles from "./style.module.css"

const Order = (props: any): any => {
  const ingredients = [];
  for(let ingName in props.ingredients){
    ingredients.push({name: ingName, amount: props.ingredients[ingName]})
  }
  // const ingredients = Object.keys(props.ingredients).map(key => ({name: key, amount: props.ingredients[key]}))

  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredients.map(ig => 
        <span className={styles.Ingredients}key={ig.name}>{ig.name} ({ig.amount})</span> )}
      </p>
      <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  )
}

export default Order;