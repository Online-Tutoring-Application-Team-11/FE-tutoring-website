import React from 'react';
import CoursesCard from './CoursesCard';

const CoursesSection = () => {

    return(
        <>
        <div className="row" style={{marginTop:"25px"}}>
            <div className="text-center">
                <div className="the-tutors" style={{textAlign:"right"}}>COURSES </div>
                <div className="meet" style={{textAlign:"right"}}>WE SUPPORT </div>
            </div>
            {/* COL2  */}
            <div className="col-sm" style={{background:""}}>  
                <CoursesCard coursesSub={"SCIENCE"}/>
            </div>


            {/* COL1 */}
            <div className="col-sm" style={{background:""}}>
                <CoursesCard coursesSub={"ENGINEERING"}/>
            </div>

            {/* COL3 */}
            <div className="col-sm" style={{background:""}}>  
                <CoursesCard coursesSub={"MATHEMATICS"}/>
            </div>
        </div>
        </>
    )
}

export default CoursesSection;