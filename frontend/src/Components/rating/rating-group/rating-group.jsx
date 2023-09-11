import React, {useState, useEffect} from 'react';
import Header from "../../header/header";
import CheckUser from "../../Securty/CheckUser";
import {useParams} from "react-router-dom";
import apiCall from "../../../instance";

function RatingGroup(props) {
    const { groupId } = useParams();

    const [currentGroup, setCurrentGroup] = useState({});
    const [students, setStudents]=useState([])


    const [studentName, setStudentName]=useState('')
    const [subjectName, setSubjectName]=useState('')

    function getData(){
        apiCall('/groups/public/' + groupId, 'get').then(res=>{
            setCurrentGroup(res.data.body)
        })
        console.log(groupId)
        apiCall('/student/public/' + groupId, 'get').then(res=>{

            setStudents(res.data)
        })

    }
    useEffect(()=>{
        getData()
    },[])


    function saveStudent(){
        if(studentName===''){
            return;
        }
        let data={
            name:studentName,
            groupId:groupId
        }
        console.log(data)
        apiCall('/student', 'post', data).then(res=>
            getData()
        )
        setStudentName('')
    }
    function saveSubject(){
        let data={
            name:subjectName,
            groupId:groupId
        }
        apiCall('subject', 'post', data).then(res=>
            getData()
        )
    }
    return (
      <div>
          <Header/>
          <div style={{marginTop:'200px'}} className={'container'}>
              <div>
                  <h1>{currentGroup?.name} guruh</h1>
              </div>
              <table className={'table table-bordered text-center'}>
                  <thead>
                    <tr>
                        <th style={{width:'50px'}}>№</th>
                        <th >O'quvchilar</th>
                        <th style={{width:'200px'}}>fan1</th>
                        <th style={{width:'200px'}}>fan1</th>
                        <th>
                            <div style={{width:'200px'}} className={'d-flex m-0 p-0'}>
                                <input value={subjectName} onChange={(e)=>{setStudentName(e.target.value)}} placeholder={"fan qo'shish"} className={'form-control '}/>
                                <button onClick={saveSubject} className={'btn btn-warning'}>+</button>
                            </div>
                        </th>
                    </tr>
                  </thead>
                  <tbody>
                  {students?.map((item, index)=>
                      <tr key={item.id}>
                          <th>{index+1}</th>
                          <td>{item.name}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                      </tr>

                  )}


                        <tr>
                            <th>

                            </th>
                            <td>
                                <div className={'d-flex'}>
                                    <input value={studentName} onChange={(e)=>{setStudentName(e.target.value)}} placeholder={"O'quvchi qo'shish"} className={'form-control w-75'}/>
                                    <button onClick={saveStudent} className={'btn btn-warning'}>+</button>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                  </tbody>
              </table>
          </div>
      </div>
    );
}

export default RatingGroup;