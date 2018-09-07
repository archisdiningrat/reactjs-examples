import React, { Fragment, Component } from 'react';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {

    componentWillUpdate() {
        console.log('will update');
    }

    render(){
        const ingredients = Object.keys(this.props.ingredients);
        const style = { textTransform: 'capitalize' };
        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>Ingredients Added:</p>
                <ul>
                    {ingredients.map((key) => (
                        <li key={key}>
                            <span style={style}>{key}: {this.props.ingredients[key]}</span>
                        </li>
                    ))}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout ?</p>
                <Button type='Danger' clicked={this.props.purchaseCancelled} >CANCEL</Button>
                <Button type='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Fragment>
        )
    }
}

export default OrderSummary;