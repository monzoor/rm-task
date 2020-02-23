import React from 'react';
import { Row, Col, Media } from 'reactstrap';

import Icon from '../../Utils/IconUtils';

const demoImg =
    'https://cdn.vox-cdn.com/thumbor/CTluvlc9kScZlylzsRR4QRCE4Gg=/6x0:641x423/1200x800/filters:focal(6x0:641x423)/cdn.vox-cdn.com/uploads/chorus_image/image/48767301/Screen_Shot_2016-02-09_at_9.08.28_AM.0.0.png';
const demoAvatar =
    'https://cdn.iconscout.com/icon/premium/png-256-thumb/female-avatar-12-774634.png';

const StaticHeader = () => {
    return (
        <Row>
            <p className="h4">
                What guests are saying about home in the United kingdom
            </p>
            <p className="small font-weight-light">
                United kingdom homes were rated <b>4.7 out of 5 stars</b> whith{' '}
                <b>10,500,00+ reviews</b>
            </p>
        </Row>
    );
};

const FeatureItems = () => {
    return (
        <Row>
            <Col xs="4">
                <img
                    src={demoImg}
                    className="img-fluid border-rounded"
                    alt=""
                />
                <div className="rating my-2">
                    <Icon
                        className="mr-2"
                        color="#03848a"
                        size={15}
                        icon="star"
                    />
                    <Icon
                        className="mr-2"
                        color="#03848a"
                        size={15}
                        icon="star"
                    />
                    <Icon
                        className="mr-2"
                        color="#03848a"
                        size={15}
                        icon="star"
                    />
                    <Icon
                        className="mr-2"
                        color="#03848a"
                        size={15}
                        icon="star"
                    />
                    <Icon
                        className="mr-2"
                        color="#03848a"
                        size={15}
                        icon="star"
                    />
                </div>
                <p className="descriptions small">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iste perspiciatis quam consequatur rem beatae qui quo atque
                    possimus harum expedita.
                </p>
                <Media>
                    <Media left href="#">
                        <img
                            src={demoAvatar}
                            className="rounded-circle"
                            alt=""
                            width="50px"
                            height="50px"
                        />
                    </Media>
                    <Media body className="ml-2 text-muted">
                        <p className="mb-0">Nicky</p>
                        <p className="small">China</p>
                    </Media>
                </Media>
            </Col>
        </Row>
    );
};
const Home = () => {
    console.log('--home');

    return (
        <>
            <StaticHeader />
            <FeatureItems />
        </>
    );
};

export default Home;
