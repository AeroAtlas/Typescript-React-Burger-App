import React from 'react';
import BuildControl from './BuildControl/BuildControl'

import styles from './BuildControls.module.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat'},
];

const BuildControls = (props: any): any => { 
  return (
    <div className={styles.BuildControls}>
      {controls.map((ctrl: any) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]} //* see if type is disabled or not
        />
      ))}
    </div>
  )
}

export default BuildControls;