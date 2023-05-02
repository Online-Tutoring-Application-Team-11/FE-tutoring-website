import React from 'react';

const CardBullet = ({myCourse}: {myCourse: string}) => {

    return(
        <>
        <div className="course-bullet">{myCourse}</div>
        </>
    )
}

export default CardBullet;