import { Layout } from 'components';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';

export default function Home() {
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
		</Layout>
	);
}
