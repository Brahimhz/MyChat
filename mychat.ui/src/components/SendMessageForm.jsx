import { useState } from "react";
import { Form,Button  } from "react-bootstrap";

const SendMessageForm = ( {sendMessage} ) => {

    const [message,setMessage] = useState('');

    return ( 
        <Form 
        onSubmit={e => {
            e.preventDefault();
                sendMessage(message);
                setMessage('');
        }}
        >
            <Form.Group>
                <Form.Control placeholder="message...." onChange={e => setMessage(e.target.value)} value={message}></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!message}>Send</Button>
        </Form>
     );
}
 
export default SendMessageForm;