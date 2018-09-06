import React, { Fragment } from 'react';
import classes from './MainLayout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

export default (props) => (
    <Fragment>
        <Toolbar></Toolbar>
        <SideDrawer></SideDrawer>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Fragment>
)