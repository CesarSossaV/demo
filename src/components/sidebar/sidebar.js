import React from "react";
import {Link,NavLink} from 'react-router-dom'
import logo from '../../logo.svg'


import './sidebar.scss'

const Sidebar = () =>{
    return (
        <div className="sidebar-nav">
          {/*<img src={logo} className="brand" alt="Strommar" />*/}
          <nav className="primary">
            {/* <NavLink onClick={ e => handleClick( e ,"/profile/notifications")} >{i18n.t('alerts & calendar')}</NavLink>
            <NavLink onClick={ e => handleClick( e ,"/profile/streaming")} >{i18n.t('my numbers')}</NavLink>
            <NavLink onClick={ e => handleClick( e ,"/profile/tracks")} >{i18n.t('release music')}</NavLink>
            <NavLink className="submenu" onClick={ e => handleClick( e ,"/profile/tracks")} >{i18n.t('tracks')}</NavLink> */}
    
    

            <NavLink activeClassName="active" to="/Artists">{'Clientes'}</NavLink>
            
            {/* <NavLink activeClassName="active2" className="submenu" to="/profile/trackss">{i18n.t('tracks')}</NavLink> */}
            {/* <Link className="submenu" onClick={ e => handleClick( e ,"/profile/tracks")} >{i18n.t('albums')}</Link> */}
            {/*<a href="/profile/social">{i18n.t('social media')}</a>
            <a href="/profile/tracks">{i18n.t('release music')}</a>
            <a href="/profile/single">{i18n.t('enter tracks')}</a>
            <a href="/profile/album">{i18n.t('upload single/album')}</a>*/}
    
          </nav>
          
          
        </div>
      )
}

export default Sidebar