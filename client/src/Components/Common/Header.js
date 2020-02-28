import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Navbar,
    Nav,
    NavItem,
    FormGroup,
} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import {
    ValidationForm,
    TextInputGroup,
} from 'react-bootstrap4-form-validation';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import moment from 'moment';

// Utils
import history from '../../Utils/history';
import Icon from '../../Utils/IconUtils';

// Component
import Date from './DatePicker';

const HeaderSearchBox = () => {
    const subTest = () => {
        console.log('---');
    };
    return (
        <Nav className="mr-auto">
            <NavItem>
                <ValidationForm onSubmit={subTest}>
                    <Row className="search--header">
                        <Col xs="3" className="pr-0">
                            <FormGroup className="location shadow-sm">
                                <TextInputGroup
                                    name="name"
                                    id="searchTop"
                                    minLength="4"
                                    required
                                    prepend={
                                        <span className="input-group-text">
                                            <Icon
                                                color="#444"
                                                size={15}
                                                icon="search"
                                            />
                                        </span>
                                    }
                                    placeholder="Anywhere"
                                    // onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="3" className="px-0">
                            <FormGroup className="date shadow-sm">
                                <TextInputGroup
                                    name="name"
                                    // value={formDatas.name}
                                    id="dates"
                                    minLength="4"
                                    required
                                    prepend={
                                        <span className="input-group-text">
                                            <Icon
                                                color="#444"
                                                size={15}
                                                icon="calendar"
                                            />
                                        </span>
                                    }
                                    placeholder="Anywhere"
                                    // onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="3" className="pl-0">
                            <FormGroup className="guest shadow-sm">
                                <TextInputGroup
                                    name="name"
                                    // value={formDatas.name}
                                    id="userItems"
                                    minLength="4"
                                    required
                                    prepend={
                                        <span className="input-group-text">
                                            <Icon
                                                color="#444"
                                                size={15}
                                                icon="users"
                                            />
                                        </span>
                                    }
                                    placeholder="Your Name"
                                    // onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ValidationForm>
            </NavItem>
        </Nav>
    );
};
const StaticNav = () => {
    return (
        <Nav>
            <NavItem className="nav-item">
                <NavLink to="/host" className="nav-link">
                    Become a host
                </NavLink>
            </NavItem>
            <NavItem className="nav-item">
                <Link to="/create" className="nav-link">
                    Create
                </Link>
            </NavItem>
            <NavItem className="nav-item">
                <NavLink to="/signup" className="nav-link">
                    Sign Up
                </NavLink>
            </NavItem>
            <NavItem className="nav-item">
                <NavLink to="/login" className="nav-link">
                    Log in
                </NavLink>
            </NavItem>
        </Nav>
    );
};
const SecendaryStaticNav = () => {
    return (
        <Nav className="small shadow-sm nav--secendary px-2">
            <NavItem className="nav-item">
                <NavLink exact to="/" className="nav-link">
                    HOME
                </NavLink>
            </NavItem>
            <NavItem className="nav-item">
                <NavLink exact to="/list" className="nav-link">
                    LIST
                </NavLink>
            </NavItem>
            <NavItem className="nav-item">
                <NavLink to="/exp" className="nav-link">
                    EXPERIENCE
                </NavLink>
            </NavItem>
            <NavItem className="nav-item">
                <NavLink to="/place" className="nav-link">
                    PLACES
                </NavLink>
            </NavItem>
        </Nav>
    );
};
const Search = props => {
    const queryStringDatas = queryString.parse(props.location.search);
    const [formDatas, setFormDatas] = useState({
        location: Object.keys(queryStringDatas)
            ? queryStringDatas.location
                ? queryStringDatas.location
                : ''
            : '',
    });
    const [dateRanges, setDateRanges] = useState({
        startDate: Object.keys(queryStringDatas)
            ? queryStringDatas.startDate
                ? queryStringDatas.startDate
                : ''
            : '',
        endDate: Object.keys(queryStringDatas)
            ? queryStringDatas.endDate
                ? queryStringDatas.endDate
                : ''
            : '',
    });
    const handleChange = e => {
        setFormDatas({
            ...formDatas,
            [e.target.name]: e.target.value,
        });
    };
    const SearchSubmit = (e, formData) => {
        e.preventDefault();
        if (!formData.location && !dateRanges.startDate && !dateRanges.endDate)
            return;
        const locationSearchString = formData.location
            ? `location=${formData.location}`
            : '';
        const startDateString = dateRanges.startDate
            ? `startDate=${moment(dateRanges.startDate).format('DD-MM-YYYY')}`
            : '';
        const endDateString = dateRanges.endDate
            ? `endDate=${moment(dateRanges.endDate).format('DD-MM-YYYY')}`
            : '';
        const searchString = `${
            locationSearchString ? locationSearchString : ''
        }${
            locationSearchString && startDateString && endDateString ? '&' : ''
        }${
            startDateString && endDateString
                ? `${startDateString}&${endDateString}`
                : ''
        }`;

        history.push(`/list?${searchString}`);
    };

    const dateRange = ({ startDate, endDate }) => {
        setDateRanges({
            startDate,
            endDate,
        });
    };

    return (
        <Row className="bg-primary mb-5">
            <Col xs="12">
                <h2 className="text-white mb-0 font-weight-light">Resorts</h2>
                <p className="text-white font-weight-light small">
                    Treat yourself!! Your dream resort stay is just a few clicks
                    away.
                </p>
            </Col>

            <Col xs="12">
                <ValidationForm onSubmit={SearchSubmit}>
                    <Row className="search--main mb-3">
                        <Col xs="4" className="px-0 ml-1 border property">
                            <FormGroup>
                                <TextInputGroup
                                    name="location"
                                    value={formDatas.location}
                                    id="searchText"
                                    prepend={
                                        <span className="input-group-text border-0">
                                            <Icon
                                                color="#444"
                                                size={15}
                                                icon="bed"
                                            />
                                        </span>
                                    }
                                    placeholder="Anywhere"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col className="px-0 border">
                            <FormGroup className="location main-datepicker">
                                <Date dateRange={dateRange} />
                            </FormGroup>
                        </Col>
                        <Col className="px-0 border person">
                            <FormGroup>
                                <TextInputGroup
                                    name="name"
                                    // value={formDatas.name}
                                    id="items"
                                    prepend={
                                        <span className="input-group-text border-0">
                                            <Icon
                                                color="#444"
                                                size={15}
                                                icon="users"
                                            />
                                        </span>
                                    }
                                    placeholder="Anywhere"
                                    // onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="auto" className="px-0 mr-1">
                            <button className="btn text-white border">
                                Search
                            </button>
                        </Col>
                    </Row>
                </ValidationForm>
            </Col>
        </Row>
    );
};
const Header = () => {
    return (
        <Row>
            <Col xs="12" className="px-0 small mb-5">
                <Navbar color="white" light expand="md">
                    <HeaderSearchBox />
                    <StaticNav />
                </Navbar>
                <SecendaryStaticNav />
            </Col>
            <Col xs="12">
                <Container>
                    <MainHeaderSearch />
                </Container>
            </Col>
        </Row>
    );
};
const MainHeaderSearch = withRouter(Search);
export default Header;
