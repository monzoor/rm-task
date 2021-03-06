import React from 'react';
import ContentLoader from 'react-content-loader';
import loadingImage from '../Assets/images/loader.gif';

const FeaturePropertiesLoader = () => (
    <ContentLoader
        speed={2}
        width={360}
        height={400}
        viewBox="0 0 400 200"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="11" y="147" rx="3" ry="3" width="100" height="6" />
        <rect x="11" y="124" rx="3" ry="3" width="178" height="6" />
        <circle cx="31" cy="176" r="20" />
        <rect x="10" y="5" rx="0" ry="0" width="100%" height="111" />
        <rect x="11" y="136" rx="3" ry="3" width="178" height="6" />
        <rect x="62" y="166" rx="3" ry="3" width="71" height="5" />
        <rect x="63" y="176" rx="3" ry="3" width="30" height="5" />
    </ContentLoader>
);

const Spinner = () => {
    return (
        <div className="img-loader-init">
            <img src={loadingImage} alt="loading" />
        </div>
    );
};

export { FeaturePropertiesLoader, Spinner };
