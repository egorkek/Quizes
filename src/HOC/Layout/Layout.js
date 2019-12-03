import React, {Component} from 'react'
import classes from './Layout.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import {connect} from 'react-redux'

class Layout extends Component{
  state = {
    menu: false
  };
  ToggleMenuHandler =()=>{
    this.setState({
      menu: !this.state.menu
    })
  };

    render() {
      return (
        <div className={classes.Layout}>
          <main>
            {this.props.children}
          </main>
          <MenuToggle
            onToggle={this.ToggleMenuHandler}
            isOpen={this.state.menu}
          />
          <Drawer
            isOpen={this.state.menu}
            onClose={this.ToggleMenuHandler}
            isAuthenticated={this.props.isAutenticated}
          />
        </div>
      )
    }
}

function mapStateToProps(state) {
  return {
    isAutenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout)