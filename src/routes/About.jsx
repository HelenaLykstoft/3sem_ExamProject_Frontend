import React, {useEffect, useState} from 'react';
import facade from "../apiFacade.js";

const About = ({user}) => {

    const [dataFromServer, setDataFromServer] = useState("Loading...")
    const [isUpdated, setIsUpdated] = useState(false);
    let data ="";

useEffect( () => {
    if(user.username === ''){ setDataFromServer('Remember to login at the top of the page');
        return;
}
    const url = user.roles.split(',').includes('user') ? '/info/user' : '/info/admin';

    facade.fetchData(url).then(res => {

        console.log(res);
        setDataFromServer(res.msg)});
},[user]);

    return (
        <div className="row featurette" className="row justify-content-center">
            {dataFromServer}
                <div className="col-md-10">
                    <h1 className="featurette-heading">About page:
                        <span className="text-muted"> Thanks for checking out about!</span>
                    </h1>
                    <h4>This project:</h4>
                    <p><em>THis project is made by Helena Botn Lykstoft as an exam project for my 3rd semester exam. I sadly didnt get to do all the stuff that i wanted to do :(</em></p>
                    <br/>

                </div>
            </div>
            );
            };

export default About;