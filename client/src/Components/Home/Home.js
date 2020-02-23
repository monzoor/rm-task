import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Media } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

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

const FeatureItems = ({ properties }) => {
    return (
        <Row>
            {properties.map(property => {
                return (
                    <Col xs="4" className="mb-4" key={property._id}>
                        <img
                            src={property.image[0]}
                            className="img-fluid border-rounded"
                            alt=""
                        />
                        {property.comments.map(comment => {
                            const ratings = [];
                            for (let i = 1; i <= comment.rating; i++) {
                                ratings.push(
                                    <Icon
                                        className="mr-2"
                                        color="#03848a"
                                        size={15}
                                        icon="star"
                                    />
                                );
                            }
                            return (
                                <>
                                    <div className="rating my-2">{ratings}</div>
                                    <p className="descriptions small">
                                        {comment.comments}
                                    </p>
                                    <Media>
                                        <Media left href="#">
                                            <img
                                                src={comment.avatar}
                                                className="rounded-circle"
                                                alt=""
                                                width="50px"
                                                height="50px"
                                            />
                                        </Media>
                                        <Media body className="ml-2 text-muted">
                                            <p className="mb-0">
                                                {comment.userName}
                                            </p>
                                            <p className="small">
                                                {comment.location.country}
                                            </p>
                                        </Media>
                                    </Media>
                                </>
                            );
                        })}
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
        if (hasFeaturePropertiesError) setNotFound(true);
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
