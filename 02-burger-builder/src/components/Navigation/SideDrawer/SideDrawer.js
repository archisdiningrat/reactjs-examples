import React, { Fragment } from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItem from '../NavigationItem/NavigationItem';
import Backdrop from '../../UI/Backdrop/Backdrop';

export default (props) => {
    const isOpened = props.show;
    const attachedClasses = [classes.SideDrawer];
    isOpened ? attachedClasses.push(classes.Open) : attachedClasses.push(classes.Close);
    return (
        <Fragment>
            <Backdrop show={isOpened} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%" margin="32px"></Logo>
                <nav>
                    <NavigationItem></NavigationItem>
                </nav>
            </div>
        </Fragment>
    )
}