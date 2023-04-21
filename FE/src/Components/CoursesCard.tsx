import React from 'react';
import {Card, Button, Navbar, Container, Nav, ListGroup} from 'react-bootstrap'
import CardBullet from './CardBullet';
const CoursesCard = ({coursesSub}: {coursesSub: string}) => {

    let icon;
    if (coursesSub === "ENGINEERING") {
        icon = <div style={{fontSize: "100px", paddingTop: "10px"}}>&#x2699;</div>;
    } else if (coursesSub === "SCIENCE") {
        icon = <div style={{fontSize: "100px", paddingTop: "10px"}}>&#x1F52C;</div>;
    } else if (coursesSub === "MATHEMATICS") {
        icon = <div style={{fontSize: "100px", paddingTop: "10px"}}>&#x1f4d0;</div>;
    }

    let offered_c;
    if(coursesSub === "ENGINEERING") {
        offered_c = <Card.Body>
        <Card.Text style={{}}>
            <CardBullet myCourse={"Intro to Programming"}/>
        </Card.Text>

        <Card.Text style={{}}>
            <CardBullet myCourse={"Operating Systems"}/>
        </Card.Text>

        <Card.Text style={{}}>
            <CardBullet myCourse={"Computer Architecture"}/>
        </Card.Text>

        <Card.Text style={{}}>
            <CardBullet myCourse={"Database Systems"}/>
        </Card.Text>

        <Card.Text style={{}}>
            <CardBullet myCourse={"Automata Theory"}/>
        </Card.Text>
    </Card.Body>
    } else if (coursesSub === "SCIENCE") {
        offered_c = <Card.Body>
        <Card.Text style={{}}>
            <CardBullet myCourse={"General Chemistry"}/>
        </Card.Text>

        <Card.Text style={{}}>
            <CardBullet myCourse={"Mechanical Physics"}/>
        </Card.Text>

        <Card.Text style={{}}>
            <CardBullet myCourse={"Electromagnetic Physics"}/>
        </Card.Text>

        <Card.Text style={{}}>
            <CardBullet myCourse={"Organic Chemistry"}/>
        </Card.Text>
    </Card.Body>
    } else if (coursesSub === "MATHEMATICS") {
        offered_c = <Card.Body>
        <Card.Text style={{}}>
            <CardBullet myCourse={"Calculus I & II"}/>
        </Card.Text>

        <Card.Text style={{}}>
            <CardBullet myCourse={"Differential Equations"}/>
        </Card.Text>

        <Card.Text style={{}}>
            <CardBullet myCourse={"Multivariable Calculus"}/>
        </Card.Text>

        <Card.Text style={{}}>
            <CardBullet myCourse={"Discrete Math I & II"}/>
        </Card.Text>

        <Card.Text style={{}}>
            <CardBullet myCourse={"Linear Algebra"}/>
        </Card.Text>
    </Card.Body>
    }

    return(
        <>
        <Card className="card-course" style={{ width: 'auto', height: '100%', borderRadius:"10px" }}>
        <Card.Title className="text-center">
            
            {icon}
            {/* {coursesSub=="ENGINEERING"?<div style={{fontSize: "100px"}}>&#x2699;</div>:
            <div style={{fontSize: "100px"}}>&#x1F52C;</div>?<div style={{fontSize: "100px"}}>YO YO</div>} */}
            
            <div className="card-sub-title">{coursesSub}</div>
        </Card.Title>
    
        {offered_c}
    </Card>
        </>
    )
}

export default CoursesCard;