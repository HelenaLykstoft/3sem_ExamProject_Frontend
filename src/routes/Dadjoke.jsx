import React, {useEffect, useState} from 'react';
import facade from "../apiFacade.js";
import {dadJokeURL} from "../settings.js";

const Dadjoke = ({user}) => {


    const [dataFromServer, setDataFromServer] = useState("")
    const [joke, setJoke] = useState("")
    // Favourite
    const [likedJoke, setLikedJokes] = useState([])
    let data = "";

    const addFavorite = (likedJoke) => {
        setLikedJokes((prevLikedJokes ) =>[...prevLikedJokes, likedJoke])
    };


    useEffect( () => {
        if(user.username === ''){ setDataFromServer('Please login to see data from server');

            return;
        }
        fetch(dadJokeURL)
            .then(response => response.json())
            .then(data =>setJoke(data.joke) // Joke because in the DTO, the string is joke

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
            <h3>{"DAD JOKE:     "+ joke}</h3>
            <button onClick={() => addFavorite(joke)}>Like</button>
            <h3>Liked jokes: {likedJoke}</h3>
        </div>
    );
};

export default Dadjoke;