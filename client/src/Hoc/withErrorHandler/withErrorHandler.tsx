import React, { Component } from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import Auxil from '../Auxil/Auxil';


const WithErrorHandler = (WrappedComponent: any, axios: any): any => {
  return class extends Component<any,any> {

    public readonly state = {
      error: null
    }

    public componentDidMount() {
      axios.interceptors.request.use((req: Request): Request => {
        this.setState({ error: null })
        return req;
      })
      axios.interceptors.response.use((res: Response): Response => {
        return res;
      }, (err: Error): void => {
          this.setState({ error: err }); 
      })
    }

    public errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    render() {
      const { error } = this.state;
      return (
        <Auxil>
          <Modal show={error} modalClosed={this.errorConfirmedHandler} >
            {error && (error as any).message}
            {/* (if (error) error!.message)() */}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxil>
      )
    }
  }
}

export default WithErrorHandler;