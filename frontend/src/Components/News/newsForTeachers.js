import React, {useEffect, useState} from 'react';
import Header from "../header/header";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css'
import apiCall from "../../instance";
import CheckUser from "../Securty/CheckUser";

function NewsForTeachers(props) {
    const defData = {
        title: '',
        body: '',
        type: 'teachers',
        status: false
    }

    const [data, setData] = useState(defData)
    const [articles, setArticles] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editItem, setEditItem] = useState(null);


    useEffect(() => {
        getArticles();
    }, [])

    function getArticles() {
        setLoading(true)
        setTimeout(() => {
            apiCall('/article/public', 'get', null, {type: 'teachers'}).then(res => {
                setArticles(res.data)
                console.log(res.data)
                setLoading(false)
            })
        }, 1000)
    }

    function saveArticle() {
        if (isSaving) return;
        setIsSaving(true);
        if (!editItem) {
            apiCall("/article", "POST", data).then((res) => {
                console.log(res.data)
                getArticles()
            })
        } else {
            apiCall('/article/' + editItem.id, 'PUT', data).then((res) => {
                console.log(res.data)
                getArticles()
            })
        }
        closeModal()
    }

    function parseDate(date) {
        console.log(date)
        const parsedDate = new Date(date);

        // Extract year, month, and day from the Date object
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(parsedDate.getDate()).padStart(2, '0');

        // Format the date in year-month-day format
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    function closeModal() {
        setVisible(false);
        setData(defData)
        setIsSaving(false)
        setEditItem(null)
    }

    function editArticle(item) {
        setEditItem(item);
        setData(item)
        setVisible(true)
    }

    function deleteArticle(id) {
        apiCall('/article/' + id, 'DELETE').then(res => {
            getArticles()
        })
    }

    function submitForm(e) {
        e.preventDefault();
    }

    function handleChange(e, id) {
        console.log(e)
        apiCall('/article/status/' + id, 'PUT', null, {status: e}).then(res => {
            console.log(res.data)
            getArticles()
        })
    }

    return (
        <div>

            <Header/>

            <div>
                <div style={{margin: '220px 100px 0 100px'}} className={'d-flex justify-content-between'}>
                    <h3>Barcha e'lonlar</h3>
                    <input className={'form-control w-25 mx-2'} placeholder={'search'} type="text"/>
                    <CheckUser>
                        <button onClick={() => setVisible(true)} className={'text-light btn btn-warning'}><b
                            className={'p-3'}>+ E'lon</b></button>
                    </CheckUser>
                </div>
                <hr/>
                <table className={'table text-center table-striped'}>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Active</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        articles.map(item => (
                            <tr>
                                <td>{item.title}</td>
                                <td>{item.body}</td>
                                <td><input type="checkbox" onChange={(e) => handleChange(e.target.checked, item.id)}
                                           checked={item.status}/></td>
                                <td>{parseDate(item.created_at)}</td>
                                <td>
                                    <CheckUser>
                                        <div className={'btn-group'}>
                                            <button onClick={() => editArticle(item)}
                                                    className={'text-light btn btn-warning'}>edit
                                            </button>
                                            <button onClick={() => deleteArticle(item.id)}
                                                    className={'btn btn-danger'}>delete
                                            </button>
                                        </div>
                                    </CheckUser>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>

            <Rodal height={350} visible={visible} onClose={() => setVisible(false)}>
                <form onSubmit={submitForm}>
                    <div>
                        <div className={"my-3"}>
                            <h4>e'lon</h4>
                            <input required className={"form-control"} type="text"
                                   placeholder={"e'lon"}
                                   onChange={(e) => setData({...data, title: e.target.value})}
                                   value={data.title}
                                   minLength={2}/>
                        </div>
                        <div className={"my-3"}>
                            <h4>qo'shimcha ma'lumot</h4>
                            <textarea required className={"form-control"}
                                      placeholder={"qo'shimcha ma'lumot"}
                                      onChange={(e) => setData({...data, body: e.target.value})}
                                      value={data.body}
                                      minLength={5}/>
                        </div>
                        <div>
                            <label className={'d-flex gap-2 align-items-center'}>
                                <h4>aktivligi</h4>
                                <input type="checkbox"
                                       onChange={(e) => setData({...data, status: e.target.checked})}
                                       checked={data.status}/>
                            </label>
                        </div>
                        <button onClick={saveArticle} className={"form-control btn btn-primary"}>+ qo'shish</button>
                    </div>
                </form>
            </Rodal>
        </div>
    );
}

export default NewsForTeachers;