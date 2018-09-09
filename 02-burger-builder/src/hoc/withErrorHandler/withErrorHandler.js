import React, { Fragment, Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

export default ( WrappedComponent, axios ) => {
    return class extends Component {
        state ={
            error: null
        }

        componentWillMount(){
            this.resInterceptor = axios.interceptors.request.use(
                res => {
                    this.setState({ error: null });
                    return res
                }
            )
            this.reqInterceptor = axios.interceptors.response.use(
                res => res,
                error => {
                    this.setState({ error });
                    return Promise.reject(error);
                }
            )
        };

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render(){
            return (
                <Fragment>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
};