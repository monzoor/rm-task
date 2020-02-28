import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Media, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { post } from 'axios';
import {
    ValidationForm,
    TextInput,
    SelectGroup,
} from 'react-bootstrap4-form-validation';

// Static data
import staticUserData from '../../Config/staticUserData.js';

// Utils
import Icon from '../../Utils/IconUtils';
import NotFound from '../../Utils/NoContentFound.js';
import { Spinner } from '../../Utils/Loader';
import { RatingCreator } from '../../Utils/Utils';

// Custom Hooks
import useError from '../../CustomHook/ErrorHook';

// Actions
import propertyDetailsAction from './_Actions/propertyDetailsAction';

// Component
import DatePicker from '../Common/DatePicker';

const PropertyHeader = ({ title, rating, location }) => {
    const ratings = RatingCreator({ rating: rating, size: 20 });
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
const Reserve = ({ price, id, booking }) => {
    const dispatch = useDispatch();
    const [resetDatePicker, setResetDatePicker] = useState(false);
    const [daysCounterValue, setDaysCounterValue] = useState(0);
    const [dateRanges, setDateRanges] = useState({
        startDate: null,
        endDate: null,
    });
    const priceValue = price.match(/\d+/g)
        ? parseInt(price.match(/\d+/g).join(''), 10)
        : 0;
    const currency = price.replace(/[0-9]/g, '');

    const dateRange = ({ startDate, endDate }) => {
        setResetDatePicker(false);
        const days = moment(endDate).diff(moment(startDate), 'days');
        setDaysCounterValue(days);
        setDateRanges({
            startDate,
            endDate,
        });
    };
    const reserve = async () => {
        const data = {
            id,
            booking: dateRanges,
        };
        try {
            await post('/api/booking', data);
            dispatch(propertyDetailsAction(id));
            setResetDatePicker(true);
        } catch (error) {
            console.log('---', error);
        }
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
                <DatePicker reserve dateRange={dateRange} booking={booking} />
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
                    onClick={reserve}
                >
                    Reserve
                    {resetDatePicker && (
                        <p className="small">Your booking has been confirmed</p>
                    )}
                </Button>
            </Col>
        </Row>
    );
};

const PropertyDetailsContainer = ({ details }) => {
    const {
        _id,
        title,
        image,
        description,
        location,
        comments,
        type,
        creator,
        price,
        booking,
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
                    <Reserve id={_id} price={price} booking={booking} />
                </Col>
            </Row>
        </>
    );
};

const AddComment = props => {
    const dispatch = useDispatch();
    const { match } = props;
    const { params } = match;
    const { id } = params;

    const [showCommnetInput, setCommentInput] = useState(false);

    const showComment = () => {
        setCommentInput(!showCommnetInput);
    };
    const randomUser = staticUserData[Math.floor(Math.random() * 3)];
    console.log(randomUser);

    const submitForm = async (e, formData) => {
        e.preventDefault();
        const data = {
            location: randomUser.location,
            userName: randomUser.name,
            avatar: randomUser.avatar,
            rating: parseInt(formData.rating, 10),
            comments: formData.comments,
        };

        const response = await post(`/api/comments/${id}`, data);
        // .then(() => {

        // });
        console.log(response);
        dispatch(propertyDetailsAction(id));
    };
    return (
        <>
            <button
                onClick={showComment}
                type="button"
                className="btn btn-link small p-0 mb-2"
            >
                <span className="small">
                    {showCommnetInput ? 'Close' : 'Add comment'}
                </span>
            </button>
            {showCommnetInput && (
                <Row>
                    <Col xs="12">
                        <Media>
                            <Media left className="mr-3">
                                <img
                                    src={randomUser.avatar}
                                    className="rounded-circle"
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                                <p className="small text-center">
                                    {randomUser.name}
                                </p>
                            </Media>
                            <Media body>
                                <p className="small mb-1">Your Rating</p>
                                <ValidationForm onSubmit={submitForm}>
                                    <SelectGroup
                                        name="rating"
                                        id="rating"
                                        required
                                        errorMessage="Please select a rating."
                                    >
                                        <option value="">Pleale rate</option>
                                        <option value="1">1 Star</option>
                                        <option value="2">2 Star</option>
                                        <option value="3">3 Star</option>
                                        <option value="4">4 Star</option>
                                        <option value="5">5 Star</option>
                                    </SelectGroup>
                                    <p className="small my-1">Your Comment</p>
                                    <TextInput
                                        name="comments"
                                        id="comments"
                                        multiline
                                        required
                                        rows="5"
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-2 btn-sm"
                                    >
                                        Add Comment
                                    </button>
                                </ValidationForm>
                            </Media>
                        </Media>
                    </Col>
                </Row>
            )}
        </>
    );
};
const UserComments = ({ comments }) => {
    const hasComments = comments.length > 0;
    RatingCreator({ rating: comments, size: 20 });
    const AddCommentWithRouterProps = withRouter(AddComment);
    return (
        <Row className="mt-5">
            <Col>
                <p className="mb-0">Comments</p>
                <AddCommentWithRouterProps />
            </Col>
            {hasComments ? (
                <>
                    {comments.map((comment, i) => {
                        return (
                            <Col xs="12" className="mt-3 border-bottom" key={i}>
                                <Media>
                                    <Media left className="mr-4">
                                        <img
                                            src={comment.avatar}
                                            className="rounded-circle"
                                            alt=""
                                            width="50px"
                                            height="50px"
                                        />
                                    </Media>
                                    <Media body>
                                        <blockquote className="blockquote">
                                            <p className="mb-0">
                                                {comment.comments}
                                            </p>
                                            <footer className="blockquote-footer">
                                                {comment.userName}{' '}
                                                <cite
                                                    className="small"
                                                    title="Source Title"
                                                >
                                                    {comment.location.country}{' '}
                                                    {comment.location.city}
                                                </cite>
                                                <p>
                                                    {RatingCreator({
                                                        rating: comment.rating,
                                                        size: 10,
                                                        color: '#00A799',
                                                    })}
                                                </p>
                                            </footer>
                                        </blockquote>
                                    </Media>
                                </Media>
                            </Col>
                        );
                    })}
                </>
            ) : (
                'No Comments availabe'
            )}
        </Row>
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
        <div className="mh--50 mb-5">
            {loadingItem ? (
                <Spinner />
            ) : notFound ? (
                <NotFound />
            ) : (
                <>
                    <PropertyDetailsContainerMemo details={details[0]} />
                    <UserComments comments={details[0].comments} />
                </>
            )}
        </div>
    );
};
const PropertyDetailsContainerMemo = React.memo(PropertyDetailsContainer);
export default withRouter(PropertyDetails);
