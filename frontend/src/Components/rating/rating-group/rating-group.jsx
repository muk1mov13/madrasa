import React, {useState, useEffect} from 'react';
import Header from "../../header/header";
import CheckUser from "../../Securty/CheckUser";
import {useParams} from "react-router-dom";
import apiCall from "../../../instance";

function RatingGroup(props) {
    const {groupId} = useParams();

    const [currentGroup, setCurrentGroup] = useState({});
    const [students, setStudents] = useState([])
    const [subjects, setSubjects] = useState([])
    const [ratings, setRatings]=useState([])


    const [studentName, setStudentName] = useState('')
    const [subjectName, setSubjectName] = useState('')

    function getData() {
        apiCall('/groups/public/' + groupId, 'get').then(res => {
            setCurrentGroup(res.data.body)
        })
        console.log(groupId)
        apiCall('/student/public/' + groupId, 'get').then(res => {

             setStudents(res.data)
        })

        apiCall('/subject/' + groupId, 'get').then(res => {
             setSubjects(res.data)
        })
        apiCall('/rating/' + groupId, 'get').then(res => {
            setRatings(res.data.body)
            console.log(res.data.body)
        })

    }

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
        apiCall('/student', 'post', data).then(res =>
            getData()
        )
        setStudentName('')
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
    const [mark, setMark]=useState('')
    function createRating(baho, studentId, subjectId){
        setMark(baho)
        let data={
            subjectId,
            studentId,
            mark
        }
        setTimeout(() => {

        }, 1000);

        apiCall('/rating', 'post', data).then(res =>
            getData()
        )
    }
    return (
        <div>
            <Header/>
            <div style={{marginTop: '200px'}} className={'container'}>
                <div>
                    <h1>{currentGroup?.name} guruh</h1>
                </div>
                <table className={'table table-bordered text-center'}>
                    <thead>
                    <tr>
                        <th style={{width: '50px'}}>№</th>
                        <th>O'quvchilar</th>
                        {subjects.map(item=>
                            <th>{item.name}</th>
                        )}
                        <th>
                            <CheckUser>
                                <div style={{width: '200px'}} className={'d-flex m-0 p-0'}>
                                    <input value={subjectName} onChange={(e) => {
                                        setSubjectName(e.target.value)
                                    }} placeholder={"fan qo'shish"} className={'form-control shadow-none border border-0 '}/>
                                    <button onClick={saveSubject} className={'btn btn-warning'}>+</button>
                                </div>
                            </CheckUser>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        ratings?.map((rating,index)=>

                            <tr className={'text-center'}>
                                <th>{index + 1}</th>
                                <td>{rating?.student.name}</td>
                                {subjects.map(subject => {
                                    const filteredRatings = rating?.getRating.filter(item => item.subject.id === subject.id);
                                    if (filteredRatings.length === 0) {
                                        return <td  key={subject.id} >
                                            <input  type={"number"}  maxLength={3} onChange={(e)=>createRating(e.target.value,rating.student.id, subject.id)} className={'form-control shadow-none border border-0'}/>
                                        </td>;
                                    } else {
                                        return filteredRatings.map(result => (
                                            <td key={result.id}>{result.mark}</td>
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
                                    }} placeholder={"O'quvchi qo'shish"} className={'form-control shadow-none border border-0'}/>
                                    <button onClick={saveStudent} className={'btn btn-warning'}>+</button>
                                </div>
                            </CheckUser>
                        </td>
                        {
                            subjects.map(item=>
                            <td></td>
                            )
                        }
                        <td></td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RatingGroup;