import React, { Component } from 'react'
import Auxil from '../Auxil'
import Toolbar from '../../Components/Navigation/Toolbar'
import SideDrawer from '../../Components/Navigation/SideDrawer'
import styles from './style.module.css'

class Layout extends Component<any,any> {

  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState: any): any => { return { showSideDrawer: !prevState.showSideDrawer } });
  }


  render() {
    return (
      <Auxil>
        <Toolbar toggle={this.sideDrawerToggleHandler }/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </Auxil>
    )
  }
}

export default Layout;