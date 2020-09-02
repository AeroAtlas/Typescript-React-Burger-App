import React, { Component } from 'react';
import Layout from '../Components/Layout/Layout'

import styles from '../css/Main.module.css';

class Main extends Component<any, any>{
  render() {
    return (
      <div>
        <Layout>
          <p>Test</p>  
        </Layout>
      </div>
    )
  }
}

export default Main