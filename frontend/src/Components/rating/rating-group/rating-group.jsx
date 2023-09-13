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
    const [ratings, setRatings]=useState([])


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
    const [show, setShow]=useState('')
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
    function setInputValueJon(son){
        if(son>100){
            alert("siz 100 dan katta son kirita olmaysiz")
        }else {
            setInputValue(son)
        }
    }
    function editRating(ratingId, studentId, subjectId){
        if (inputValue === '') {
            return;
        }
        let data = {
            studentId,
            subjectId,
            mark: inputValue
        };

        apiCall('/rating/'+ratingId, 'put', data).then((res) => getData());
        setShow('');
        setInputValue('')
        window.location.reload()
    }



   const [showName, setShowName]=useState('')
    const [studentEditName, setStudentEditName]=useState('')
    function editStudent(id){
        if(studentEditName===''){
            return;
        }
        let data = {
            name: studentEditName,
            groupId: groupId
        }
        apiCall('/student/'+id, 'put', data).then(res=>{
            getData()
            setShowName('')
        })
        setStudentEditName('')
    }

    const [showSubject, setShowSubject]=useState('')
    const [subjectEditName, setSubjectEditName]=useState('')
    function editSubject(id){
        if(subjectEditName===''){
            getData()
            return;
        }
        let data = {
            name: subjectEditName,
            groupId: groupId
        }
        console.log(id, data)
        apiCall('/subject/'+id, 'put', data).then(res=>{
            getData()
            setShowSubject('')
        })
        setSubjectEditName('')
    }


function deleteAll(path){
    setShowSubject('')

    setSubjectEditName('')
       apiCall(path,'delete').then(res=>{
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
            apiCall('/student/color/'+id+'/'+e, 'put').then(res=>{
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
                <div className={'my-2 d-flex justify-content-center align-items-center gap-5'}>
                    <div className='d-flex align-items-center'>
                        <span className="translate-middle p-2 bg-success h-50 rounded-circle"></span>
                        <p>5 baho</p>
                    </div>
                    <div className='d-flex align-items-center'>
                        <span className="translate-middle p-2 bg-info h-50 rounded-circle"></span>
                        <p>4 baho</p>
                    </div>
                    <div className='d-flex align-items-center'>
                        <span className="translate-middle p-2 bg-warning h-50 rounded-circle"></span>
                        <p>3 baho</p>
                    </div>
                    <div className='d-flex align-items-center'>
                        <span className="translate-middle p-2 bg-danger h-50 rounded-circle"></span>
                        <p>Yiqilgan</p>
                    </div>
                </div>
                {hasUser?
                    <table className={'table table-bordered text-center'}>
                    <thead>
                    <tr>
                        <th style={{width: '30px'}}>№</th>
                        <th>Fanlar</th>
                        {
                            ratings?.map((rating,index)=>

                                <th key={index+rating.id} className={'text-center '}>

                                    <div className={'d-flex'}>
                                        <div className={'d-flex'} onClick={()=>{setShowName(index); setStudentEditName(rating?.student.name)}}>
                                            <div className={'d-flex'}>
                                                <input
                                                    type={"text"}
                                                    max={100}
                                                    min={0}
                                                    className={'form-control shadow-none border border-0 w-75'}
                                                    value={index===showName?studentEditName:rating?.student.name}
                                                    onChange={(e) => setStudentEditName(e.target.value)}
                                                />
                                                <button
                                                    className={'btn btn-dark ' + (index===showName? '' : 'd-none')}
                                                    onClick={() => editStudent(rating?.student.id)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className={'btn btn-dark ' + (index===showName? '' : 'd-none')}
                                                    onClick={() => deleteAll('/student/'+rating?.student.id)}
                                                >
                                                    delete
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <Dropdown>
                                                <Dropdown.Toggle className={rating?.student.color}  id={`dropdown-${rating?.student.id}`}>

                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        className={'bg-success text-white'}
                                                        onClick={() => handleColorChange('bg-success', rating?.student.id)}
                                                    >
                                                        5 baho
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        className={'bg-info text-white'}
                                                        onClick={() => handleColorChange('bg-info', rating?.student.id)}
                                                    >
                                                        4 baho
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        className={'bg-warning text-white'}
                                                        onClick={() => handleColorChange('bg-warning', rating?.student.id)}
                                                    >
                                                        3 baho
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        className={'bg-danger text-white'}
                                                        onClick={() => handleColorChange('bg-danger', rating?.student.id)}
                                                    >
                                                        yiqilgan
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </th>

                            )
                        }

                        <td>
                            <CheckUser>
                                <div className={'d-flex'}>
                                    <input value={studentName} onChange={(e) => {
                                        setStudentName(e.target.value)
                                    }} placeholder={"O'quvchi qo'shish"} className={'form-control shadow-none border border-0'}/>
                                    <button onClick={saveStudent} className={'btn btn-dark'}>+</button>
                                </div>
                            </CheckUser>
                        </td>
                    </tr>

                    </thead>
                    <tbody>
                    {subjects.map((subject, index)=>
                     <tr>
                         <th>
                             {index+1}
                         </th>
                         <th onClick={()=>{setShowSubject(index); setSubjectEditName(subject.name)}}>
                             <div className={'d-flex'}>
                                 <input
                                     type={"text"}
                                     max={100}
                                     min={0}
                                     className={'form-control shadow-none border border-0 w-75'}
                                     value={index===showSubject?subjectEditName:subject.name}
                                     onChange={(e) => setSubjectEditName(e.target.value)}
                                 />
                                 <button
                                     className={'btn btn-dark ' + (index===showSubject? '' : 'd-none')}
                                     onClick={() => editSubject(subject.id)}
                                 >
                                     Save
                                 </button>
                                 <button
                                     className={'btn btn-dark ' + (index===showSubject? '' : 'd-none')}
                                     onClick={() => deleteAll('/subject/'+subject?.id)}
                                 >
                                     delete
                                 </button>
                             </div>
                         </th>

                         {
                             ratings.map(rating=>
                                 {
                                     const filteredRatings = rating?.getRating.filter(item => item.subject.id === subject.id);
                                     if (filteredRatings.length === 0) {
                                         return <td key={subject.id} onClick={() => {
                                             setShow(subject.name + rating.student.name)
                                             setInputValue('')
                                         }} >
                                             <div className={'d-flex'}>
                                                 <input
                                                     type={"number"}
                                                     max={100}
                                                     min={0}
                                                     className={'form-control shadow-none border border-0'}
                                                     value={show ===subject.name+rating.student.name?inputValue:''}
                                                     onChange={(e) => setInputValueJon(e.target.value)}
                                                 />
                                                 <button
                                                     className={'btn btn-dark ' + (show ===subject.name+rating?.student.name? '' : 'd-none')}
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
                                             }} >
                                                 <div className={'d-flex'}>
                                                     <input
                                                         type={"number"}
                                                         max={100}
                                                         min={0}
                                                         className={'form-control shadow-none border border-0'}
                                                         value={show ===subject.name+rating.student.name?inputValue:result.mark}
                                                         onChange={(e) => setInputValueJon(e.target.value)}
                                                     />

                                                     <button
                                                         className={'btn btn-dark ' + (show ===subject.name+rating?.student.name? '' : 'd-none')}
                                                         onClick={() => editRating(result.id,rating.student.id, subject.id)}
                                                     >
                                                         Save
                                                     </button>
                                                 </div>

                                             </td>
                                         ));
                                     }
                                 }

                             )
                         }
<td></td>

                     </tr>
                    )}
                    <tr>
                        <th></th>
                       <th>
                           <CheckUser>
                               <div style={{width: '200px'}} className={'d-flex m-0 p-0'}>
                                   <input value={subjectName} onChange={(e) => {
                                       setSubjectName(e.target.value)
                                   }} placeholder={"fan qo'shish"} className={'form-control shadow-none border border-0 '}/>
                                   <button onClick={saveSubject} className={'btn btn-dark'}>+</button>

                               </div>
                           </CheckUser>
                       </th>
                        {
                            ratings?.map((rating,index)=>

                                <td></td>

                            )
                        }
                        <td></td>
                    </tr>






                    </tbody>
                </table>
                    :

                    <table className={'table table-bordered text-center'}>
                        <thead>
                        <tr>
                            <th style={{width: '30px'}}>№</th>
                            <th style={{width: '200px'}}>Fanlar</th>
                            {
                                ratings?.map((rating,index)=>

                                    <th key={index+rating.id} className={'text-center '+rating.student.color}>

                                        {rating?.student.name}
                                    </th>

                                )
                            }


                        </tr>

                        </thead>
                        <tbody>
                        {subjects.map((subject, index)=>
                            <tr>
                                <th>
                                    {index+1}
                                </th>
                                <th >
                                    {subject.name}
                                </th>

                                {
                                    ratings.map(rating=>
                                        {
                                            const filteredRatings = rating?.getRating.filter(item => item.subject.id === subject.id);
                                            if (filteredRatings.length === 0) {
                                                return <td key={subject.id} className={rating.student.color}>

                                                </td>
                                            } else {
                                                return filteredRatings.map(result => (
                                                    <td key={subject.id} className={rating.student.color} >
                                                        {result.mark}

                                                    </td>
                                                ));
                                            }
                                        }

                                    )
                                }


                            </tr>
                        )}






                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}

export default RatingGroup;