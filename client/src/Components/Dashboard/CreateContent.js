import React from 'react';
import { Container, Row, Col, FormGroup } from 'reactstrap';
import {
    ValidationForm,
    TextInputGroup,
} from 'react-bootstrap4-form-validation';

const CreateContent = () => {
    const subTest = () => {};
    return (
        <Container className="my-5">
            <Row>
                <Col xs="12" className="mb-4">
                    <h4>Create property</h4>
                </Col>
                <Col xs="8">
                    <ValidationForm className="row" onSubmit={subTest}>
                        <FormGroup className="col-12">
                            <label htmlFor="title">
                                Title <sup className="text-danger small">*</sup>
                            </label>
                            <TextInputGroup
                                id="title"
                                name="title"
                                // value={formDatas.name}
                                required
                                placeholder="Anywhere"
                                // onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="col-12">
                            <label htmlFor="description">
                                Description{' '}
                                <sup className="text-danger small">*</sup>
                            </label>
                            <TextInputGroup
                                id="description"
                                name="description"
                                // value={formDatas.name}
                                required
                                placeholder="Anywhere"
                                // onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <label htmlFor="price">
                                Price <sup className="text-danger small">*</sup>
                            </label>
                            <TextInputGroup
                                id="price"
                                name="price"
                                // value={formDatas.name}
                                required
                                placeholder="Anywhere"
                                // onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <label htmlFor="country">
                                Country{' '}
                                <sup className="text-danger small">*</sup>
                            </label>
                            <TextInputGroup
                                id="country"
                                name="country"
                                // value={formDatas.name}
                                required
                                placeholder="Anywhere"
                                // onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <label htmlFor="city">
                                City <sup className="text-danger small">*</sup>
                            </label>
                            <TextInputGroup
                                id="city"
                                name="city"
                                // value={formDatas.name}
                                required
                                placeholder="Anywhere"
                                // onChange={handleChange}
                            />
                        </FormGroup>
                    </ValidationForm>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateContent;
