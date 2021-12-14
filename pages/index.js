import { Layout } from 'components';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
	return (
		<Layout>
			<Row className='d-flex justify-content-center align-items-center vh-75'>
				<Col xs={4} className='d-grid gap-1'>
					<Button variant='outline-dark' className='mx-2 btn-block'>
						GITHUB
					</Button>
				</Col>
				<Col xs={4} className='d-grid gap-1'>
					<Button variant='outline-dark' className='mx-2 btn-block'>
						LINKEDIN
					</Button>
				</Col>
			</Row>
		</Layout>
	);
}
