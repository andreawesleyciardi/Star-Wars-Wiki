import React , { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './App.scss';

import profilephoto from './assets/imgs/andreaciardi.jpeg';
import Topnavbar from './components/ui/Topnavbar';
import Main from './components/ui/Main';
import Footer from './components/ui/Footer';



function App() {
    const [isLoading, setIsLoading] = useState(true);

    let location = useLocation();
    console.log(location.pathname);

    React.useEffect(() => {
        if (isLoading != true) {
            setIsLoading(true);
        }
    }, [ location ]);

    return (
        <>
            {
                isLoading
                &&
                    (
                        (location.pathname).indexOf('developer') == -1 ?
                            <div id="loading-container">
                                <div>
                                    <div>
                                        <div>
                                            <p>Loading...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        :
                            <div id="loading-container-developer">
                                <p id="alongtimeago">
                                    A long time ago in a galaxy far,<br />
                                    far away....
                                </p>
                                <img id="profilephoto" src={ profilephoto } />
                            </div>
                    )
            }
            {
                (location.pathname).indexOf('developer') == -1
                &&
                    (
                        <>
                            <div id="stars-one" className="stars"></div>
                            <div id="stars-two" className="stars"></div>
                        </>
                    )
            }
            <div id="wrapper">
                <Topnavbar />
                <Main isLoading={ isLoading } setIsLoading={ setIsLoading } />
                <Footer />
            </div>
        </>
    );
}

export default App;