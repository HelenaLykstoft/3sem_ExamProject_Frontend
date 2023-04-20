import React from 'react';

const Home = () => {

    return (
        <div class="welcomepage" className="row featurette">
            <div class="mywelcomepage" className="col-md-7 order-md-2">

                <h1 className="featurette-heading">Welcome Page:
                    <span className="text-muted"> Thanks for checking my WEB-Client!</span>
                </h1>

                <h2>This is Helena Botn Lykstoft's default homepage. </h2>
                <h3>Down below is the normal homepage</h3>
                <h4>This web-client is a joke page, where you can see a selection of the FINEST jokes!</h4>
                <h4>On each page, there are selected jokes. You can see all the pages in the navigation bar at the top.</h4>
                <br/>
                <br/>
                <br/>

                <div class="defaultwelcomepage">
                <h2>This is the Frontend template for CA2
                    <br/>by Felicia, Jamie, Isak & Helena

                </h2>

                    <h3>If you wish to use the Frontend application, these are the pages you will need to change:</h3>

                <p className="lead">1:  In src/routes, you will need to add a jsx-file for your api.
                    -> Use the "Joke.jsx"-file as template if needed</p>
                <p>2:   In src/App.jsx you will need to add the routes to the return method</p>
                <p>3:   In src/settings.js you will need to add the URL as a const.</p>
                <p>4:   After you have added the url's to settings.js in step 3, you will need to import the urls 2 places: top of apiFacade.jsx and your newly created routes-file from point 1.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;