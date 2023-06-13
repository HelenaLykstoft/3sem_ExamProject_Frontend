import React from 'react';

const Home = () => {

    const getUserName = () => {
        const token = facade.readJwtToken(facade.getToken());
        return token.username;
    }


    return (
        <div className="row featurette justify-content-center">
            <div className="col-md-10">
                <h1 className="featurette-heading">Exam project rental service:
                    <span className="text-muted">This is a rental service page for an exam project</span>
                </h1>
                <br/>
                <h4 className="text-center">What you can do:</h4>
                <h5 className="text-center">You can search for a rental</h5>
                <h5 className="text-center">You can see all rentals</h5>
                <h5 className="text-center">You can create a rental</h5>
                <h5 className="text-center">You can delete a rental</h5>
                <h5 className="text-center">Some of this stuff is only possible if you are an admin. Sorry.</h5>
                <br/>
                <br/>

            </div>
        </div>

    );
};

export default Home;