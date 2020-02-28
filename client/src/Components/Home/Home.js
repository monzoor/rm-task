import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Media } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Icon from '../../Utils/IconUtils';
import { FeaturePropertiesLoader } from '../../Utils/Loader';
import NotFound from '../../Utils/NoContentFound.js';
import useError from '../../CustomHook/ErrorHook';
// Actions
import featurePropertiesAction from './_Actions/featurePropertiesAction';

const FeaturePropertiesLoaders = () => (
    <Row>
        <Col xs="4">
            <FeaturePropertiesLoader />
        </Col>
        <Col xs="4">
            <FeaturePropertiesLoader />
        </Col>
        <Col xs="4">
            <FeaturePropertiesLoader />
        </Col>
    </Row>
);

const StaticHeader = () => {
    return (
        <Row>
            <Col xs="12">
                <p className="h4">
                    What guests are saying about home in the United kingdom
                </p>
                <p className="small font-weight-light">
                    United kingdom homes were rated <b>4.7 out of 5 stars</b>{' '}
                    whith <b>10,500,00+ reviews</b>
                </p>
            </Col>
        </Row>
    );
};

const Comments = ({ comments }) => {
    const maxRatingValue = Math.max.apply(
        Math,
        comments.map(o => {
            return o.rating;
        })
    );
    const maxRatingComments = comments.filter(item => {
        return item.rating === maxRatingValue;
    });
    const ratingsStar = [];
    for (let i = 1; i <= maxRatingValue; i++) {
        ratingsStar.push(
            <Icon
                key={i}
                className="mr-2"
                color="#03848a"
                size={15}
                icon="star"
            />
        );
    }

    return (
        <>
            <div className="rating my-2">{ratingsStar}</div>
            <p className="descriptions small">
                {maxRatingComments[0].comments}
            </p>
            <Media>
                <img
                    src={maxRatingComments[0].avatar}
                    className="rounded-circle"
                    alt=""
                    width="50px"
                    height="50px"
                />
                <Media body className="ml-2 text-muted">
                    <p className="mb-0">{maxRatingComments[0].userName}</p>
                    <p className="small">
                        {maxRatingComments[0].location.country}
                    </p>
                </Media>
            </Media>
        </>
    );
};
const HeadersForProperty = ({ title, location }) => {
    const { country, city } = location;
    return (
        <>
            <p className="h5 mb-1 mt-2">{title}</p>
            <p className="small">{`${country}, ${city}`}</p>
        </>
    );
};
const FeatureItems = ({ properties }) => {
    return (
        <Row>
            {properties.map(property => {
                return (
                    <Col xs="4" className="mb-4" key={property._id}>
                        <Link to={`/details/${property._id}`}>
                            <div
                                style={{
                                    backgroundImage: `url(${property.image[0].url})`,
                                }}
                                className="bg-img"
                            />
                            {property.comments.length ? (
                                <Comments comments={property.comments} />
                            ) : (
                                <HeadersForProperty
                                    title={property.title}
                                    location={property.location}
                                />
                            )}
                        </Link>
                    </Col>
                );
            })}
        </Row>
    );
};
const Home = () => {
    const dispatch = useDispatch();
    const [loadingItem, setLoadingItem] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const { properties, loading } = useSelector(
        state => state.featurePropertiesLists
    );
    const hasFeaturePropertiesError = useError({
        from: 'featurePropertiesLists',
    });
    const fetchingProperties = useCallback(() => {
        if (loadingItem) {
            dispatch(featurePropertiesAction());
        }
    }, [dispatch, loadingItem]);

    useEffect(() => {
        fetchingProperties();
    }, [fetchingProperties]);

    useEffect(() => {
        if (!loading) {
            setLoadingItem(false);
        }
    }, [loading]);

    useEffect(() => {
        if (hasFeaturePropertiesError) {
            setLoadingItem(false);
            setNotFound(true);
        }
    }, [hasFeaturePropertiesError]);

    return (
        <>
            <StaticHeader />
            {loadingItem ? (
                <FeaturePropertiesLoaders />
            ) : notFound ? (
                <NotFound />
            ) : (
                <FeatureItemsMemoContainer properties={properties} />
            )}
        </>
    );
};
const FeatureItemsMemoContainer = React.memo(FeatureItems);
export default Home;
