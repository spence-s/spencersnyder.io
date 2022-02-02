// client imports
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { BsChevronDoubleLeft } from 'react-icons/bs';
import { useRouter } from 'next/router';

const BlackBanner = () => {
	const router = useRouter();

	const handleBackClick = () => router.back();

	return (
		<>
			<Container fluid className='position-absolute h-25 rl-0'>
				<Row className='position-absolute top-0 h-100 rl-0 bg-dark z-100 g-0' />
			</Container>
			<Row className='position-fixed bottom-0 bg-white'>
				<Button
					variant='link'
					size='sm'
					className='text-dark bg-white rounded text-decoration-none'
					onClick={handleBackClick}>
					<BsChevronDoubleLeft />
				</Button>
			</Row>
		</>
	);
};

export default BlackBanner;
