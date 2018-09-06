import React from 'react';
import classes from './NavigationItem.css';

export default (props) => {
    const links = [
        { path: '/', name: 'Burger Builder', active: true },
        { path: '/', name: 'Checkout', active: false }
    ];
    return (
        <ul className={classes.NavigationItem}>
            {links.map(link => (
                <li className={classes.NavigationChild}>
                    <a href={link.path} className={link.active ? classes.active : null}>{link.name}</a>
                </li>
            ))}
        </ul>
    )
}