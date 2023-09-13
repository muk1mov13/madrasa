
import React, {useState, useEffect} from 'react';
import apiCall from '../../../instance/index'
import Header from 'Components/header/header'
import {Link, useNavigate, useParams} from "react-router-dom";
import {Modal} from 'react-bootstrap';
import DataLoading from "ui/dataLoading";
import "./Group.scss"
import './style.css'
import CheckUser from "../../Securty/CheckUser";
function RatingCourse(props) {
    const { courseId } = useParams();


    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([  ])
    ;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingID, setEditingID] = useState(false);
    const [form, setForm] = useState({
        name: "",
        count: 0,
        kurs: courseId
    })
    const [isSaving, setIsSaving] = useState(false);

    function getData() {
        setLoading(true)
        setTimeout(() => {
            apiCall('/groups/public', 'get').then(data => {
                setData(data.data)
               setLoading(false)
            })
        }, 1000)
    }


    useEffect(() => {
        getData()
    }, [])

    function saveData() {
        if (isSaving) return;
        setIsSaving(true);
        if (!editingID) {
            apiCall("/groups", "POST", form).then(({data}) => {
                getData()
                setIsSaving(false)
                setIsModalOpen(false);
                setEditingID(false);
            })
        } else {
            apiCall("/groups/" + editingID, "PUT", form).then(({data}) => {
                getData()
                setIsSaving(false)
                setIsModalOpen(false);
            })
        }
        closeModal()
    }

    function closeModal() {
        setIsModalOpen(false);
        setForm({
            name: "",
            count: 0,
            kurs: courseId
        })
    }

    function editItem(item) {
        setForm({name: item.name, count: item.studentCount, kurs: courseId});
        setEditingID(item.id);
        setIsModalOpen(true);
    };


    function deleteItem(id) {
        setLoading(true)
        setTimeout(() => {
            apiCall("/groups/" + id, "DELETE", null).then(res => {
                if (localStorage.getItem('selectedGroup') === id) {
                    localStorage.removeItem('selectedGroup')
                }
                getData();
            })
        }, 1000);
    }

    const navigate = useNavigate();
    return (

        <div className={'my-group'}>
            <div>
                <Header/>
            </div>
            <div style={{marginTop: '200px'}} className={'container '}>
                <div>
                    <h1>{courseId}-kurs</h1>
                </div>
                <div  className={'container d-flex gap-4'}>

                    {loading ? <DataLoading/> :

                        data?.filter(group => group.kurs == courseId).map(item =>
                            <Link to={`${item.id}`}>
                                <div className="col-lg-2 order-lg-1 order-2 ">
                                    <div
                                        className="event_date d-flex flex-column align-items-center justify-content-center">
                                        <Link to={`${item.id}`} className="event_day">{item.name}</Link>
                                        <div className="event_month">talabalar({item.studentCount})</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                    <CheckUser>
                        <div onClick={() => setIsModalOpen(true)}
                             className="col-lg-2 order-lg-1 order-2 ">
                            <div
                                style={{cursor: "pointer"}}
                                className="rounded cursor-pointer event_date d-flex flex-column align-items-center justify-content-center">
                                <div className="event_plus">+</div>
                                <div className="event_month mx-1 text-center">yangi guruh qo'shish</div>
                            </div>
                        </div>
                    </CheckUser>

                </div>

            </div>

            <div className={' umodal'}>
                <Modal show={isModalOpen} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Yangi Guruh qo'shish</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <label>Guruh nomi:</label>
                        <input
                            className={"form-control"}
                            type={'text'}
                            value={form.name}
                            placeholder={""}
                            onChange={(e) => setForm(({...form, name: e.target.value}))}
                        />
                        <label className={'my-2'}>guruh talabalari soni</label>
                        <input
                            className={"form-control mt-2"}
                            type={'number'}
                            value={form.count}
                            placeholder={"Talabalar Soni.."}
                            onChange={(e) => setForm(({...form, count: e.target.value}))}
                        />


                        <div type={" submit"}
                             onClick={saveData}
                             disabled={isSaving}
                             className="my-3 button button_color_1 text-center trans_200 btn btn-warning">saqlash
                        </div>

                    </Modal.Body>

                </Modal>
            </div>


        </div>
    );
}

export default RatingCourse;
