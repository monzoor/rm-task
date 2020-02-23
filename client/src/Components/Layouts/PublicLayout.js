import React from 'react';
import { Container, Row } from 'reactstrap';

import { FadeInAnimation } from '../../Utils/DesignUtils';
import Header from '../Common/Header';
const PublicLayout = ({ children }) => {
    console.log('---ssd');

    return (
        <Container fluid>
            <Row>
                <Header />
                <FadeInAnimation>{children}</FadeInAnimation>
            </Row>
        </Container>
    );
};

export default PublicLayout;
