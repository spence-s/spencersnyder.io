import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout';

const SecondPage = () => (
    <Layout>
        <div>Spencer Snyder has been programming some lol</div>
        <Link to="/">Go back to the homepage</Link>
    </Layout>
);

export default SecondPage;
