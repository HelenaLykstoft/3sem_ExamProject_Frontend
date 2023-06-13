import React from 'react';

const Home = () => {

    const getUserName = () => {
        const token = facade.readJwtToken(facade.getToken());
        return token.username;
    }


    return (
        <div className="row featurette justify-content-center">
            <div className="col-md-10">
                <h1 className="featurette-heading">Exam project:
                    <span className="text-muted"> Here you can xxx</span>
                </h1>
                <br/>
                <h4 className="text-center">Centered text:</h4>
                <br/>
                <br/>
                <br/>
                <p className="lead">Lead text</p>
            </div>
        </div>

    );
};

export default Home;