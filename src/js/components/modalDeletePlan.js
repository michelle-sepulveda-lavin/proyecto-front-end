import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

const ModalDeletePlan = props => {
    const [editItem, setEditItem] = useState({
        full_name: "",
        email: "",
        agenda_slug: "german664",
        address: "",
        phone: ""
    });
    const { store, actions } = useContext(Context);
    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Are you sure?</h5>
                        {props.onClose ? (
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        ) : (
                                ""
                            )}
                    </div>
                    <div className="modal-body">
                        <p>Warning: unknown consequences after this point... Kidding!</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                        >
                            Oh no!
						</button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                        >
                            Do it!
						</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDeletePlan;