import React from 'react';
import { Container } from 'react-bootstrap';

const Body = (props) => {

    const {children}= props

    return (
        <Container  className={"margin-auto viewer-box"}>
            {children}
        </Container>
    );
};

export default Body;