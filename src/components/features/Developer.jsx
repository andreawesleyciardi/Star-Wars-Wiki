import React , { useEffect } from 'react';
import { Container , Row , Col , Button } from 'react-bootstrap';

import { LoadingDuration } from './../ui/Elements';
import cv from '../../assets/documents/Andrea_Wesley_Ciardi_-_Resume.pdf';



const Developer = React.memo((props) => {

    useEffect(() => {
        setTimeout(function() {
            props.setIsLoading(false);
        }, 10000);
    }, [  ]);
    
    return (
        <Container fluid id="developer-feature">
            <p id="scroll-label">Scroll down...</p>
            <div>
                <div>
                    <div id="content-container">
                        <p>It is a period of revolutions in the<br />World Wide Web.</p>
                        <p>A developer from a hidden base<br />in Athens, Greece,<br />was working day and night<br />for discover the secret of<br />the Web3.</p>
                        <p>Born in Brasil,<br/>for 14 years<br/>he had traveled accross<br/>Italy and Greece<br/>training for one day<br/>enter in the order of the <br/>Frontend Developers.</p>
                        <p>During his latest mission,<br/>he managed to get in possess of<br/>the web's ultimate weapon,<br/>the REACT,<br/>a frontend framework with enough power to refactor an entire webapp.</p>
                        <p>Today, mastering the<br/>ancient powers of the web:<br/>HTML, Css and Javascript,<br/>he is ready for a new adventure....</p>
                    </div>
                </div>
            </div>
        </Container>
    );
});

export default Developer;
