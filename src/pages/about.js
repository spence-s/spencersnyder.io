import React, { Component } from 'react';
import { Box } from 'grommet';

import Layout from '../components/layout';

class About extends Component {
  render() {
    return (
      <Layout>
        <Box
          style={{ maxWidth: '90%' }}
          border={{ size: 'large' }}
          pad={{ horizontal: 'xlarge', vertical: 'medium' }}
          animation="fade-in"
        >
          Hi! I'm Spencer. I am a guy who is totally passionate about JavaScript. I have been
          working with the web for a few years now. I have really found a love and talent (shameless
          plug) for building software. I am self-taught and currently working as a full stack
          developer. I work on cutting edge projects with tons of tough problems. I couldn't be
          happier. I started my career by building simple WordPress and Shopify sites for clients,
          which led me to learn all I could about web development. Once I started writing code, I
          completely fell in love with it. I'm most passionate about working with Node, React, React
          Native, Redux, SQL, and MongoDB.{' '}
        </Box>
      </Layout>
    );
  }
}

export default About;
