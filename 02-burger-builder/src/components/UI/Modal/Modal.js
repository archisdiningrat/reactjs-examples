import React, { Fragment } from 'react';
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop';

export default (props) => {
    const style = {
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
    };
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed}></Backdrop>
            <div className={classes.Modal} style={style}>
                {props.children}
            </div>
        </Fragment>
    );
}
