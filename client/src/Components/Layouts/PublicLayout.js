import React from 'react';
import { Container } from 'reactstrap';

import { FadeInAnimation } from '../../Utils/DesignUtils';
import Header from '../Common/Header';
const PublicLayout = ({ noHeader, children }) => {
    return (
        <>
            {!noHeader && (
                <Container fluid>
                    <Header />
                </Container>
            )}

            <FadeInAnimation>
                <Container>{children}</Container>
            </FadeInAnimation>
        </>
    );
};

export default PublicLayout;
