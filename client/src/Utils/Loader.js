import React from 'react';
import ContentLoader from 'react-content-loader';

const FeaturePropertiesLoader = () => (
    <ContentLoader
        speed={2}
        width={400}
        height={200}
        viewBox="0 0 400 200"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="11" y="147" rx="3" ry="3" width="88" height="6" />
        <rect x="11" y="124" rx="3" ry="3" width="178" height="6" />
        <circle cx="31" cy="176" r="20" />
        <rect x="10" y="5" rx="0" ry="0" width="179" height="111" />
        <rect x="11" y="136" rx="3" ry="3" width="178" height="6" />
        <rect x="62" y="166" rx="3" ry="3" width="71" height="5" />
        <rect x="63" y="176" rx="3" ry="3" width="30" height="5" />
    </ContentLoader>
);

export { FeaturePropertiesLoader };
