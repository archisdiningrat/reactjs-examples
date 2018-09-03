import React, { Fragment } from 'react';
import classes from './MainLayout.css'

export default (props) => (
    <Fragment>
        <div>Toolbar, etc</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Fragment>
)