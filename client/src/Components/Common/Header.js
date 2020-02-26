import React from 'react';
import {
    Container,
    Row,
    Col,
    Navbar,
    Nav,
    NavItem,
    NavLink,
    FormGroup,
} from 'reactstrap';
import {
    ValidationForm,
    TextInputGroup,
} from 'react-bootstrap4-form-validation';

import Icon from '../../Utils/IconUtils';
import Date from './DatePicker';
const subTest = () => {
    console.log('---');
};
const HeaderSearchBox = () => {
    return (
        <Nav className="mr-auto">
            <NavItem>
                <ValidationForm onSubmit={subTest}>
                    <Row className="search--header">
                        <Col xs="3" className="pr-0">
                            <FormGroup className="location shadow-sm">
                                <TextInputGroup
                                    // className="border-right-0"
                                    name="name"
                                    // value={formDatas.name}
                                    id="userName"
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
                                    id="userName"
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
                                    id="userName"
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
                <NavLink to="/" className="nav-link">
                    Become a host
                </NavLink>
            </NavItem>
            <NavItem className="nav-item">
                <NavLink to="/" className="nav-link">
                    Help
                </NavLink>
            </NavItem>
            <NavItem className="nav-item">
                <NavLink to="/" className="nav-link">
                    Sign Up
                </NavLink>
            </NavItem>
            <NavItem className="nav-item">
                <NavLink to="/" className="nav-link">
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
                <NavLink to="/" className="nav-link active">
                    FOR YOU
                </NavLink>
            </NavItem>
            <NavItem className="nav-item">
                <NavLink to="/" className="nav-link">
                    HOMES
                </NavLink>
            </NavItem>
            <NavItem className="nav-item">
                <NavLink to="/" className="nav-link">
                    EXPERIENCE
                </NavLink>
            </NavItem>
            <NavItem className="nav-item">
                <NavLink to="/" className="nav-link">
                    PLACES
                </NavLink>
            </NavItem>
        </Nav>
    );
};
const Search = () => {
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
                <ValidationForm onSubmit={subTest}>
                    <Row className="search--main mb-3">
                        <Col xs="5" className="px-0 ml-1 border property">
                            <FormGroup>
                                <TextInputGroup
                                    // className="border-right-0"
                                    name="name"
                                    // value={formDatas.name}
                                    id="userName"
                                    minLength="4"
                                    required
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
                                    // onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col className="px-0 border">
                            <FormGroup className="location">
                                <TextInputGroup
                                    // className="border-right-0"
                                    name="name"
                                    // value={formDatas.name}
                                    id="userName"
                                    minLength="4"
                                    required
                                    prepend={
                                        <span className="input-group-text border-0">
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
                        <Col className="px-0 border person">
                            <FormGroup>
                                <TextInputGroup
                                    // className="border-right-0"
                                    name="name"
                                    // value={formDatas.name}
                                    id="userName"
                                    minLength="4"
                                    required
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
                <Date />
                <Container>
                    <Search />
                </Container>
            </Col>
        </Row>
    );
};

export default Header;
