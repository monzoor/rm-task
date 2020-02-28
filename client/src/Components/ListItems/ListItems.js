import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
} from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import searchAction from './_Actions/_searchAction';
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import queryString from 'query-string';

import { qstringCreator } from '../../Utils/Utils';
import Icon from '../../Utils/IconUtils';
import NotFound from '../../Utils/NoContentFound.js';
import history from '../../Utils/history';
import useError from '../../CustomHook/ErrorHook';
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
const PropertySlider = () => {
    return (
        <Col xs="4">
            <Slider {...settings}>
                <div>
                    <img
                        src="https://picsum.photos/seed/picsum/350/200"
                        alt=""
                    />
                </div>
                <div>
                    <img src="https://picsum.photos/350/200" alt="" />
                </div>
                <div>
                    <img src="https://picsum.photos/id/237/350/200" alt="" />
                </div>
                <div>
                    <img src="https://picsum.photos/350/200" alt="" />
                </div>
            </Slider>
        </Col>
    );
};
const PropertyList = () => {
    return (
        <Col xs="8">
            <dl className="small mb-3">
                <dt>Primate Room</dt>
                <dd>
                    <Icon
                        className="mr-1"
                        color="#FE385C"
                        size={10}
                        icon="star"
                    />
                    4.61 (207)
                </dd>
            </dl>
            <p className="h5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Assumenda, quam.
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
                distinctio odio dicta qui accusantium veritatis doloremque
                reiciendis in.
            </p>
            <p className="text-right">
                <span className="h3 text-black">$28</span>/ night
            </p>
        </Col>
    );
};

const PropertyListItems = ({ properties }) => {
    // console.dir(properties);

    return (
        <>
            {properties.map(property => {
                return (
                    <Row key={property._id} className="border-bottom pb-3 mb-3">
                        <PropertySlider />
                        <PropertyList />
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
        }
    }, [loading]);

    useEffect(() => {
        if (hasPropertiesListError) {
            setLoadingItem(false);
            setNotFound(true);
        }
    }, [hasPropertiesListError]);

    const handlePageClick = data => {
        console.log('-----', paginationInfo.currentPage);

        const selected = data.selected;
        const offset = Math.ceil(selected * paginationInfo.limit);

        console.log(
            '----',
            Math.ceil(selected * paginationInfo.limit),
            selected,
            paginationInfo.limit,
            qstringCreator(search, offset + 1)
        );
        history.push(`/list?${qstringCreator(search, offset + 1)}`);
        // this.setState({ offset: offset }, () => {
        //     this.loadCommentsFromServer();
        // });
    };
    // console.log('---', parseInt(queryString.parse(search).page, 10) - 1);

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
                    </>
                )}
            </Col>
        </Row>
    );
};

export default withRouter(PropertiesList);
