import React, {useEffect, useState} from 'react';
import axios from "axios";


function CheckUser({children, margin = "my6"}) {
    const [hasUser, setHasUser] = useState(false)

    function getUser() {
        let token = localStorage.getItem('access_token');
        if (token !== null) {
            axios({
                url: 'http://localhost:8080/api/auth/me', method: 'get', headers: {
                    Authorization: token,
                }
            }).then(res => {
                console.log(res.data)
                if (res.data.phone !== null) {
                    setHasUser(true)
                }
            }).catch(err => {
                console.log(err)
                setHasUser(false)
            })
        } else {
            setHasUser(false);
        }
    }

    useEffect(() => {
        getUser()
    }, [])
    return (<div className={'d-inline-block'}>
            {hasUser ? <>{children}</> : <></>}
        </div>
    );
}

export default CheckUser
