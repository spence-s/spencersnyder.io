import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Particles from 'react-tsparticles';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { options } from '../config/particles';
import Header from './Header';

export const Layout = ({ children, title, description }) => (
	<>
		<Header title={title} description={description} />
		<Particles id='tsparticles' className='particle-bg' options={options} />
		<Navbar bg='dark' variant='dark' expand='lg'>
			<Container fluid>
				<Link passHref href='/'>
					<Navbar.Brand>SPENCER SNYDER</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
					<Nav>
						<Link passHref href='https://blog.spencersnyder.io'>
							<Nav.Link>BLOG</Nav.Link>
						</Link>
						<Link passHref href='/resume.pdf'>
							<Nav.Link>RESUME</Nav.Link>
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		<motion.main
			initial='hidden'
			animate='enter'
			exit='exit'
			transition={{ type: 'linear' }}
			variants={{
				hidden: { opacity: 0 },
				enter: { opacity: 1 },
				exit: { opacity: 0 }
			}}>
			<Container fluid>{children}</Container>
		</motion.main>
	</>
);
