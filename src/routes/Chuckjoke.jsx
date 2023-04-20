import React, {useEffect, useState} from 'react';
import facade from "../apiFacade.js";
import {chuckURL} from "../settings.js";

const Chuckjoke = ({user}) => {


    const [dataFromServer, setDataFromServer] = useState("")
    const [joke, setJoke] = useState("")
    let data = "";
    const [likedJoke, setLikedJokes] = useState([])


    const addFavorite = (likedJoke) => {
        setLikedJokes((prevLikedJokes ) =>[...prevLikedJokes, likedJoke])
    };


    useEffect( () => {
        if(user.username === ''){ setDataFromServer('Please login to see data from server');

            return;
        }
        fetch(chuckURL)
            .then(response => response.json())
            .then(data =>setJoke(data.value) // Value because in the DTO, the string is joke

            ).catch(err => {
            console.error(err)
        });
        const url = user.roles.split(',').includes('user') ? '/info/user' : '/info/admin';
        facade.fetchData(url).then(res => {

            console.log(res);
            setDataFromServer(res.msg)});
    },[user]);

    return (
        <div class="alljokepages">
            {dataFromServer}
            <h3>{"CHUCK JOKE:     "+ joke}</h3>
            <button onClick={() => addFavorite(joke)}>Like</button>
            <h3>Liked jokes: {likedJoke}</h3>
        </div>
    );
};

export default Chuckjoke;