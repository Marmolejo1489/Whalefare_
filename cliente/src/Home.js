import { useState, useEffect } from 'react';
import Axios from 'axios';

import Add from './Add'
import Password from './Password';

function Home() {
    const [passwordList, setPasswordList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:4000/login').then((response) => {
            if (response.data.user) {
                var id_u = response.data.user[0].id_u;
                Axios.post('http://localhost:4000/home', { id_u: id_u }).then((response) => {
                    setPasswordList(response.data);
                });
            }
        });
    }, []);

    const decryptedPassword = (encryption) => {
        Axios.post('http://localhost:4000/decryptpass', { password: encryption.password, iv: encryption.iv }).then((response) => {
            setPasswordList(passwordList.map((val) => {
                return val.id_c === encryption.id ? { id: val.id_c, pass_c: val.pass_c, nombre: response.data, website_c: val.website_c, name_u: val.user_c, iv: val.key_c } : val;
            }));
        });
    };

    return (
        <div className="Passwords">
            <div className="container p-4">
                <div className="row row-cols-3">
                    {passwordList.map((val, key) => {
                        return (
                            <div key={key} onClick={() => { decryptedPassword({ password: val.pass_c, iv: val.key_c, id: val.id_c }) }}>
                                <Password {...val} />
                                <br />
                            </div>
                        )
                    })}
                    <Add />
                </div>
            </div>
        </div>
    );
};

export default Home;