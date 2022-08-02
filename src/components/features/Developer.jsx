import React , { useEffect } from 'react';
import { Container , Row , Col , Button } from 'react-bootstrap';

import { LoadingDuration } from './../ui/Elements';
import profilephoto from '../../assets/imgs/andreaciardi.jpeg';
import cv from '../../assets/documents/Andrea_Wesley_Ciardi_-_Resume.pdf';



const Developer = React.memo((props) => {

    useEffect(() => {
        setTimeout(function() {
            props.setIsLoading(false);
        }, LoadingDuration);
    }, [  ]);
    
    return (
        <Container fluid id="developer-feature">
            <Row>
                <Col className="widget-container" xs md={ 3 }>
                    <div className="widget" id="widget-devices">
                        <div className="widget-header text-center">
                            <h4>Andrea Ciardi</h4>
                        </div> 
                        <div className="widget-body text-center">
                            <img id="profilephoto" src={ profilephoto } />
                            <p id="profiledescription" className="mt-4">Brasilian / Italian<br/><strong>Senior Frontend Developer</strong><br/>(14 years of working experience)<br/>based in Athens, Greece.</p>
                        </div>
                    </div>
                </Col>
                <Col className="widget-container" xs md={ 9 }>
                    <div className="widget" id="widget-experiment">
                        <div className="widget-header">
                            <h4>Contacts</h4>
                        </div>
                        <div className="widget-body">
                            <div id="contacts-container">
                                <p>Email: <a href="mailto:developer@andreaciardi.com">developer@andreaciardi.com</a></p>
                                <p className="mt-2">Phone: <a href="tel:+306945051674">+30 6945051674</a></p>
                                <p className="mt-2">Curriculum Vitae: <a href={ cv } download>Download</a></p>

                                <p className="mt-5">This is my solution to the assignment "<a href="https://github.com/flipdishbytes/recruiting/tree/main/Flipdish.Recruiting.FE">Flipdish.Recruiting.FE</a>" for the open position of <strong><a href="https://www.linkedin.com/jobs/view/3124732607/?refId=CzNx8LFADNkuI2WZQdswJQ%3D%3D">Senior Frontend Developer</a></strong> at <strong>Flipdish</strong>.</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

export default Developer;
