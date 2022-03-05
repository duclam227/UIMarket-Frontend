import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Ask.css';

const Ask = () => {
	let formGroupMargin = 'mb-3';
	let cardMargin = 'mb-5';
	let balance = 100;
	return (
		<Container className="page-container">
			<h1 className="page-title">Ask a question</h1>
			<Card className={cardMargin}>
				<Card.Body>
					<Form>
						<Form.Group className={formGroupMargin}>
							<Form.Label>
								<h4>Title</h4>
							</Form.Label>
							<Form.Control type="text" placeholder="Title" />
						</Form.Group>

						<Form.Group className={formGroupMargin}>
							<Form.Label>
								<h4>Body</h4>
							</Form.Label>
							<CKEditor editor={ClassicEditor}></CKEditor>
						</Form.Group>

						<Form.Group className={formGroupMargin}>
							<Form.Label>
								<h4>Tags</h4>
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="e.g UI, color, alignment, ..."
							/>
						</Form.Group>
					</Form>
				</Card.Body>
			</Card>

			<Card className={cardMargin}>
				<Card.Body>
					<Row>
						<Col md={10}>
							<Row>
								<h4>Add a bounty</h4>
							</Row>
							<Row>
								<p className="text-muted">
									Bountied questions will appear highlighted and can attract
									more answers. You need credit to add bounty to a question
								</p>
							</Row>
						</Col>
						<Col md={2}>
							<Row>Balance: ${balance}</Row>
							<Row>
								<Button variant="warning">Top up</Button>
							</Row>
						</Col>
					</Row>
					<Row>
						<Form.Group>
							<Form.Control type="text" placeholder="$10" />
						</Form.Group>
					</Row>
				</Card.Body>
			</Card>

			<Button variant="primary">Post Question</Button>
		</Container>
	);
};

export default Ask;
