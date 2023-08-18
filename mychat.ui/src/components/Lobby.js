import { Form , Button } from "react-bootstrap";
import React from 'react'


const Lobby = ({ joinRoom }) => {

    const[user,setUser]=React.useState();
    const[room,setRoom]=React.useState();

    return ( 

        <Form 
            className='lobby'
            onSubmit={e => {
                e.preventDefault();
                joinRoom(user,room);
            }}
        >
            <Form.Group>
                <Form.Control placeholder="name" onChange={e => setUser(e.target.value)}></Form.Control>
                <Form.Control placeholder="room" onChange={e => setRoom(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant='success' type ='submit' disabled={!user || !room}>Join</Button>
        </Form>

     );
}
 
export default Lobby;
