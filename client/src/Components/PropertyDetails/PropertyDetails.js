import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Media, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Icon from '../../Utils/IconUtils';

import NotFound from '../../Utils/NoContentFound.js';
import { Spinner } from '../../Utils/Loader';
import useError from '../../CustomHook/ErrorHook';

import propertyDetailsAction from './_Actions/propertyDetailsAction';

import DatePicker from '../Common/DatePicker';

const PropertyHeader = ({ title, rating, location }) => {
    const ratings = [];
    for (let i = 1; i <= rating; i++) {
        ratings.push(
            <Icon
                key={i}
                className="mr-2"
                color="#ffbb06"
                size={20}
                icon="star"
            />
        );
    }
    return (
        <Row>
            <Col xs="auto" className="pr-0">
                <h1 className="h4">{title}</h1>
            </Col>

            <Col>{ratings}</Col>
            <Col xs="12">
                <p className="small">
                    {`${location.city}, ${location.country}`}
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
const PropertyImages = ({ images }) => {
    return (
        <Row className="container--image">
            <Col xs="8" className="pr-0">
                <img src={images[0].url} className="img-fluid" alt="" />
            </Col>
            <Col xs="4">
                <Row>
                    <Col xs="12" className="pl-0 text-center">
                        <img height="250px" src={images[1].url} alt="" />
                    </Col>
                    <Col xs="12" className="pl-0 text-center">
                        <img height="250px" src={images[2].url} alt="" />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
const PropertyDetailsItems = ({
    title,
    description,
    location,
    type,
    creator,
}) => {
    const { country, city } = location;
    const { avatar, name } = creator;
    return (
        <>
            <Row>
                <Col xs="10">
                    <h2 className="h1 font-weight-bold">{title}</h2>
                    <p>{`${city}, ${country}`}</p>
                </Col>
                <Col xs="2" className="text-center">
                    <img
                        src={avatar}
                        className="rounded-circle"
                        alt=""
                        width="50px"
                        height="50px"
                    />
                    <p className="text-muted small">{name}</p>
                </Col>
            </Row>
            <Media className="mb-3">
                <Media left href="#">
                    <Icon className="mr-2" color="#000" size={12} icon="home" />
                </Media>
                <Media body>
                    <p className="mb-0">{`${type} room in flat`}</p>
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
            <div className="font-weight-light">{description}</div>
        </>
    );
};
const Reserve = ({ price }) => {
    const [daysCounterValue, setDaysCounterValue] = useState(0);
    const priceValue = parseInt(price.match(/\d+/g).join(''), 10);
    const currency = price.replace(/[0-9]/g, '');
    const daysCounter = days => {
        setDaysCounterValue(days);
    };
    return (
        <Row className="border p-3">
            <Col xs="12">
                <p className="mb-1">
                    <span className="font-weight-bold h5 mr-1">$24</span>
                    <span className="small font-weight-light">per night</span>
                </p>
                <p className="small">
                    <Icon
                        className="mr-1"
                        color="#00A799"
                        size={8}
                        icon="star"
                    />
                    <span className="font-weight-bold">4.48 </span>
                    <span className="text-muted">(215 reviews)</span>
                </p>
                <hr />
                <p className="mb-0 small">Dates</p>
                <DatePicker reserve daysCounter={daysCounter} />
                {daysCounterValue !== 0 && (
                    <dl className="mt-3">
                        <dt>{`${currency}${priceValue} x ${daysCounterValue} night`}</dt>
                        <dd>{`${currency}${priceValue * daysCounterValue}`}</dd>
                    </dl>
                )}
                <Button
                    color="primary"
                    block
                    size="lg"
                    className="font-weight-light mt-4 border-0 small"
                    style={{ backgroundColor: '#FF5A5F' }}
                >
                    Reserve
                </Button>
            </Col>
        </Row>
    );
};

const PropertyDetailsContainer = ({ details }) => {
    const {
        title,
        image,
        description,
        location,
        comments,
        type,
        creator,
        price,
    } = details;

    let rating = 0;
    let ratings = comments.map(comment => {
        rating = rating + comment.rating;
        return rating;
    });
    ratings = parseInt(ratings / comments.length, 10);

    return (
        <>
            <PropertyHeader
                title={title}
                rating={ratings}
                location={location}
            />
            <PropertyImages images={image} />
            <Row className="mt-5">
                <Col xs="8">
                    <PropertyDetailsItems
                        title={title}
                        description={description}
                        location={location}
                        type={type}
                        creator={creator}
                    />
                </Col>
                <Col xs="4">
                    <Reserve price={price} />
                </Col>
            </Row>
        </>
    );
};
const PropertyDetails = ({ match }) => {
    const dispatch = useDispatch();
    const [loadingItem, setLoadingItem] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const { details, loading } = useSelector(state => state.propertyDetails);
    const hasDetailsPropertyError = useError({
        from: 'propertyDetails',
    });

    const fetchingPropertyDetails = useCallback(() => {
        dispatch(propertyDetailsAction(match.params.id));
    }, [dispatch, match]);

    useEffect(() => {
        fetchingPropertyDetails();
    }, [fetchingPropertyDetails]);

    useEffect(() => {
        if (!loading) {
            setLoadingItem(false);
        }
    }, [loading]);

    useEffect(() => {
        if (hasDetailsPropertyError) {
            setLoadingItem(false);
            setNotFound(true);
        }
    }, [hasDetailsPropertyError]);

    return (
        <div className="mh--50">
            {loadingItem ? (
                <Spinner />
            ) : notFound ? (
                <NotFound />
            ) : (
                <PropertyDetailsContainerMemo details={details} />
            )}
        </div>
    );
};
const PropertyDetailsContainerMemo = React.memo(PropertyDetailsContainer);
export default withRouter(PropertyDetails);
