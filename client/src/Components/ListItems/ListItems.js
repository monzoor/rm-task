import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
} from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import queryString from 'query-string';

import searchAction from './_Actions/_searchAction';

import useError from '../../CustomHook/ErrorHook';

import { qstringCreator } from '../../Utils/Utils';
import { ratingValuesCreator } from '../../Utils/Utils';

import Icon from '../../Utils/IconUtils';
import NotFound from '../../Utils/NoContentFound.js';
import history from '../../Utils/history';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
};
const PropertySlider = ({ images }) => {
    return (
        <Col xs="4">
            <Slider {...settings}>
                <div>
                    <div
                        className="bg-img"
                        style={{ backgroundImage: `url(${images[0].url})` }}
                    />
                </div>
                <div>
                    <div
                        className="bg-img"
                        style={{ backgroundImage: `url(${images[1].url})` }}
                    />
                </div>
                <div>
                    <div
                        className="bg-img"
                        style={{ backgroundImage: `url(${images[2].url})` }}
                    />
                </div>
            </Slider>
        </Col>
    );
};
const PropertyList = ({ type, title, description, price, comments }) => {
    const priceValue = price.match(/\d+/g)
        ? parseInt(price.match(/\d+/g).join(''), 10)
        : 0;
    const currency = price.replace(/[0-9]/g, '');
    const ratings = ratingValuesCreator(comments);

    return (
        <>
            <dl className="small mb-3">
                <dt>{type}</dt>
                <dd>
                    <Icon
                        className="mr-1"
                        color="#FE385C"
                        size={10}
                        icon="star"
                    />
                    {`${ratings.ratings}`} {`(${ratings.reviews})`}
                </dd>
            </dl>
            <p className="h5">{title}</p>
            <p className="small">{description}</p>
            <p className="text-right price-position">
                <span className="h3 text-black">{`${currency}${priceValue}`}</span>
                / night
            </p>
        </>
    );
};

const PropertyListItems = ({ properties }) => {
    return (
        <>
            {properties.map(property => {
                return (
                    <Row key={property._id} className="border-bottom pb-3 mb-3">
                        <PropertySlider images={property.image} />
                        <Col xs="8" className="position-relative">
                            <Link to={`/details/${property._id}`}>
                                <PropertyList
                                    type={property.type}
                                    title={property.title}
                                    comments={property.comments}
                                    description={property.description}
                                    price={property.price}
                                />
                            </Link>
                        </Col>
                    </Row>
                );
            })}
        </>
    );
};
const PropertiesList = props => {
    const { location } = props;
    const { search } = location;
    const currentPage = parseInt(queryString.parse(search).page, 10) - 1;
    const currentSearch = useRef(search);
    const dispatch = useDispatch();
    const [loadingItem, setLoadingItem] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const { propertiesList, loading, paginationInfo } = useSelector(
        state => state.propertiesList
    );

    const hasPropertiesListError = useError({
        from: 'propertiesLists',
    });
    useEffect(() => {
        currentSearch.current = search;
    });

    const searchingFnCreator = {
        newSearchFn: searchItem => {
            if (!loadingItem) {
                dispatch(searchAction(searchItem, true));
            }
        },
    };
    const searchingStringRef = useRef({});

    useEffect(() => {
        searchingStringRef.current = searchingFnCreator;
    });

    useMemo(() => {
        if (searchingStringRef.current.newSearchFn) {
            searchingStringRef.current.newSearchFn(search);
        }
    }, [search]);

    const fetchingProperties = useCallback(() => {
        if (loadingItem) {
            dispatch(searchAction(currentSearch.current));
        }
    }, [dispatch, loadingItem]);

    useEffect(() => {
        fetchingProperties();
    }, [fetchingProperties]);

    useEffect(() => {
        if (!loading) {
            setLoadingItem(false);
            setNotFound(false);
        }
    }, [loading]);

    useEffect(() => {
        if (hasPropertiesListError) {
            setLoadingItem(false);
            setNotFound(true);
        }
    }, [hasPropertiesListError]);

    const handlePageClick = data => {
        const selected = data.selected;
        const offset = Math.ceil(selected * paginationInfo.limit);
        history.push(`/list?${qstringCreator(search, offset + 1)}`);
    };

    return (
        <Row>
            <Col xs="12">
                {loadingItem ? (
                    'loading'
                ) : notFound ? (
                    <NotFound />
                ) : (
                    <>
                        <PropertyListItems properties={propertiesList} />
                        {paginationInfo.totalPage > 1 && (
                            <ReactPaginate
                                forcePage={isNaN(currentPage) ? 0 : currentPage}
                                previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={paginationInfo.totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                            />
                        )}
                    </>
                )}
            </Col>
        </Row>
    );
};

export default withRouter(PropertiesList);
