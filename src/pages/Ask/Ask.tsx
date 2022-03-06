import { SyntheticEvent, useState, ChangeEvent } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Ask.css';
import style from './Ask.module.css';
import { FormControlProps } from 'react-bootstrap';

interface Post {
  title: string;
  body: string;
  tags: string[];
  bounty: number;
}

const Ask = () => {
  let formGroupClass = 'mb-3';
  let cardClass = 'mb-5';

  let [post, setPost] = useState<Post>({
    title: '',
    body: '',
    tags: [],
    bounty: 0,
  });

  let [balance, setBalance] = useState<number>(0);

  let handleChange = ({ currentTarget: input }: any) => {
    setPost({ ...post, [input.id]: input.value });
  };

  return (
    <Container className={style.pageContainer + ' w-75'}>
      <h1 className={style.pageTitle}>Ask a question</h1>
      <Card className={cardClass}>
        <Card.Body>
          <Form>
            <Form.Group className={formGroupClass} controlId="title">
              <Form.Label>
                <h4>Title</h4>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className={formGroupClass}>
              <Form.Label htmlFor="body">
                <h4>Body</h4>
              </Form.Label>
              <CKEditor
                editor={ClassicEditor}
                name="body"
                onChange={(event: SyntheticEvent, editor: any): void => {
                  setPost({ ...post, body: editor.getData() });
                }}
              ></CKEditor>
            </Form.Group>

            <Form.Group className={formGroupClass}>
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

      <Card className={cardClass}>
        <Card.Body>
          <Row>
            <Col sm={8}>
              <h4>Add a bounty</h4>
              <p className="text-muted">
                Bountied questions will appear highlighted and can attract more
                answers. You need credit to add bounty to a question
              </p>
            </Col>
            <Col
              md={4}
              className="d-flex flex-column align-items-end justify-content-evenly"
            >
              <h4 className="">Balance: ${balance}</h4>
              <Button variant="warning" className="mb-3">
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

      <Button variant="primary">Post Question</Button>
    </Container>
  );
};

export default Ask;
