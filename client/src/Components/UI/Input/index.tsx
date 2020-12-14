import React from "react";
import styles from "./style.module.css";

const Input = (props: any): any => {
  let inputElement = null;
  //Add class to shows if invalid
  const inputClasses = [styles.InputElement];
  if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(styles.Invalid)
  }

  //Dynamically render html based of props.elemType
  switch (props.elemType){
    case ("input"):
      inputElement = <input className={inputClasses.join(" ")} {...props.elemConfig} value={props.value} onChange={props.changed}/>;
      break;
    case ("textarea"): 
      inputElement = <textarea className={inputClasses.join(" ")} {...props.elemConfig} value={props.value} onChange={props.changed}/>;
      break;
    case ("select"):
      inputElement = (
        <select className={inputClasses.join(" ")} value={props.value} onChange={props.changed}>
        {props.elemConfig.options.map((opt: any): any => (
          <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
        ))}
        </select>
      );
      break;
    default:
      inputElement = <input className={inputClasses.join(" ")}{...props.elemConfig} value={props.value}/>;
  }
  
  //Render
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
      {/* Render error messages */}
      {(props.invalid && props.touched && <p className={styles.ValidationError}>Please enter a valid value</p>)}
    </div>
  )
}

export default Input;