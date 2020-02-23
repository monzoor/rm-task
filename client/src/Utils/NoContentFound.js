import React from 'react';
import { Row, Col } from 'reactstrap';
import Icon from './IconUtils';

const NotFound = () => (
    <Row className="mx-0">
        <Col xs="12" className="text-center">
            <Icon color="#4FC542" size={300} icon="search" />
            <p className="h5">
                Sorry we could not find what you are looking for.
            </p>
        </Col>
    </Row>
);

export default NotFound;
