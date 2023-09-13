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
        status: ''
    }

    const [data, setData] = useState(defData)
    const [articles, setArticles] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [tableActive, setTableActive] = useState(false);
    const hasUser = localStorage.getItem('access_token')


    useEffect(() => {
        getArticles();
    }, [])

    function getArticles() {
        setLoading(true)
        setTimeout(() => {
            apiCall('/article/public', 'get', null, {type: 'teachers'}).then(res => {
                setArticles(res.data)
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
        if (e !== '') {
            apiCall('/article/status/' + id, 'PUT', null, {status: e}).then(res => {
                console.log(res.data)
                getArticles()
                setTableActive(false)
            })
        } else {
            alert('aktivligini tanlang!')
        }
        setTableActive(false)
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
                        <th>Mazmun</th>
                        <th>Batafsil</th>
                        <th>Holati</th>
                        <th>Vaqt</th>
                        <th>O'zgartirish</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        articles.map(item => (
                            <tr>
                                <td><b>{item.title}</b></td>
                                <td><b>{item.body}</b></td>
                                {
                                    hasUser ?
                                        <td style={{cursor: 'pointer'}} onClick={() => setTableActive(true)}>
                                            {
                                                tableActive ? <select
                                                    value={item.status + ''}
                                                    className={'form-select'}
                                                    onChange={(e) => handleChange(e.target.value, item.id)}>
                                                    <option value="true">Aktiv</option>
                                                    <option value="false">Aktiv emas</option>
                                                </select> : item.status !== null && item.status ? <b>aktiv</b> :
                                                    <b>aktive emas</b>
                                            }
                                        </td>
                                        : <td>{item.status !== null && item.status ? <b>aktiv</b> :
                                            <b>aktiv emas</b>}</td>
                                }
                                <td><b>{parseDate(item.created_at)}</b></td>
                                <td>
                                    <CheckUser>
                                        <div className={'btn-group'}>
                                            <button onClick={() => editArticle(item)}
                                                    className={'text-light btn btn-warning'}>o'zgartirish
                                            </button>
                                            <button onClick={() => deleteArticle(item.id)}
                                                    className={'btn btn-danger'}>o'chirish
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

            <Rodal height={350} visible={visible} onClose={closeModal}>
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
                            <select value={data.status + ''}
                                    onChange={(e) => setData({...data, status: e.target.value})}
                                    className={'form-select'}>
                                <option selected value="">Aktivligini tanlang</option>
                                <option value="true">Aktiv</option>
                                <option value="false">Aktiv emas</option>
                            </select>
                        </div>
                        <button onClick={saveArticle} className={"form-control my-4 btn btn-primary"}>+ qo'shish
                        </button>
                    </div>
                </form>
            </Rodal>
        </div>
    );
}

export default NewsForTeachers;