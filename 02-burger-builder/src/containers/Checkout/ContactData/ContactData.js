import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'fastest' },
                        { value: 'cheapest', displayValue: 'cheapest' }
                    ]
                },
                value: '',
                valid: true,
                validation: {}
            }
        },
        loading: false,
        formIsValid: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        };
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) return isValid;
        if (rules.required) isValid = value.trim() !== '' && isValid;
        if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
        if (rules.maxLength) isValid = value.length <= rules.minLength && isValid;
        return isValid;
    }

    inputChangedHandler = ({ target: { value }}, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let id in updatedOrderForm){
            formIsValid = updatedOrderForm[id].valid && formIsValid;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(el => (
                    <Input 
                        shouldValidate={el.config.validation} 
                        touched={el.config.touched}
                        invalid={!el.config.valid} 
                        changed={(event) => this.inputChangedHandler(event, el.id)} 
                        elementType={el.config.elementType} 
                        elementConfig={el.config.elementConfig} 
                        value={el.config.value} 
                        key={el.id} 
                    />
                ))}
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;