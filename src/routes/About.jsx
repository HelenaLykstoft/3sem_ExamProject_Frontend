import React, {useEffect, useState} from 'react';
import facade from "../apiFacade.js";

const About = ({user}) => {

    const [dataFromServer, setDataFromServer] = useState("Loading...")
    const [isUpdated, setIsUpdated] = useState(false);
    let data ="";

useEffect( () => {
    if(user.username === ''){ setDataFromServer('Please login to see data from server');
        return;
}
    const url = user.roles.split(',').includes('user') ? '/info/user' : '/info/admin';

    facade.fetchData(url).then(res => {

        console.log(res);
        setDataFromServer(res.msg)});
},[user]);

    return (
        <div class="aboutpage">
            {dataFromServer}
            <h1>About Section</h1>
            <h3>Thanks for checking out about!</h3>
            <h3>This page is made by Helena Botn Lykstoft</h3>
            <h4>This website is a selection of the FINEST jokes.</h4>
            <h4>On each page, is a "like" button, and by pressing the button, you can like your favorite joke!</h4>
            <h4>I hope you enjoy!</h4>

        </div>
    );
};

export default About;