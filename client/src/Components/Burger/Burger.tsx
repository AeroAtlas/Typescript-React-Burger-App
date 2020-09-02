import React from 'react'
import Ingredients from './Ingredients/Ingredients'

import styles from './Burger.module.css'

const Burger = (props: any): any => { //["burger":2, "cheese":1]
  const transformedIngredients = Object.keys(props.ingredients) //["burger", "cheese"] //array of keys
    .map((igKey: any): any => { 
      return [...Array(props.ingredients[igKey])] //["burger, burger"] ["cheese"] //value as length for each key
        .map((_, i: number): any => {
          return <Ingredients key={igKey + i} type={igKey}/> //creates Component with key=key+value and type=key
        })
    }).reduce((prev: any, curr: any) => { //[[],[],[]] -> 1 value
      return prev.concat(curr)
    }, []); //initial value of []
  
  return (
    <div className={styles.Burger}>
      <Ingredients type="bread-top"/>
        {transformedIngredients.length ? transformedIngredients : <div>Please start adding ingredients!</div>}
      <Ingredients type="bread-bottom"/>
    </div>
  );
}

export default Burger;