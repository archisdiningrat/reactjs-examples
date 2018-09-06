import React from 'react';
import logo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

export default (props) => {
    return (
        <div className={classes.Logo} style={ { height: props.height, 'margin-bottom': props.margin } }>
            <img src={logo} alt="MyBurger"></img>
        </div>
    )
}