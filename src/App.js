import React , { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './App.scss';

import Topnavbar from './components/ui/Topnavbar';
import Main from './components/ui/Main';
import Footer from './components/ui/Footer';



function App() {
    const [isLoading, setIsLoading] = useState(true);

    let location = useLocation();

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
                    <div id="loading-container">
                        <div>
                            <div>
                                <div>
                                    <p>Loading...</p>
                                </div>
                            </div>
                        </div>
                    </div>
            }
            <div id="stars-one" className="stars"></div>
            <div id="stars-two" className="stars"></div>
            <div id="wrapper">
                <Topnavbar />
                <Main isLoading={ isLoading } setIsLoading={ setIsLoading } />
                <Footer />
            </div>
        </>
    );
}

export default App;