import React, { Component} from 'react';  
import { Modal } from 'react-bootstrap';
import GoBackList from "./GoBackList"
import './index.css';
import './index.scss';

  class ModalPopup extends Component {  
    constructor(props) {
        super(props);  
        this.state = {  
            showModal: false,
        };  
    }  
    
  
    isShowModal = (status) => {  
        this.handleClose();  
        this.setState({ showModal: status });  
    }  
  
    handleClose = () => {  
        this.props.onPopupClose(false);  
    }  

    reset = () =>{
        window.location.reload(false);
    }
  
  
    render() {  
        let {title} = this.props;
        return(
                <Modal show={this.props.showModalPopup} onHide={this.handleClose} backdrop="static" keyboard={false}
                        dialogClassName="modal"
                    >  
                        <Modal.Header>  
                            <Modal.Title id="sign-in-title">  
                                <h1>{title}</h1>  
                            </Modal.Title>  
                        </Modal.Header>  
                        <Modal.Body contentClassName="modal-body">  
                            
                            <div> 

                            <h3>Would you like to restart this level?</h3> 
                            <button onClick={() => this.reset()}>Reset Level</button>
                            </div>
                            <hr/>
                            {window.location.href ==   window.location.protocol  + "//"+ window.location.host + "/leveltwo" &&
                                <div> 
                                <h3>Go Back to Previous Level</h3>
                                <GoBackList />
                                <br/>
                                <hr/>
                                </div>   
                            }
                            {window.location.href ==   window.location.protocol  + "//"+ window.location.host + "/levelthree" &&
                                <div> 
                                <h3>Go Back to Previous Level</h3>
                                <GoBackList />
                                <br/>
                                <hr/>
                                </div>   
                            }
                            {window.location.href ==   window.location.protocol  + "//"+ window.location.host + "/levelfour" &&
                                <div> 
                                <h3>Go Back to Previous Level</h3>
                                <GoBackList />
                                <br/>
                                <hr/>
                                </div>   
                            }
                            {window.location.href ==   window.location.protocol  + "//"+ window.location.host + "/levelfive" &&
                                <div> 
                                <h3>Go Back to Previous Level</h3>
                                <GoBackList />
                                <br/>
                                <hr/>
                                </div>   
                            }
                            
                            
                            <div>
                            <h3>Exit to main menu?</h3> 
                                <form action="/">
                                    <input type="submit" value="Quit" />
                                </form>
                            </div>
                            
                             
                        </Modal.Body>  
                </Modal >  
            
          );
    }  
}  

// const ModalPopup = props => {
// if(!props.show){
//     return null;
// }

//     return(
//         <div className="modal" show={this.props.showModalPopup} onHide={this.handleClose}>
//           <div className="modal-content">
//             <div className="modal-header">
//               <h4 className="modal-title">Game Over!</h4>
//             </div>
//             <div className="modal-body">
//               This is the content 
//             </div>
//             <div className="modal-footer">
//                 <button className="button" onClick={() => this.isShowModal(true)}>Close</button>
//             </div>
//           </div>
//         </div>
//       )
// }


  export default (ModalPopup); 