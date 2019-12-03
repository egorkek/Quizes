import React, {Component} from 'react'
import classes from './Drawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'

class Drawer extends Component{
  RenderLinks= (links) => {
    return links.map((link, index) => {
      return (
        <li key={index}><NavLink to={link.to} exact={link.exact} activeClassName={classes.active} onClick={this.props.onClose}>{link.label}</NavLink></li>)
    })
  };

  render() {
    let links = [
      {to: '/', label:'Список', exact: true},
    ];
    if (this.props.isAuthenticated ===true){
      links.push({to: '/quiz-creator', label:'Создать тест', exact: false});
      links.push({to: '/logout', label:'Выйти', exact: false});
    }
    else{
      links.push({to: '/auth', label:'Авторизация', exact: false})
    }
    const cls =[classes.Drawer];
    if (!this.props.isOpen) {
      cls.push(classes.close);
    }

    return (
      <React.Fragment>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
        <nav className={cls.join(' ')}>
          <ul>
            {this.RenderLinks(links)}

          </ul>
        </nav>
      </React.Fragment>
    )
  }
}

export default Drawer