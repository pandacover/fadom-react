import '../css/Contact.css';
import { Form, Button } from 'react-bootstrap';

export const Contact = () => {
  return (
    <div className="contact-wrapper">
      <Form className="contact-form">
        <h1 className="contact-form-title">Contact Animu Team</h1><br /><br />
          <Form.Group controlId="formBasicText">
            <Form.Control className="contact-form-item" type="text" placeholder="&#xf007;&nbsp;&nbsp;Name" style={{fontFamily: "Open Sans, FontAwesome"}} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Control className="contact-form-item" type="email" placeholder="&#xf0e0;&nbsp;&nbsp;Email" style={{fontFamily: "Open Sans, FontAwesome"}} />
          </Form.Group>
          <Form.Group controlId="basicTextArea">
            <Form.Control className="contact-form-item contact-form-textarea" as="textarea" row={3} placeholder="Message" />
          </Form.Group>
          <Button className="contact-form-button">
            Send
          </Button>
      </Form>
    </div>
  )
}