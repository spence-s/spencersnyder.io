import { useRef } from 'react';
import { Layout } from 'components';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import { BsChevronDoubleDown } from 'react-icons/bs';

export default function Home() {
	const page2 = useRef(null);
	const page3 = useRef(null);

	const handleScrollClick = (ref) => () => {
		ref.current.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<Layout>
			<Row className='d-flex justify-content-center align-items-center vh-75'>
				<Col xs={4} className='d-grid gap-1'>
					<Link passHref href='https://www.github.com/spence-s'>
						<Button variant='outline-dark' className='mx-2 btn-block'>
							GITHUB
						</Button>
					</Link>
				</Col>
				<Col xs={4} className='d-grid gap-1'>
					<Link passHref href='https://www.linkedin.com/in/spencer-s-0a023538/'>
						<Button variant='outline-dark' className='mx-2 btn-block'>
							LINKEDIN
						</Button>
					</Link>
				</Col>
			</Row>
			<Row className='d-flex justify-content-center align-items-center vh-25'>
				<Col xs={2} className='d-flex justify-content-center'>
					<Button
						variant='light'
						size='large'
						onClick={handleScrollClick(page2)}>
						<BsChevronDoubleDown />
					</Button>
				</Col>
			</Row>
			<Row ref={page2} className='d-flex vh-100 justify-content-center'>
				<Col xs={12} className='d-flex justify-content-center'>
					<h1>Projects</h1>
				</Col>
				<Col xs={2} className='d-flex justify-content-center align-self-end'>
					<Button
						variant='light'
						size='large'
						onClick={handleScrollClick(page3)}>
						<BsChevronDoubleDown />
					</Button>
				</Col>
			</Row>
			<Row
				ref={page3}
				className='d-flex justify-content-center align-items-center vh-100'>
				<Col xs={2} className='d-flex justify-content-center'>
					Page 3
				</Col>
			</Row>
		</Layout>
	);
}
