import React from 'react';

import queryString from 'query-string';
import Icon from './IconUtils';

const RatingCreator = values => {
    const defaults = {
        rating: 1,
        color: '#ffbb06',
        size: 20,
        ...values,
    };

    const ratings = [];
    for (let i = 1; i <= defaults.rating; i++) {
        ratings.push(
            <Icon
                key={i}
                className="mr-2"
                color={defaults.color}
                size={defaults.size}
                icon="star"
            />
        );
    }
    return ratings;
};
const qstringCreator = (query, offset = 0) => {
    const queryStringDatas = queryString.parse(query);
    let stringItems = '';

    if (Object.keys(queryStringDatas).length) {
        const offsetSring =
            !queryStringDatas.page && offset > 0 ? `page=${offset}&` : null;
        const pageString = queryStringDatas.page
            ? `page=${offset > 0 ? offset : queryStringDatas.page}&`
            : null;
        const limiString = queryStringDatas.limit
            ? `limit=${queryStringDatas.limit}&`
            : null;
        const searchString = queryStringDatas.location
            ? `location=${queryStringDatas.location}`
            : null;
        stringItems = `${offsetSring ? offsetSring : ''}${
            pageString ? pageString : ''
        }${searchString ? searchString : ''}${limiString ? limiString : ''}`;
    }
    return stringItems;
};
export { qstringCreator, RatingCreator };
