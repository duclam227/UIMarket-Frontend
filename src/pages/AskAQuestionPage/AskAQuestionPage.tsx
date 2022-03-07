import { SyntheticEvent, useState } from 'react';
import classNames from 'classnames';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { question } from '../../app/util/interfaces';

import { PageWithNavbar } from '../../components';

import './AskAQuestionPage.css';
import style from './AskAQuestionPage.module.css';

const Ask = () => {
  const formGroupClassName = 'mb-3';
  const cardClassName = 'mb-4';
  const containerClassName = classNames(style.pageContainer, 'w-75');
  const postQuestionButtonClassName = 'mb-3';
  const topUpButtonClassName = 'mb-3';
  const topUpGroupClassName =
    'd-flex flex-column align-items-end justify-content-evenly';

  const [question, setQuestion] = useState<question>({
    title: '',
    body: '',
    tags: [],
    bounty: 0,
    question: '',
  });

  const [balance, setBalance] = useState<number>(0);

  const handleChange = ({ currentTarget: input }: any) => {
    setQuestion({ ...question, [input.id]: input.value });
  };

  return (
    <PageWithNavbar>
      <Container className={containerClassName}>
        <h1 className={style.pageTitle}>Ask a question</h1>

        <Card className={cardClassName}>
          <Card.Body>
            <Form>
              <Form.Group className={formGroupClassName} controlId="title">
                <Form.Label>
                  <h4>Title</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>

              <Form.Group className={formGroupClassName}>
                <Form.Label htmlFor="body">
                  <h4>Body</h4>
                </Form.Label>
                <CKEditor
                  editor={ClassicEditor}
                  name="body"
                  onChange={(event: SyntheticEvent, editor: any): void => {
                    setQuestion({ ...question, body: editor.getData() });
                  }}
                ></CKEditor>
              </Form.Group>

              <Form.Group className={formGroupClassName}>
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

        <Card className={cardClassName}>
          <Card.Body>
            <Row>
              <Col md={8}>
                <h4>Add a bounty</h4>
                <p className="text-muted">
                  Bountied questions will appear highlighted and can attract
                  more answers. You need credit to add bounty to a question
                </p>
              </Col>
              <Col md={4} className={topUpGroupClassName}>
                <h4>Balance: ${balance}</h4>
                <Button variant="warning" className={topUpButtonClassName}>
                  Top up
                </Button>
              </Col>
            </Row>

            <Row>
              <Form.Group controlId="bounty">
                <Form.Control
                  type="number"
                  placeholder="$10"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
            </Row>
          </Card.Body>
        </Card>

        <Button variant="primary" className={postQuestionButtonClassName}>
          Post Question
        </Button>
      </Container>
    </PageWithNavbar>
  );
};

export default Ask;
