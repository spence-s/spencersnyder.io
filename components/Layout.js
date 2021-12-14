import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Particles from 'react-tsparticles';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { options } from '../config/particles';

export const Layout = ({ children }) => (
	<>
		<Particles id='tsparticles' className='particle-bg' options={options} />
		<Navbar bg='dark' variant='dark' expand='lg'>
			<Container fluid>
				<Link passHref href='/'>
					<Navbar.Brand>SPENCER SNYDER</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
					<Nav>
						<Link passHref href='/blog'>
							<Nav.Link>BLOG</Nav.Link>
						</Link>
						<Link passHref href='/resume.pdf'>
							<Nav.Link>RESUME</Nav.Link>
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		<motion.div
			initial='pageInitial'
			animate='pageAnimate'
			variants={{
				pageInitial: {
					opacity: 0
				},
				pageAnimate: {
					opacity: 1
				}
			}}>
			<Container fluid>{children}</Container>
		</motion.div>
	</>
);
