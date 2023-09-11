import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import {useLocation, useParams} from "react-router-dom";
import Header from "../header/header";
import apiCall from '../../instance/index';
import CheckUser from "../Securty/CheckUser";

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
        setIsModalOpen(true);
        setSelectedWeekId(weekId);
        setPara(para)
        setTeacher(lesson.teacher)
        setLessonName(lesson.name)
        setRoom(lesson.room)
    }

    function createLesson(weekId, para) {
        setIsModalOpen(true);
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

        const data = {
            groupId: groupId,
            para: para,
            name: lessonName,
            room: room,
            teacher: teacher,
            weekId: selectedWeekId
        };
        if (edit === '') {
            apiCall('/lesson/' + groupId, 'post', data)
                .then(response => {
                    console.log('Lesson saved successfully:', response.data);
                    closeModal()
                    getCurrentGroup()
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

    }

    return (
        <div>
            <Header/>
            <div style={{marginTop: '200px'}} className={'container'}>
                <div>
                    <h2>Guruh nomi: {currentGroup.name}</h2>
                </div>
                <div>
                    <table className={'table table-bordered'}>
                        <thead>
                        <tr>
                            <th></th>
                            {weekDays.map(week => (
                                <React.Fragment key={week.id}>
                                    <th>{week.name}</th>
                                    <th>xona</th>
                                </React.Fragment>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>0</td>
                            {weekDays.map(week => {
                                const filteredLessons = lessons.filter(les => les.para === 0 && les.weekDay?.id === week.id);
                                return (
                                    <React.Fragment key={week.id}>
                                        {filteredLessons.length === 0 ? (
                                            <>
                                                {/*<CheckUser>*/}
                                                <td onClick={() => createLesson(week.id, 0)}>

                                                </td>
                                                {/*</CheckUser>*/}
                                                <td>

                                                </td>
                                            </>
                                        ) : (
                                            filteredLessons.map(item => (
                                                <React.Fragment key={item.id}>
                                                    {/*<CheckUser>*/}
                                                    <td onClick={() => changeInput(week.id, 0, item)}>
                                                        {item.name} <br/>
                                                        {item.teacher}
                                                    </td>
                                                    {/*</CheckUser>*/}
                                                    <td>{item.room}</td>
                                                </React.Fragment>
                                            ))
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tr>
                        <tr>
                            <td>1</td>
                            {weekDays.map(week => {
                                const filteredLessons = lessons.filter(les => les.para === 1 && les.weekDay?.id === week.id);
                                return (
                                    <React.Fragment key={week.id}>
                                        {filteredLessons.length === 0 ? (
                                            <>
                                                {/*<CheckUser>*/}
                                                <td onClick={() => createLesson(week.id, 1)}>

                                                </td>
                                                {/*</CheckUser>*/}
                                                <td>

                                                </td>
                                            </>
                                        ) : (
                                            filteredLessons.map(item => (
                                                <React.Fragment key={item.id}>
                                                    {/*<CheckUser>*/}
                                                    <td onClick={() => changeInput(week.id, 1, item)}>
                                                        {item.name} <br/>
                                                        {item.teacher}
                                                    </td>
                                                    {/*</CheckUser>*/}
                                                    <td>{item.room}</td>
                                                </React.Fragment>
                                            ))
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tr>
                        <tr>
                            <td>2</td>
                            {weekDays.map(week => {
                                const filteredLessons = lessons.filter(les => les.para === 2 && les.weekDay?.id === week.id);
                                return (
                                    <React.Fragment key={week.id}>
                                        {filteredLessons.length === 0 ? (
                                            <>
                                                {/*<CheckUser>*/}
                                                <td onClick={() => createLesson(week.id, 2)}>

                                                </td>
                                                {/*</CheckUser>*/}
                                                <td>

                                                </td>
                                            </>
                                        ) : (
                                            filteredLessons.map(item => (
                                                <React.Fragment key={item.id}>
                                                    {/*<CheckUser>*/}
                                                    <td onClick={() => changeInput(week.id, 2, item)}>
                                                        {item.name} <br/>
                                                        {item.teacher}
                                                    </td>
                                                    {/*</CheckUser>*/}
                                                    <td>{item.room}</td>
                                                </React.Fragment>
                                            ))
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tr>
                        <tr>
                            <td>3</td>
                            {weekDays.map(week => {
                                const filteredLessons = lessons.filter(les => les.para === 3 && les.weekDay?.id === week.id);
                                return (
                                    <React.Fragment key={week.id}>
                                        {filteredLessons.length === 0 ? (
                                            <>
                                                {/*<CheckUser>*/}
                                                <td onClick={() => createLesson(week.id, 3)}>

                                                </td>
                                                {/*</CheckUser>*/}
                                                <td>

                                                </td>
                                            </>
                                        ) : (
                                            filteredLessons.map(item => (
                                                <React.Fragment key={item.id}>
                                                    {/*<CheckUser>*/}
                                                    <td onClick={() => changeInput(week.id, 3, item)}>
                                                        {item.name} <br/>
                                                        {item.teacher}
                                                    </td>
                                                    {/*</CheckUser>*/}
                                                    <td>{item.room}</td>
                                                </React.Fragment>
                                            ))
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tr>
                        <tr>
                            <td>4</td>
                            {weekDays.map(week => {
                                const filteredLessons = lessons.filter(les => les.para === 4 && les.weekDay?.id === week.id);
                                return (
                                    <React.Fragment key={week.id}>
                                        {filteredLessons.length === 0 ? (
                                            <>
                                                {/*<CheckUser>*/}
                                                <td onClick={() => createLesson(week.id, 4)}>

                                                </td>
                                                {/*</CheckUser>*/}
                                                <td>

                                                </td>
                                            </>
                                        ) : (
                                            filteredLessons.map(item => (
                                                <React.Fragment key={item.id}>
                                                    {/*<CheckUser>*/}
                                                    <td onClick={() => changeInput(week.id, 4, item)}>
                                                        {item.name} <br/>
                                                        {item.teacher}
                                                    </td>
                                                    {/*</CheckUser>*/}
                                                    <td>{item.room}</td>
                                                </React.Fragment>
                                            ))
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
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
        </div>
    );
}

export default Lesson;
