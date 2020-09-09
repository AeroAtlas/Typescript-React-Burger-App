import React, { Component } from 'react';
import Layout from '../Hoc/Layout/Layout'
import BurgerBuilder from '../Containers/BurgerBuilder/BurgerBuilder'

// import styles from '../css/Main.module.css';

class Main extends Component<any, any>{
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    )
  }
}

export default Main