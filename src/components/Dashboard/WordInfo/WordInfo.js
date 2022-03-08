import React from 'react';
import { useHistory } from 'react-router';
import editImg from "../../../images/edit.png";
import deleteImg from "../../../images/trash.png";
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';

const WordInfo = (props) => {
    const { _id, wordLine1, wordLine2, redirectUrl, username, days, page, symbol } = props.data;
    const history = useHistory();
    const token = localStorage.getItem("token");
    const { dispatch } = useAuth();

    const editBtn = () => history.push(`/editWordInfo/${_id}`);

    const deleteBtn = (id) => {
        if (window.confirm("Are you sure delete this word?")) {

            axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/word/allWords/${id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then(res => {
                    if (res.data.deletedId) {
                        dispatch({
                            type: "DELETE_WORD",
                            payload: res.data.deletedId
                        });
                    }
                })
                .catch(err => alert(err.response.data));
        }
    }

    return (
        <tr>
            <th><span className="text-capitalize">{wordLine1}</span> <br /> <span className="text-capitalize">{wordLine2}</span></th>
            <td>{redirectUrl}</td>
            <td>{username}</td>
            <td>{days}</td>
            <td>{page}</td>
            <td>{symbol}</td>
            <td className="text-center"> <button onClick={editBtn} className="btn  btn-outline-dark"><img srcSet={editImg} alt="Edit" /></button></td>
            <td> <button onClick={() => deleteBtn(_id)} className="btn btn-outline-dark"><img srcSet={deleteImg} alt="Delete" /></button></td>
        </tr>
    );
};

export default WordInfo;