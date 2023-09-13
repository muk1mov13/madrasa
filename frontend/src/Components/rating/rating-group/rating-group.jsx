import React, {useState, useEffect} from 'react';
import Header from "../../header/header";
import CheckUser from "../../Securty/CheckUser";
import {useParams} from "react-router-dom";
import apiCall from "../../../instance";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';

function RatingGroup(props) {
    const {groupId} = useParams();

    const [currentGroup, setCurrentGroup] = useState({});
    const [students, setStudents] = useState([])
    const [subjects, setSubjects] = useState([])
    const [ratings, setRatings] = useState([])


    const [studentName, setStudentName] = useState('')
    const [subjectName, setSubjectName] = useState('')

    function getData() {
        apiCall('/groups/public/' + groupId, 'get').then(res => {
            setCurrentGroup(res.data.body)
        })
        apiCall('/student/public/' + groupId, 'get').then(res => {

            setStudents(res.data)
        })

        apiCall('/subject/' + groupId, 'get').then(res => {
            setSubjects(res.data)
        })
        apiCall('/rating/' + groupId, 'get').then(res => {
            setRatings(res.data.body)
        })

    }

    console.log(ratings)

    useEffect(() => {
        getData()
    }, [])


    function saveStudent() {
        if (studentName === '') {
            return;
        }
        let data = {
            name: studentName,
            groupId: groupId
        }
        apiCall('/student', 'post', data).then(res => {
                getData()
                setStudentName('')
            }
        )
    }

    function saveSubject() {
        if (subjectName === '') {
            return;
        }
        let data = {
            name: subjectName,
            groupId: groupId
        }

        apiCall('/subject/', 'post', data).then(res =>
            getData()
        )
        setSubjectName('')
    }

    const [inputValue, setInputValue] = useState('');
    const [show, setShow] = useState('')

    function createRating(studentId, subjectId) {
        setShow('')
        if (inputValue === '') {
            getData()
            return;
        }
        setShow('');

        let data = {
            studentId,
            subjectId,
            mark: inputValue
        };

        apiCall('/rating', 'post', data).then((res) => getData());
        setInputValue('')
        window.location.reload()

    }

    function setInputValueJon(son) {
        if (son > 100) {
            alert("siz 100 dan katta son kirita olmaysiz")
        } else {
            setInputValue(son)
        }
    }

    function editRating(ratingId, studentId, subjectId) {
        if (inputValue === '') {
            return;
        }
        let data = {
            studentId,
            subjectId,
            mark: inputValue
        };

        apiCall('/rating/' + ratingId, 'put', data).then((res) => getData());
        setShow('');
        setInputValue('')
        window.location.reload()
    }


    const [showName, setShowName] = useState('')
    const [studentEditName, setStudentEditName] = useState('')

    function editStudent(id) {
        if (studentEditName === '') {
            return;
        }
        let data = {
            name: studentEditName,
            groupId: groupId
        }
        apiCall('/student/' + id, 'put', data).then(res => {
            getData()
            setShowName('')
        })
        setStudentEditName('')
    }

    const [showSubject, setShowSubject] = useState('')
    const [subjectEditName, setSubjectEditName] = useState('')

    function editSubject(id) {
        if (subjectEditName === '') {
            getData()
            return;
        }
        let data = {
            name: subjectEditName,
            groupId: groupId
        }
        console.log(id, data)
        apiCall('/subject/' + id, 'put', data).then(res => {
            getData()
            setShowSubject('')
        })
        setSubjectEditName('')
    }


    function deleteAll(path) {
        setShowSubject('')

        setSubjectEditName('')
        apiCall(path, 'delete').then(res => {
            getData()
        })
        window.location.reload()
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


    const [selectedColor, setSelectedColor] = useState('');
    const [color, setColor] = useState('');

    const handleColorChange = (e, id) => {
        setColor(e)
        apiCall('/student/color/' + id + '/' + e, 'put').then(res => {
            getData()
        })
    };

    return (
        <div>
            <Header/>
            <div style={{marginTop: '200px'}} className={'container'}>
                <div>
                    <h1>{currentGroup?.name} guruh</h1>
                </div>
                {hasUser ?
                    <table className={'table table-bordered text-center'}>
                        <thead>
                        <tr>
                            <th style={{width: '50px'}}>№</th>
                            <th>O'quvchilar</th>
                            <th></th>
                            {subjects.map((item, index) =>
                                <td onClick={() => {
                                    setShowSubject(index);
                                    setSubjectEditName(item.name)
                                }}>
                                    <div className={'d-flex'}>
                                        <input
                                            type={"text"}
                                            max={100}
                                            min={0}
                                            className={'form-control shadow-none border border-0 w-75'}
                                            value={index === showSubject ? subjectEditName : item.name}
                                            onChange={(e) => setSubjectEditName(e.target.value)}
                                        />
                                       <div className={'btn-group'}>
                                           <button
                                               className={'btn btn-warning ' + (index === showSubject ? '' : 'd-none')}
                                               onClick={() => editSubject(item.id)}
                                           >
                                               Save
                                           </button>
                                           <button
                                               className={'btn btn-warning ' + (index === showSubject ? '' : 'd-none')}
                                               onClick={() => deleteAll('/subject/' + item?.id)}
                                           >
                                               delete
                                           </button>
                                       </div>
                                    </div>
                                </td>
                            )}
                            <th>
                                <CheckUser>
                                    <div style={{width: '200px'}} className={'d-flex m-0 p-0'}>
                                        <input value={subjectName} onChange={(e) => {
                                            setSubjectName(e.target.value)
                                        }} placeholder={"fan qo'shish"}
                                               className={'form-control shadow-none border border-0 '}/>
                                        <button onClick={saveSubject} className={'btn btn-warning'}>+</button>
                                    </div>
                                </CheckUser>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            ratings?.map((rating, index) =>

                                <tr key={index + rating.id} className={'text-center'}>
                                    <th>{index + 1}</th>

                                    <td onClick={() => {
                                        setShowName(index);
                                        setStudentEditName(rating?.student.name)
                                    }}>
                                        <div className={'d-flex'}>
                                            <input
                                                type={"text"}
                                                max={100}
                                                min={0}
                                                className={'form-control shadow-none border border-0 w-75'}
                                                value={index === showName ? studentEditName : rating?.student.name}
                                                onChange={(e) => setStudentEditName(e.target.value)}
                                            />
                                            <div className={'btn-group'}>
                                                <button
                                                    className={'btn btn-warning ' + (index === showName ? '' : 'd-none')}
                                                    onClick={() => editStudent(rating?.student.id)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className={'btn btn-warning ' + (index === showName ? '' : 'd-none')}
                                                    onClick={() => deleteAll('/student/' + rating?.student.id)}
                                                >
                                                    delete
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle style={{
                                                backgroundColor: rating.student.color,
                                                width: '80px',
                                                height: '40px'
                                            }} variant="success" id={`dropdown-${rating?.student.id}`}>

                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    href="#"
                                                    style={{backgroundColor: 'red', color: 'white'}}
                                                    onClick={() => handleColorChange('red', rating?.student.id)}
                                                >
                                                    Red
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    href="#"
                                                    style={{backgroundColor: 'yellow', color: 'black'}}
                                                    onClick={() => handleColorChange('yellow', rating?.student.id)}
                                                >
                                                    Yellow
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    href="#"
                                                    style={{backgroundColor: 'green', color: 'white'}}
                                                    onClick={() => handleColorChange('green', rating?.student.id)}
                                                >
                                                    Green
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>

                                    {subjects.map(subject => {
                                        const filteredRatings = rating?.getRating.filter(item => item.subject.id === subject.id);
                                        if (filteredRatings.length === 0) {
                                            return <td key={subject.id} onClick={() => {
                                                setShow(subject.name + rating.student.name)
                                                setInputValue('')
                                            }}>
                                                <div className={'d-flex'}>
                                                    <input
                                                        type={"number"}
                                                        max={100}
                                                        min={0}
                                                        className={'form-control shadow-none border border-0'}
                                                        value={show === subject.name + rating.student.name ? inputValue : ''}
                                                        onChange={(e) => setInputValueJon(e.target.value)}
                                                    />
                                                    <button
                                                        className={'btn btn-warning ' + (show === subject.name + rating?.student.name ? '' : 'd-none')}
                                                        onClick={() => createRating(rating.student.id, subject.id)}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </td>
                                        } else {
                                            return filteredRatings.map(result => (
                                                <td key={subject.id} onClick={() => {
                                                    setShow(subject.name + rating.student.name)
                                                    setInputValue(result.mark)
                                                }}>
                                                    <div className={'d-flex'}>
                                                        <input
                                                            type={"number"}
                                                            max={100}
                                                            min={0}
                                                            className={'form-control shadow-none border border-0'}
                                                            value={show === subject.name + rating.student.name ? inputValue : result.mark}
                                                            onChange={(e) => setInputValueJon(e.target.value)}
                                                        />

                                                        <button
                                                            className={'btn btn-warning ' + (show === subject.name + rating?.student.name ? '' : 'd-none')}
                                                            onClick={() => editRating(result.id, rating.student.id, subject.id)}
                                                        >
                                                            Save
                                                        </button>
                                                    </div>

                                                </td>
                                            ));
                                        }
                                    })}
                                    <td></td>
                                </tr>
                            )
                        }


                        <tr>
                            <th>

                            </th>
                            <td>
                                <CheckUser>
                                    <div className={'d-flex'}>
                                        <input value={studentName} onChange={(e) => {
                                            setStudentName(e.target.value)
                                        }} placeholder={"O'quvchi qo'shish"}
                                               className={'form-control shadow-none border border-0'}/>
                                        <button onClick={saveStudent} className={'btn btn-warning'}>+</button>
                                    </div>
                                </CheckUser>
                            </td>
                            {
                                subjects.map(item =>
                                    <td></td>
                                )
                            }
                            <td></td>
                        </tr>

                        </tbody>
                    </table> :

                    <table className={'table table-bordered text-center'}>
                        <thead>
                        <tr>
                            <th style={{width: '50px'}}>№</th>
                            <th style={{width: '300px'}}>O'quvchilar</th>
                            {subjects.map((item, index) =>
                                <td>
                                    {item.name}
                                </td>
                            )}

                        </tr>
                        </thead>
                        <tbody>
                        {
                            ratings?.map((rating, index) =>

                                <tr key={index + rating.id} className={'text-center'}>
                                    <th>{index + 1}</th>

                                    <td>
                                        {rating?.student.name}
                                    </td>
                                    {subjects.map(subject => {
                                        const filteredRatings = rating?.getRating.filter(item => item.subject.id === subject.id);
                                        if (filteredRatings.length === 0) {
                                            return <td></td>
                                        } else {
                                            return filteredRatings.map(result => (
                                                <td>
                                                    {result?.mark}

                                                </td>
                                            ));
                                        }
                                    })}

                                </tr>
                            )
                        }
                        </tbody>
                    </table>}
            </div>
        </div>
    );
}

export default RatingGroup;