import React, { Component } from 'react'
import Auxil from '../Hoc/Auxil'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import styles from './Layout.module.css'

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