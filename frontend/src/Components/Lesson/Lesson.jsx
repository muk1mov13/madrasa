import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import {useLocation, useParams} from "react-router-dom";
import Header from "../header/header";
import apiCall from '../../instance/index';
import CheckUser from "../Securty/CheckUser";
import subjectImg from './books.png';
import teacherImg from './teache.png';


function Lesson(props) {
    const {groupId} = useParams();
    const [weekDays, setWeekdays] = useState([]);
    const [currentGroup, setCurrentGroup] = useState({});
    const [lessons, setLessons] = useState([]);
    const location = useLocation();

    const [lessonName, setLessonName] = useState('');
    const [room, setRoom] = useState('');
    const [teacher, setTeacher] = useState('');
    const [para, setPara] = useState('');
    const [selectedWeekId, setSelectedWeekId] = useState(null); // Track the selected week ID

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state for API calls

    useEffect(() => {
        getCurrentGroup();
    }, [location.pathname]);

    function getCurrentGroup() {
        setIsLoading(true); // Set loading state while fetching data
        Promise.all([
            apiCall('/weekday/public', 'get'),
            apiCall('/groups/public/' + groupId, 'get'),
            apiCall('/lesson/public/' + groupId, 'get')
        ])
            .then(([weekResponse, groupResponse, lessonResponse]) => {
                setWeekdays(weekResponse.data);
                setCurrentGroup(groupResponse.data.body);
                setLessons(lessonResponse.data.body);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setIsLoading(false); // Clear loading state
            });
    }

    const [edit, setEdit] = useState('')

    function changeInput(weekId, para, lesson) {
        setEdit(lesson.id)

        setSelectedWeekId(weekId);
        setPara(para)
        setTeacher(lesson.teacher)
        setLessonName(lesson.name)
        setRoom(lesson.room)
    }

    const [showInp, setShowInp]=useState('')

    function createLesson(weekId, para) {

        setSelectedWeekId(weekId);
        setPara(para)
    }

    function closeModal() {
        setIsModalOpen(false);
        setSelectedWeekId(null);
        setPara(null)
        setTeacher('')
        setLessonName('')
        setRoom('')
    }

    function saveLesson() {
        setIsSaving(true); // Set saving/loading state
        document.getElementById('yangiQoshish').classList.add('d-none');

        const data = {
            groupId: groupId,
            para: para,
            name: lessonName,
            room: room,
            teacher: teacher,
            weekId: selectedWeekId
        };
        window.location.reload()
        if (edit === '') {
            apiCall('/lesson/' + groupId, 'post', data)
                .then(response => {
                    console.log('Lesson saved successfully:', response.data);
                    closeModal()
                    getCurrentGroup()
                    document.getElementById('yangiQoshish').classList.remove('d-none');

                })
                .catch(error => {
                    console.error('Error saving lesson:', error);
                })
                .finally(() => {
                    setIsSaving(false);
                });
        } else {
            apiCall('/lesson/' + edit, 'put', data)
                .then(response => {
                    console.log('Lesson saved successfully:', response.data);
                    closeModal()
                    document.getElementById('yangiQoshish').classList.remove('d-none');

                    getCurrentGroup()
                })
                .catch(error => {
                    console.error('Error saving lesson:', error);
                })
                .finally(() => {
                    setIsSaving(false);
                });
            setEdit('')
        }
setShowInp('')
    }
    function deleteLesson(id) {
        apiCall('/lesson/' + id, 'delete').then(res=>{
            getCurrentGroup()
            setShowInp('')
        })
    }
    function closeInp(){
        setShowInp('')


    }

    const [hasUser, setHasUser] = useState(false)

    function getUser() {
        let token = localStorage.getItem('access_token');
        if (token !== null) {
            axios({
                url: 'http://localhost:8080/api/auth/me', method: 'get', headers: {
                    Authorization: token,
                }
            }).then(res => {
                if (res.data.phone !== null) {
                    setHasUser(true)
                }
            }).catch(err => {
                setHasUser(false)
            })
        } else {
            setHasUser(false);
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
            <Header/>
            <div style={{marginTop: '200px'}} className={'container'}>
                <div>
                    <h2>Guruh nomi: {currentGroup.name}</h2>
                </div>
                <div>
                    <table className={'table table-bordered text-center'}>
                        <thead>
                        <tr className={'table-primary'}>
                            <th scope={'col'}>Para</th>
                            {weekDays.map((week, index) => (
                                <React.Fragment key={week.id}>
                                    <th
                                        className={index % 2 == 0 ? 'table-warning' : 'table-primary'}
                                        scope={'col'}>{week.name}</th>
                                    <th className={index % 2 == 0 ? 'table-warning' : 'table-primary'}
                                        scope={'col'}>xona
                                    </th>
                                </React.Fragment>
                            ))}
                        </tr>
                        </thead>

                        <tbody>

                        {[0, 1, 2, 3, 4].map(darsSoati =>
                            <tr>
                                <td className={'table-primary'}><b>{darsSoati}</b></td>
                                {weekDays.map((week, index) => {
                                    const filteredLessons = lessons.filter(les => les.para === darsSoati && les.weekDay?.id === week.id);
                                    return (
                                        <React.Fragment key={week.id}>
                                            {filteredLessons.length === 0 ? (
                                                <>
                                                    <td onClick={() => {
                                                        createLesson(week.id, darsSoati)
                                                        showInp!==week.name+ darsSoati&&closeModal()
                                                        setShowInp(week.name+ darsSoati)

                                                    }}  className={index % 2 == 0 ? 'table-warning' : 'table-primary'}>
                                                        {
                                                            showInp===week.name+ darsSoati?
                                                                <CheckUser>
                                                                <div id={'yangiQoshish'} className={showInp===week.name+ darsSoati?'':'d-none'}>
                                                                    <label>Dars nomi:</label>
                                                                    <input
                                                                        className={"form-control"}
                                                                        type={'text'}
                                                                        value={lessonName}
                                                                        placeholder={""}
                                                                        onChange={(e) => {
                                                                            setLessonName(e.target.value);
                                                                        }}
                                                                    />
                                                                    <label className={'my-2'}>Dars o'qituvchisi</label>
                                                                    <input
                                                                        className={"form-control mt-2"}
                                                                        type={'text'}
                                                                        value={teacher}
                                                                        placeholder={"O'qituvchi nomi.."}
                                                                        onChange={(e) => {
                                                                            setTeacher(e.target.value);
                                                                        }}
                                                                    />
                                                                    <label className={'my-2'}>Dars xonasi</label>
                                                                    <input
                                                                        className={"form-control mt-2"}
                                                                        type={'text'}
                                                                        value={room}
                                                                        placeholder={"Xona.."}
                                                                        onChange={(e) => {
                                                                            setRoom(e.target.value);
                                                                        }}
                                                                    />
                                                                    <div
                                                                        type={"submit"}
                                                                        disabled={isSaving || isLoading}
                                                                        className=" my-1 button button_color_1 text-center trans_200 btn btn-warning"
                                                                        onClick={saveLesson}
                                                                    >
                                                                        {isSaving ? 'Saqlanmoqda...' : 'Saqlash'}
                                                                    </div>
                                                                    <button
                                                                        className="my-1 button button_color_1 text-center trans_200 btn btn-dark"
                                                                        onClick={() => {
                                                                            closeInp();
                                                                            // Add code here to hide the element with id 'yangiQoshish'
                                                                            document.getElementById('yangiQoshish').classList.add('d-none');
                                                                        }}
                                                                    >
                                                                        yopish
                                                                    </button>
                                                                </div>
                                                                </CheckUser>
                                                                    :''
                                                        }
                                                    </td>
                                                    <td className={index % 2 == 0 ? 'table-warning' : 'table-primary'}></td>
                                                </>
                                            ) : (
                                                filteredLessons.map((item) => (
                                                    <React.Fragment key={item.id}>
                                                        <td
                                                            className={index % 2 == 0 ? 'table-warning' : 'table-primary'}
                                                            >
                                                            {
                                                                showInp===item.id?
                                                                    <CheckUser>
                                                                    <div id={'yangiQoshish'} >
                                                                        <label>Dars nomi:</label>
                                                                        <input
                                                                            className={"form-control"}
                                                                            type={'text'}
                                                                            value={lessonName}
                                                                            placeholder={""}
                                                                            onChange={(e) => {
                                                                                setLessonName(e.target.value);
                                                                            }}
                                                                        />
                                                                        <label className={'my-2'}>Dars o'qituvchisi</label>
                                                                        <input
                                                                            className={"form-control mt-2"}
                                                                            type={'text'}
                                                                            value={teacher}
                                                                            placeholder={"O'qituvchi nomi.."}
                                                                            onChange={(e) => {
                                                                                setTeacher(e.target.value);
                                                                            }}
                                                                        />
                                                                        <label className={'my-2'}>Dars xonasi</label>
                                                                        <input
                                                                            className={"form-control mt-2"}
                                                                            type={'text'}
                                                                            value={room}
                                                                            placeholder={"Xona.."}
                                                                            onChange={(e) => {
                                                                                setRoom(e.target.value);
                                                                            }}
                                                                        />
                                                                        <div
                                                                            type={"submit"}
                                                                            disabled={isSaving || isLoading}
                                                                            className=" my-1 button button_color_1 text-center trans_200 btn btn-warning"
                                                                            onClick={()=>{
                                                                                saveLesson()
                                                                                closeInp()
                                                                                setShowInp(false)

                                                                            }}
                                                                        >
                                                                            {isSaving ? 'Saqlanmoqda...' : 'Saqlash'}
                                                                        </div>
                                                                        <button
                                                                            className="my-1 button button_color_1 text-center trans_200 btn btn-dark"
                                                                            onClick={() => {
                                                                                closeInp();
                                                                                setShowInp(false)
                                                                            }}
                                                                        >
                                                                            yopish
                                                                        </button>
                                                                        <button
                                                                            className="my-1 button button_color_1 text-center trans_200 btn btn-danger"
                                                                            onClick={() => {
                                                                                deleteLesson(item.id)
                                                                                setShowInp(false)
                                                                            }}
                                                                        >
                                                                            O'chirish
                                                                        </button>
                                                                    </div>
                                                                    </CheckUser>
                                                                    :
                                                                  <>
                                                                  {hasUser?
                                                                      <div
                                                                          onClick={() => {
                                                                              changeInput(week.id, darsSoati, item)
                                                                              setShowInp(item.id)
                                                                          }}
                                                                      >
                                                                          <b className={'text-success'}><img width={25} height={25}
                                                                                                             src={subjectImg}/> {item.name}
                                                                          </b>
                                                                          <br/>
                                                                          <div className={'text-start'}>
                                                                              <b className={'text-primary'}><img width={25}
                                                                                                                 height={25}
                                                                                                                 src={teacherImg}/> {item.teacher}
                                                                              </b>
                                                                          </div>
                                                                      </div>
                                                                  :
                                                                      <div

                                                                      >
                                                                          <b className={'text-success'}><img width={25} height={25}
                                                                                                             src={subjectImg}/> {item.name}
                                                                          </b>
                                                                          <br/>
                                                                          <div className={'text-start'}>
                                                                              <b className={'text-primary'}><img width={25}
                                                                                                                 height={25}
                                                                                                                 src={teacherImg}/> {item.teacher}
                                                                              </b>
                                                                          </div>
                                                                      </div>
                                                                  }
                                                                  </>
                                                            }

                                                        </td>
                                                        <td
                                                            style={{fontSize: '22px'}}
                                                            className={index % 2 == 0 ? 'table-warning text-danger' : 'table-primary text-danger'}>{item.room}
                                                        </td>
                                                    </React.Fragment>
                                                ))
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </tr>
                        )}


                        </tbody>
                        {/*<tbody>*/}

                        {/*{[0, 1, 2, 3, 4].map(darsSoati =>*/}
                        {/*    <tr>*/}
                        {/*        <td className={'table-primary'}><b>{darsSoati}</b></td>*/}
                        {/*        {weekDays.map((week, index) => {*/}
                        {/*            const filteredLessons = lessons.filter(les => les.para === darsSoati && les.weekDay?.id === week.id);*/}
                        {/*            return (*/}
                        {/*                <React.Fragment key={week.id}>*/}
                        {/*                    {filteredLessons.length === 0 ? (*/}
                        {/*                        <>*/}
                        {/*                            <td onClick={() => createLesson(week.id, darsSoati)}>*/}
                        {/*                                {*/}

                        {/*                                }*/}
                        {/*                            </td>*/}
                        {/*                            <td></td>*/}
                        {/*                        </>*/}
                        {/*                    ) : (*/}
                        {/*                        filteredLessons.map((item) => (*/}
                        {/*                            <React.Fragment key={item.id}>*/}
                        {/*                                <td*/}
                        {/*                                    className={index % 2 == 0 ? 'table-warning' : 'table-primary'}*/}
                        {/*                                    onClick={() => changeInput(week.id, darsSoati, item)}>*/}
                        {/*                                    <b className={'text-success'}><img width={25} height={25}*/}
                        {/*                                                                       src={subjectImg}/> {item.name}*/}
                        {/*                                    </b>*/}
                        {/*                                    <br/>*/}
                        {/*                                    <div className={'text-start'}>*/}
                        {/*                                        <b className={'text-primary'}><img width={25}*/}
                        {/*                                                                           height={25}*/}
                        {/*                                                                           src={teacherImg}/> {item.teacher}*/}
                        {/*                                        </b>*/}
                        {/*                                    </div>*/}

                        {/*                                </td>*/}
                        {/*                                <td*/}
                        {/*                                    style={{fontSize: '22px'}}*/}
                        {/*                                    className={index % 2 == 0 ? 'table-warning text-danger' : 'table-primary text-danger'}>{item.room}*/}
                        {/*                                </td>*/}
                        {/*                            </React.Fragment>*/}
                        {/*                        ))*/}
                        {/*                    )}*/}
                        {/*                </React.Fragment>*/}
                        {/*            );*/}
                        {/*        })}*/}
                        {/*    </tr>*/}
                        {/*)}*/}


                        {/*</tbody>*/}
                    </table>
                </div>
            </div>
            <CheckUser>
                <div className={'umodal'}>
                    <Modal show={isModalOpen} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Dars</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label>Dars nomi:</label>
                            <input
                                className={"form-control"}
                                type={'text'}
                                value={lessonName}
                                placeholder={""}
                                onChange={(e) => {
                                    setLessonName(e.target.value);
                                }}
                            />
                            <label className={'my-2'}>Dars o'qituvchisi</label>
                            <input
                                className={"form-control mt-2"}
                                type={'text'}
                                value={teacher}
                                placeholder={"O'qituvchi nomi.."}
                                onChange={(e) => {
                                    setTeacher(e.target.value);
                                }}
                            />
                            <label className={'my-2'}>Dars xonasi</label>
                            <input
                                className={"form-control mt-2"}
                                type={'text'}
                                value={room}
                                placeholder={"Xona.."}
                                onChange={(e) => {
                                    setRoom(e.target.value);
                                }}
                            />
                            <div
                                type={"submit"}
                                disabled={isSaving || isLoading}
                                className=" my-1 button button_color_1 text-center trans_200 btn btn-warning"
                                onClick={saveLesson}
                            >
                                {isSaving ? 'Saving...' : 'Saqlash'}
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </CheckUser>
        </div>
    );
}

export default Lesson;
