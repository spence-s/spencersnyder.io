import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Title = ({ title }) => (
	<Row className='d-flex justify-content-center mt-5 mb-2'>
		<Col
			xl={8}
			lg={9}
			md={10}
			sm={11}
			xs={12}
			className='bg-white border rounded py-1 px-0 p-sm-1'>
			<h2 className='text-center'>{title}</h2>
		</Col>
	</Row>
);

export default Title;
