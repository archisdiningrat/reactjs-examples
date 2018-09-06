import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItem from '../NavigationItem/NavigationItem';

export default (props) => {
    return (
        <header className={classes.Toolbar}>
            <div>MENU</div>
            <Logo height="80%" margin="0px"></Logo>
            <nav className={classes.DesktopOnly}>
                <NavigationItem></NavigationItem>
            </nav>
        </header>
    )
}