import React, {useState} from 'react';
import { useParams } from 'react-router-dom';

const Modal = (props) => {

    const [user, setUser] = useState([]);
    
    const {visible, onClickCancel, message, onClickDelete} = props;

    const {id} = useParams();


    let className="modal fade";
    if(visible) {
        className += 'show d-block';
    }

    return (
      <div className={className} style={{backgroundColor: '#000000b0'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div classNameName="modal-header">
              <h1 className="modal-title fs-5">Delete User</h1>
            </div>
            <div className="modal-body">
              {message} 
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClickCancel}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={() => onClickDelete(user.id)}>Delete User</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Modal;