
import React, {useEffect, useState} from 'react';
import apiCall from '../../instance/index'


function CheckUser({ children,margin="my6"}) {
    const [hasUser, setHasUser]=useState(false)
    function getUser(){
        apiCall('/v1/auth/decode', 'get').then(res=>{
            console.log(res.data)
            if (res.data === 401) {

            } else {
                if(res.data.roles?.some(role => role.name === 'ROLE_SUPER_ADMIN')){
                    const isAdmin = res.data.roles.some(role => role.name === 'ROLE_SUPER_ADMIN');
                    setHasUser(isAdmin);
                }

                }
        })
    }
useEffect(()=>{
    getUser()
},[])
    return(<div>
            {hasUser?<>{children}</>:<></>}
        </div>
        );
}

export default CheckUser
