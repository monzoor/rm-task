import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col, FormGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

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
    SelectGroup,
} from 'react-bootstrap4-form-validation';
import { post } from 'axios';
import { useDropzone } from 'react-dropzone';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
};

const DropZoneImage = ({
    fileUploaded,
    errorFromImageUpload,
    uploadedImageData,
}) => {
    const [files, setFiles] = useState([]);
    const [uploadingFile, setUploadingFile] = useState(false);
    const onDrop = useCallback(
        acceptedFiles => {
            if (acceptedFiles.length > 3 || uploadedImageData > 3) {
                errorFromImageUpload('You can not upload more then 3 images');
                return;
            }
            errorFromImageUpload(false);
            setUploadingFile(true);
            setFiles(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
            const data = new FormData();
            for (let i = 0; i < acceptedFiles.length; i += 1) {
                data.append('file', acceptedFiles[i]);
            }
            post('/api/img/upload', data)
                .then(response => {
                    fileUploaded(response.data);
                    setUploadingFile(false);
                })
                .catch(error => {
                    setUploadingFile(false);
                });
        },
        [fileUploaded, errorFromImageUpload, uploadedImageData]
    );
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
    });
    const thumbs = uploadedImageData.map(file => (
        <div style={thumb} key={file.url}>
            <div style={thumbInner}>
                <img src={file.url} style={img} alt="" />
            </div>
        </div>
    ));
    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview));
        },
        [files]
    );
    return (
        <>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input multiple name="productImage" {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <small style={{ visibility: `${uploadingFile ? '' : 'hidden'}` }}>
                Loading...
            </small>
            <aside style={thumbsContainer}>{thumbs}</aside>
        </>
    );
};
const CreateContent = () => {
    const alertPopUp = useAlert();
    const [uploadedImageData, setUploadedImageData] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [imageUploadValidation, setImageUploadValidation] = useState(false);
    const [formDatas, setFromDatas] = useState({
        title: '',
        description: '',
        price: '',
        country: '',
        City: '',
        images: [],
        type: '',
        currency: '',
    });

    const fileUploaded = filesUrls => {
        setUploadedImageData([...uploadedImageData, ...filesUrls]);
    };

    const errorFromImageUpload = errorMessage => {
        setImageUploadValidation(errorMessage);
    };

    const handleChange = e => {
        setLoadingData(false);
        setFromDatas({
            ...formDatas,
            [e.target.name]: e.target.value,
        });
    };
    const subTest = async (e, formData) => {
        e.preventDefault();

        if (uploadedImageData.length === 0 && uploadedImageData.length < 4) {
            setImageUploadValidation('Please Upload image');
            return;
        }

        const allFormData = {
            ...formData,
            images: uploadedImageData,
            price: `${formData.currency}${formData.price}`,
        };
        setLoadingData(true);
        try {
            const response = await post('/api/createProperty', allFormData);
            alertPopUp.success(response.data.message);
        } catch (error) {
            alertPopUp.danger(error.data.message);
            setLoadingData(false);
        }
    };

    return (
        <Container className="my-5">
            <Link to="/">Home</Link>
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
                                placeholder="Description"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="col-6">
                            <label htmlFor="type">Select type</label>
                            <SelectGroup
                                name="type"
                                id="type"
                                value={formDatas.type}
                                required
                                errorMessage="Please select a type."
                                onChange={handleChange}
                            >
                                <option value="">Select Type</option>
                                <option value="Private room in flat">
                                    Private room in flat
                                </option>
                                <option value="Delux room in hotel">
                                    Delux room in hotel
                                </option>
                                <option value="Single room in a flat">
                                    Single room in a flat
                                </option>
                            </SelectGroup>
                        </FormGroup>
                        <FormGroup className="col-6">
                            <label htmlFor="price">
                                Price <sup className="text-danger small">*</sup>
                            </label>
                            <TextInputGroup
                                id="price"
                                name="price"
                                type="number"
                                value={formDatas.name}
                                required
                                minLength="1"
                                placeholder="Amount"
                                onChange={handleChange}
                                prepend={
                                    <span className="input-group-text p-0 border-0">
                                        <SelectGroup
                                            name="currency"
                                            id="currency"
                                            value={formDatas.currency}
                                            required
                                            errorMessage="Please select a type."
                                            onChange={handleChange}
                                        >
                                            <option defaultValue value="$">
                                                $
                                            </option>
                                            <option value="€">€</option>
                                            <option value="৳">৳</option>
                                            <option value="¥">¥</option>
                                        </SelectGroup>
                                    </span>
                                }
                            />
                        </FormGroup>
                        <FormGroup className="col-6">
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
                                placeholder="Country"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="col-6">
                            <label htmlFor="city">
                                City <sup className="text-danger small">*</sup>
                            </label>
                            <TextInputGroup
                                minLength="2"
                                id="city"
                                name="city"
                                value={formDatas.name}
                                required
                                placeholder="City"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <Col xs="12">
                            <label htmlFor="imageUpload">
                                Image Upload{' '}
                                <span className="small">3 image must</span>
                                <sup className="text-danger small">*</sup>
                            </label>
                            {imageUploadValidation && (
                                <p className="text-danger small">
                                    {imageUploadValidation}
                                </p>
                            )}
                            <DropZoneImage
                                id="imageUpload"
                                fileUploaded={fileUploaded}
                                errorFromImageUpload={errorFromImageUpload}
                                uploadedImageData={uploadedImageData}
                            />
                        </Col>
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
