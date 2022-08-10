import React from "react";


const Modal = (props) => {
    return (
        <>
        <div className="modal fade" data-backdrop="static" id={props.target} tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">{props.title}</h5>
                        </div>
                        <div className="modal-body">
                            {props.content}
                        </div>
                        <div className="modal-footer">
                            {props.twoButtons ? (
                            <>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={props.onclick2}>Delete</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.onclick}>Close</button>
                            </>
                            ) : (
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.onclick}>Close</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;



