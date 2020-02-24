import { lazy } from 'react';

import PublicLayout from '../Components/Layouts/PublicLayout';
import NotFound from '../Components/404';
const Home = lazy(() => import('../Components/Home/Home'));
const PropertyDetais = lazy(() =>
    import('../Components/PropertyDetails/PropertyDetails.js')
);
export default [
    {
        path: '/',
        exact: true,
        component: Home,
        layout: PublicLayout,
    },
    {
        path: '/details/:id',
        exact: true,
        component: PropertyDetais,
        layout: PublicLayout,
    },
    {
        path: '*',
        exact: true,
        component: NotFound,
        layout: PublicLayout,
        status: 404,
    },
];
