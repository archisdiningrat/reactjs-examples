import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const prices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0
        },
        price: 0,
        purchaseable: false
    }

    addIngredientHandler = async (type) => {
        const val = this.state.ingredients[type] + 1;
        const ingredients = {
            ...this.state.ingredients
        }
        ingredients[type] = val;
        const price = this.state.price + prices[type];
        this.setState({ ingredients, price });
        this.updatePurchaseState(ingredients);
    }

    removeIngredientHandler = (type) => {
        const old = this.state.ingredients[type];
        if (old <= 0) return;
        const val = old - 1;
        const ingredients = {
            ...this.state.ingredients
        }
        ingredients[type] = val;
        const price = this.state.price - prices[type];
        this.setState({ ingredients, price });
        this.updatePurchaseState(ingredients);
    }

    updatePurchaseState = (ingredients) => {
        const reduced = Object.keys(ingredients).reduce((sum, key) => sum + ingredients[key], 0);
        this.setState({ purchaseable: reduced > 0 });
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key  in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Fragment>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.price}
                    purchaseable={this.state.purchaseable}
                />
            </Fragment>
        );  
    }
}

export default BurgerBuilder;