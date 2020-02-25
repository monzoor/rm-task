import { post } from 'axios';

const createPropertyAction = data => {
    post('/api/createProperty', data)
        .then(response => {
            console.log('---res', response);
        })
        .catch(error => {
            console.log('---', error);
        });
};

export default createPropertyAction;
