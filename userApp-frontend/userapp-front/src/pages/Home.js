import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Modal from '../layout/Modal';

const Home = () => {

    const [users, setUsers] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        loadUser(); 
    }, []);

    const loadUser = async () => {
        const result = await axios.get("http://localhost:8082/users");
        setUsers(result.data);
    }

    const onClickDelete = async (id) => {
        await axios.delete(`http://localhost:8082/users/${id}`);
        loadUser();
    }

    const onClickCancel = () => {
        setModalVisible(false);
    }

    return (
        <>
            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">

                            {
                                users.map((user, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link className="btn btn-primary mx-2" to={`/viewUser/${user.id}`}>View</Link>
                                        <Link className="btn btn-outline-primary mx-2" to={`/editUser/${user.id}`}>Edit</Link>
                                        <button 
                                            className="btn btn-danger mx-2" 
                                            onClick={() => setModalVisible(true)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal 
                visible={modalVisible}
                onClickCancel={onClickCancel}
                onClickDelete={onClickDelete}
                message={
                    <div>
                        <div>
                            <strong>Are you sure to delete User?</strong>
                        </div>
                        <span>{users.id}</span>
                    </div>
                }
            
            />
        </>
    );
};

export default Home;