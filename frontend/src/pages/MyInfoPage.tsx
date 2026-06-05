import React from 'react';

class Details {

}
class SkillDetails {
    
}
class CertificationDetails {
    
}
class ExperienceDetails {
    organization: String = "";
    timeWorked: Number = 0;
    timeWorkedUnit: "months" | "years" = "years";
}
class ProjectDetails {
    timeWorked: Number = 0;
    timeWorkedUnit: "months" | "years" = "months";
}
class EducationDetails {
    institution: String = "";
    numYears: Number = 0;
}
class Qualification {
    id: Number | undefined;
    name: String = "";
    description: String = "";
    type: "skill" 
        | "experience" 
        | "education" 
        | "certification" 
        | "project"
        | undefined;
    details: Details | undefined;
}



class Education extends Qualification {
    institution: String = "";
}

class UserQualifications {
    constructor(qualifications: Array<Qualification>) {}
}

export default function MyInfoPage() {
    // Qualification array will be retrieved from server

    // IDEA: let users use LinkedIn AutoFill
    return (<>
        My Info
    </>)
}