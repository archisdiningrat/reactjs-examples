import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import http from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        http.get('/ingredients.json')
            .then(({ data: ingredients }) => {
                this.setState({ ingredients });
            })
            .catch(err => {
                this.setState({ error: true });
            })
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

    purchaseHandler = () => {
        this.setState({ purchasing: true});
    }

    modalClosedHandler = () => {
        this.setState({ purchasing: false});
    }

    modalContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: { ...this.state.ingredients },
            price: this.state.price,
            customer: {
                name: 'ikhaa',
                address: {
                    street: 'dayeuhkolot',
                    city: 'bandung',
                    country: 'indonesia'
                },
                email: 'tikha.nvsy@mail.com',
                deliveryMehod: 'gofood'
            }
        }
        http.post('/orders.json', order)
            .then((res) => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(err => {
                this.setState({ loading: false, purchasing: false });
            })
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key  in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        if (this.state.loading){
            orderSummary = <Spinner />
        }

        let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls
                        add={this.addIngredientHandler}
                        remove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.price}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                    />
                </Fragment>
            )
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.modalClosedHandler}
                    purchaseContinue={this.modalContinueHandler}
                    price={this.state.price}
                />
            )
        }

        return(
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.modalClosedHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );  
    }
}

export default withErrorHandler(BurgerBuilder, http);