import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap'
import { getAllTutorsNoAuth } from '../API/Endpoints/appointEndpoint';
import { UserGet } from '../API/DTOs/userTypes'
import { Carousel } from 'react-bootstrap';
import TutorHomepageCard from './TutorHomepageCard';

const TutorsSection = () => {

    const [highlightTutor, setHighlightTutor] = React.useState(0);
    const [totalList, setTotalList] = React.useState<Array<UserGet>>([]);
    const getList = () => {
        getAllTutorsNoAuth().then((data: Array<UserGet>) => {
            setTotalList(data);
        })
    }

    useEffect(() => {
        getList();
      }, []);

    const showCard = (id_: number) => {
        let ac_index: number;
        let ac_user: UserGet;
        for(let i=0; i<totalList.length; i++){
            ac_user = totalList[i];
            if(ac_user.id == id_){
                ac_index = i;
                setHighlightTutor(ac_index);
                break;
            }
        }
    }

    return(
        <>
        <div className="row" style={{marginTop:"25px"}}>
            
            {/* TUTOR CARD PANEL  */}
            <div className="col-5" style={{background:"white", position:"relative"}}>
                <Carousel className="TutorCarousel" activeIndex={highlightTutor} fade={true} controls={false} indicators={false} >
                        {
                            totalList.map((tutor_) => 
                            <Carousel.Item>
                                <TutorHomepageCard tutor={tutor_}/>
                            </Carousel.Item>
                            )
                        }
                </Carousel>
            </div>

            {/* TUTOR FACE PANEL  */}
            <div className="col-7" style={{background:"white"}}> 

                <div className="text-center">
                    <div className="meet" style={{textAlign:"right"}}>MEET THE </div>
                    <div className="the-tutors" style={{textAlign:"right"}}>TUTORS</div>
                    <div className="body-text text-center" style={{textAlign:"right", marginTop:"-10px", fontSize:"18px"}}>
                        Tutors are selected from top universities like Harvard, MIT, and UC Berkley. 
                    </div>
                </div>

                <div className="text-center" style={{paddingTop:"26px"}}>
                {totalList.map((tutors) => 
                tutors.profilePic &&
                    // <div className="hp-tutor-whole" style={{display:"inline"}}>
                        <Button className="hp-tutor-pic-button" style={{}} onClick={() => showCard(tutors.id)}>
                            <img style={{}} className="hp-tutor-pic" src={tutors.profilePic} alt="Tutor profile pic"/>
                        </Button>
                    // </div>
                )}
                </div>
            </div>
        </div>
        </>
    )
}

export default TutorsSection;