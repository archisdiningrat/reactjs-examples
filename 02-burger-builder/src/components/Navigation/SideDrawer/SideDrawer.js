import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItem from '../NavigationItem/NavigationItem';

export default (props) => {
    return (
        <div className={classes.SideDrawer}>
            <Logo height="11%" margin="32px"></Logo>
            <nav>
                <NavigationItem></NavigationItem>
            </nav>
        </div>
    )
}