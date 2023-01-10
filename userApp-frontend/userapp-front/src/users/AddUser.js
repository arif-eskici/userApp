import axios from 'axios';
import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';

class AddUser extends Component {
    state = {
        name: null,
        username: null,
        email: null,
        pendingApiCall: false,
        errors: {}
    }
    
    onChange = event => {
        const {name, value} = event.target;
        const errors = {...this.state.errors}
        errors [name] = undefined;

        this.setState({
            [name]: value,
            errors
        });
    }

    
    onSubmit = async event => {
        //let navigate = useNavigate();
        event.preventDefault();
        const {name, username, email} = this.state;

        const body = {
            name,
            username,
            email
        };
        this.setState({pendingApiCall: true});

        try {
            const response = await axios.post("http://localhost:8082/users", body);
           // navigate("/");
        } catch (error) {
            this.setState({errors: error.response.data.validationErrors}); 
        }

        this.setState({pendingApiCall: false});
    }

    render() {
        
        return (
            <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register User</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor='Name' className="form-label">
                                Name
                            </label>
                            <input 
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your name"
                                name="name"
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor='Username' className="form-label">
                                Username
                            </label>
                            <input 
                                type={"text"}
                                className={this.state.errors.username ? "form-control is-invalid" : "form-control"}
                                placeholder="Enter your username"
                                name="username"
                                onChange={this.onChange}
                            />
                            <div className="invalid-feedback">
                                {this.state.errors.username}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor='Email' className="form-label">
                                E-mail
                            </label>
                            <input 
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your e-mail address"
                                name="email"
                                onChange={this.onChange}
                            />
                        </div>
                        <button 
                            className="btn btn-outline-primary"
                            onClick={this.onSubmit}
                            disabled={this.state.pendingApiCall}
                            to="/"
                            >
                            {this.state.pendingApiCall && <span className="spinner-border spinner-border-sm me-1"></span>} Submit</button>
                        <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export default AddUser;