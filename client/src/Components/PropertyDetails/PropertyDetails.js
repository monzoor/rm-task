import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Media } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Icon from '../../Utils/IconUtils';

import NotFound from '../../Utils/NoContentFound.js';
import useError from '../../CustomHook/ErrorHook';

import propertyDetailsAction from './_Actions/propertyDetailsAction';

const demoImage =
    'https://cdn.vox-cdn.com/thumbor/CTluvlc9kScZlylzsRR4QRCE4Gg=/6x0:641x423/1200x800/filters:focal(6x0:641x423)/cdn.vox-cdn.com/uploads/chorus_image/image/48767301/Screen_Shot_2016-02-09_at_9.08.28_AM.0.0.png';

const PropertyHeader = () => {
    return (
        <Row>
            <Col xs="auto" className="pr-0">
                <h1 className="h4">Hotel Alborada Ocean Club</h1>
            </Col>
            <Col>
                <Icon className="mr-2" color="#ffbb06" size={20} icon="star" />
                <Icon className="mr-2" color="#ffbb06" size={20} icon="star" />
                <Icon className="mr-2" color="#ffbb06" size={20} icon="star" />
            </Col>
            <Col xs="12">
                <p className="small">
                    Costa del Silencio, Tenerife, Canary Island
                </p>
            </Col>
            <Col xs="auto" className="pr-0">
                <Icon className="mr-2" size={40} icon="tripadvisor" />
                <Icon
                    className="mr-1"
                    color="#589441"
                    size={20}
                    icon="circle-full"
                />
                <Icon
                    className="mr-1"
                    color="#589441"
                    size={20}
                    icon="circle-full"
                />
                <Icon
                    className="mr-1"
                    color="#589441"
                    size={20}
                    icon="circle-full"
                />
                <Icon
                    className="mr-1"
                    color="#589441"
                    size={20}
                    icon="circle-half"
                />
            </Col>
            <Col>
                <p className="pt-2">324 reviews</p>
            </Col>
        </Row>
    );
};
const PropertyImages = () => {
    return (
        <Row className="container--image">
            <Col xs="8" className="pr-0">
                <img src={demoImage} className="img-fluid" alt="" />
            </Col>
            <Col xs="4">
                <Row>
                    <Col xs="12" className="pl-0">
                        <img src={demoImage} className="img-fluid" alt="" />
                    </Col>
                    <Col xs="12" className="pl-0">
                        <img src={demoImage} className="img-fluid" alt="" />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
const PropertyDetailsItems = () => {
    return (
        <>
            <Row>
                <Col xs="10">
                    <h2 className="h1 font-weight-bold">
                        Stylish Spacious Double with views of the city!!
                    </h2>
                    <p>Geater London</p>
                </Col>
                <Col xs="2" className="text-center">
                    <img
                        src="https://cdn.iconscout.com/icon/premium/png-256-thumb/female-avatar-12-774634.png"
                        className="rounded-circle"
                        alt=""
                        width="50px"
                        height="50px"
                    />
                    <p className="text-muted small">Summy</p>
                </Col>
            </Row>
            <Media className="mb-3">
                <Media left href="#">
                    <Icon className="mr-2" color="#000" size={12} icon="home" />
                </Media>
                <Media body>
                    <p className="mb-0">Private room in flat</p>
                    <span className="text-muted font-weight-light">
                        <span className="mr-3">2 guests</span>
                        <span className="mr-3">1 bedroom</span>
                        <span className="mr-3">1 bed</span>
                        <span>1 shared bathroom</span>
                    </span>
                </Media>
            </Media>
            <Media className="mb-3">
                <Media left href="#">
                    <Icon
                        className="mr-2"
                        color="#000"
                        size={12}
                        icon="right"
                    />
                </Media>
                <Media body>
                    <p className="mb-0">Self check-in</p>
                    <span className="text-muted font-weight-light">
                        Check yourself in with the lockbox
                    </span>
                </Media>
            </Media>
            <Media className="mb-3">
                <Media left href="#">
                    <Icon
                        className="mr-2"
                        color="#000"
                        size={12}
                        icon="stars"
                    />
                </Media>
                <Media body>
                    <p className="mb-0">Breakfast</p>
                    <span className="text-muted font-weight-light">
                        This is one of a few places in the are that has this
                        feature
                    </span>
                </Media>
            </Media>
            <Media className="mb-3">
                <Media left href="#">
                    <Icon
                        className="mr-2"
                        color="#000"
                        size={12}
                        icon="phone"
                    />
                </Media>
                <Media body>
                    <p className="mb-0">Great communication</p>
                    <span className="text-muted font-weight-light">
                        100% of recent guests rated shimmy 5-star in
                        communication.
                    </span>
                </Media>
            </Media>
            <hr className="my-4" />
            <div className="font-weight-light">
                <p>
                    A spacious double room with a comfy king size bed in the
                    heart of the Easr End
                </p>
                <p className="mb-0">- 5mins walk from underground</p>
                <p className="mb-0">- 5mins walk to shadwel DLR station</p>
                <p className="mb-0">- 10mins by train to city</p>
                <p className="mb-0">
                    - 5mins by train to trendy shoreditch nightlife
                </p>
            </div>
        </>
    );
};
const Reserve = () => {
    return (
        <Row className="border">
            <Col>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
                eius ad illum reiciendis ducimus veritatis ut quia repellat
                magnam nulla in, corrupti nihil est pariatur nostrum quisquam
                voluptatibus eum maxime!
            </Col>
        </Row>
    );
};
const PropertyDetails = ({ match }) => {
    const dispatch = useDispatch();
    const { details, loading } = useSelector(state => state.propertyDetails);
    console.log(details, loading);
    const fetchingPropertyDetails = useCallback(() => {
        dispatch(propertyDetailsAction(match.params.id));
    }, [dispatch, match]);

    useEffect(() => {
        fetchingPropertyDetails();
    }, [fetchingPropertyDetails]);

    return (
        <>
            <PropertyHeader />
            <PropertyImages />
            <Row className="mt-5">
                <Col xs="8">
                    <PropertyDetailsItems />
                </Col>
                <Col xs="4">
                    <Reserve />
                </Col>
            </Row>
        </>
    );
};

export default withRouter(PropertyDetails);
