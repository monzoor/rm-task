import React, { useState } from 'react';
import {
    Row,
    Col,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    FormGroup,
} from 'reactstrap';
import {
    ValidationForm,
    TextInputGroup,
} from 'react-bootstrap4-form-validation';

import Icon from '../../Utils/IconUtils';

const HeaderSearchBox = () => {
    return (
        <Nav className="mr-auto">
            <NavItem>
                <ValidationForm>
                    <Row className="header_search">
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
const Header = () => {
    return (
        <Col xs="12" className="px-0 small mb-5">
            <Navbar color="white" light expand="md">
                <HeaderSearchBox />
                <StaticNav />
            </Navbar>
            <SecendaryStaticNav />
        </Col>
    );
};

export default Header;
