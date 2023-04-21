import React from 'react';
import {Card, Button, Navbar, Container, Nav, ListGroup} from 'react-bootstrap'
const CardBullet = ({myCourse}: {myCourse: string}) => {

    return(
        <>
        <div className="course-bullet">{myCourse}</div>
        </>
    )
}

export default CardBullet;