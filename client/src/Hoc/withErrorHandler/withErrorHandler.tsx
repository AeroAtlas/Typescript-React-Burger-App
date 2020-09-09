import React, { Component } from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import Auxil from '../Auxil/Auxil';


const WithErrorHandler = (WrappedComponent: any, axios: any): any => {
  return class extends Component<any,any> {
    // constructor(props:any) {
    //   super(props)
    // }

    state = {
      error: null,
      reqInter: null,
      resInter: null,
    }

    public componentWillMount() {
      this.setState({
        reqInter: axios.interceptors.request.use((req: Request): Request => {
          this.setState({ error: null })
          return req;
        })
      })
      this.setState({
        resInter: axios.interceptors.response.use((res: Response): Response => {
          return res;
        }, (err: Error): void => {
          this.setState({ error: err });
        })
      })
    }

    public componentWillUnmount() {
      console.log('Will unmount', this.state.reqInter, this.state.resInter)
      axios.interceptors.request.eject(this.state.reqInter)
      axios.interceptors.response.eject(this.state.resInter)
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