import React from 'react';


type SkillDetails = {
    kind: "skill"

}

type CertificationDetails = {
    kind: "certification"
}

type ExperienceDetails = {
    kind: "experience",
    organization: string,
    timeWorked: number,
    timeWorkedUnit: "months" | "years",
}

type ProjectDetails = {
    kind: "project",
    timeWorked: number,
    timeWorkedUnit: "months" | "years",
}

type EducationDetails = {
    kind: "education"
    institution: string,
    numYears: number,
}

type Details 
    = ExperienceDetails 
    | ProjectDetails 
    | EducationDetails
    | SkillDetails
    | CertificationDetails

type Qualification = {
    id: number | undefined,
    name: string,
    description: string,
    type: "skill" 
        | "experience" 
        | "education" 
        | "certification" 
        | "project"
        | undefined,
    details: Details | undefined,
}

type UserQualifications = Array<Qualification>

function visualizeQualification(q: Qualification) {
    return (<>
        <div>
            <div>Type: {q.type}</div>
            <div>Name: {q.name}</div>
            <div>Description: {q.description}</div>
            {
            q.details?.kind == "experience" && <>
                <div>{q.details.organization}</div>
                <div>{q.details.timeWorked} {q.details.timeWorkedUnit}</div>
            </>
            || q.details?.kind == "education" && <>
                <div>{q.details.institution}</div>
                <div>{q.details.numYears}</div>
            </>
            || q.details?.kind == "project" && <>
                <div>{q.details.timeWorked} {q.details.timeWorkedUnit}</div>
            </>
            }
        </div>
    </>)
}

const testQual: Qualification = {
    id: undefined,
    type: "project",
    name: "Kronos Calendar",
    description: "An application that can turn any date from a supported calendar into the corresponding date from any other calendar.",
    details: {
        kind: "project",
        timeWorked: 2,
        timeWorkedUnit: "months"
    }
}

export default function MyInfoPage() {
    // Qualification array will be retrieved from server

    // IDEA: let users use LinkedIn AutoFill
    return (<>
        My Qualifications
        <div>Test qualification:</div>
        <div>
            {visualizeQualification(testQual)}
        </div>
    </>)
}