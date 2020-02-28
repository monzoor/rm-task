import React from 'react';
import moment from 'moment';
import queryString from 'query-string';
import Icon from './IconUtils';

const ratingValuesCreator = comments => {
    let rating = 0;
    comments.map(comment => {
        rating = rating + comment.rating;
        return rating;
    });
    const ratings = parseFloat(rating / comments.length, 10);
    return {
        ratings: isNaN(ratings) ? 0 : ratings.toFixed(2),
        reviews: comments.length,
    };
};
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
    let isoStartDate = null;
    let isoEndDate = null;
    if (queryStringDatas.startDate && queryStringDatas.endDate) {
        isoStartDate = new Date(
            moment(queryStringDatas.startDate).format('YYYY-DD-MM')
        ).toISOString();

        isoEndDate = new Date(
            moment(queryStringDatas.endDate).format('YYYY-DD-MM')
        ).toISOString();
    }

    if (Object.keys(queryStringDatas).length) {
        const offsetSring =
            !queryStringDatas.page && offset > 0 ? `page=${offset}&` : null;

        const pageString = queryStringDatas.page
            ? `page=${offset > 0 ? offset : queryStringDatas.page}&`
            : null;

        const limitString = queryStringDatas.limit
            ? `limit=${queryStringDatas.limit}&`
            : null;

        const searchString = queryStringDatas.location
            ? `location=${queryStringDatas.location}`
            : null;

        const dateRange =
            isoStartDate && isoEndDate
                ? `&startDate=${isoStartDate}&endDate=${isoEndDate}`
                : null;

        stringItems = `${offsetSring ? offsetSring : ''}${
            pageString ? pageString : ''
        }${searchString ? searchString : ''}${limitString ? limitString : ''}${
            dateRange ? dateRange : ''
        }`;
    }
    return stringItems;
};
export { qstringCreator, RatingCreator, ratingValuesCreator };
