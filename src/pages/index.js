import React from 'react';
import styled from 'styled-components';

import { Facebook, Linkedin, Instagram } from 'grommet-icons';

import Layout from '../components/layout';
import Button from '../components/button';

const PaddedDiv = styled.div`
  text-align: center;
  padding-bottom: 20rem;
`;

const IndexPage = () => (
  <Layout>
    <PaddedDiv>
      <h1>SPENCER SNYDER</h1>
      <div>
        <Button>
          <Facebook />
        </Button>
        <Button>
          <Linkedin />
        </Button>
        <Button>
          <Instagram />
        </Button>
      </div>
    </PaddedDiv>
  </Layout>
);

export default IndexPage;
