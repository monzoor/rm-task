import React from 'react';
import { Row, Col } from 'reactstrap';

import { FadeInAnimation } from '../../Utils/DesignUtils';

const PublicLayout = ({ children }) => {
    console.log('---ssd');

    return (
        <div className="container-fluid">
            <Row>
                <Col>
                    <FadeInAnimation>{children}</FadeInAnimation>
                </Col>
            </Row>
        </div>
    );
};

export default PublicLayout;
