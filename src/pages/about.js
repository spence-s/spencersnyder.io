import React, { Component } from 'react';
import { Box } from 'grommet';

import Layout from '../components/Layout';

class About extends Component {
  render() {
    return (
      <Layout>
        <Box border={{size: 'large'}} pad={{horizontal: 'xlarge', vertical: 'medium'}} animation="fade-in">About Spencer</Box>
      </Layout>
    );
  }
}

export default About;
