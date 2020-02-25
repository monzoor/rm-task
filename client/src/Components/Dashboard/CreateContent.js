import React, { useState } from 'react';
import { Container, Row, Col, FormGroup, Button } from 'reactstrap';
import {
    transitions,
    positions,
    Provider as AlertProvider,
    useAlert,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import {
    ValidationForm,
    TextInputGroup,
    TextInput,
} from 'react-bootstrap4-form-validation';
import { post } from 'axios';

const CreateContent = () => {
    const alertPopUp = useAlert();
    const [loadingData, setLoadingData] = useState(false);
    const [formDatas, setFromDatas] = useState({
        title: '',
        description: '',
        price: '',
        country: '',
        City: '',
    });

    const handleChange = e => {
        setLoadingData(false);
        setFromDatas({
            // ...formDatas,
            [e.target.name]: e.target.value,
        });
    };
    const subTest = async (e, formData) => {
        e.preventDefault();
        setLoadingData(true);
        try {
            const response = await post('/api/createProperty', formData);
            alertPopUp.success(response.data.message);
        } catch (error) {
            setLoadingData(false);
        }
    };
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
                                minLength="4"
                                id="title"
                                name="title"
                                value={formDatas.name}
                                required
                                placeholder="Title"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="col-12">
                            <label htmlFor="description">
                                Description{' '}
                                <sup className="text-danger small">*</sup>
                            </label>
                            <TextInput
                                id="description"
                                name="description"
                                value={formDatas.name}
                                required
                                multiline
                                minLength="4"
                                rows="5"
                                placeholder="Anywhere"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <label htmlFor="price">
                                Price <sup className="text-danger small">*</sup>
                            </label>
                            <TextInputGroup
                                id="price"
                                name="price"
                                value={formDatas.name}
                                required
                                minLength="1"
                                placeholder="Anywhere"
                                onChange={handleChange}
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
                                minLength="2"
                                value={formDatas.name}
                                required
                                placeholder="Anywhere"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <label htmlFor="city">
                                City <sup className="text-danger small">*</sup>
                            </label>
                            <TextInputGroup
                                minLength="2"
                                id="city"
                                name="city"
                                value={formDatas.name}
                                required
                                placeholder="Anywhere"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <Col xs="12">
                            <Button
                                disabled={loadingData}
                                type="submit"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </Col>
                    </ValidationForm>
                </Col>
            </Row>
        </Container>
    );
};

const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE,
};
const CreateContents = () => (
    <AlertProvider template={AlertTemplate} {...options}>
        <CreateContent />
    </AlertProvider>
);
export default CreateContents;
