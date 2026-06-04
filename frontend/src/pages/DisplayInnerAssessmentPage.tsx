/**
 * Page for displaying the inner assessment / generated profile of the user, 
 * to let the user know what the system thinks of them, 
 * and possibly let the user make manual changes/suggestions 
 */

type InnerAssessment = {
    assessments: Array<AssessmentItem>
}

type AssessmentItem = BranchAssessmentItem | LeafAssessmentItem


// For cases where the model thinks a user should have more points than the sum of the leaves, a "general" leaf can be made.
type BranchAssessmentItem = {
    kind: "branch",
    name: string,
    nested: Array<AssessmentItem>
}

type LeafAssessmentItem = {
    kind: "leaf",
    name: string,
    points: number,
}

// A branch assessment's points can be determined by summing its nested assessments' points
function getPoints(a: AssessmentItem): number {
    if (a.kind == "branch") { // If the item is a branch, recurse
        let pointsSum = 0
        for (let inner of a.nested) {
            pointsSum += getPoints(inner)
        }
        return pointsSum
    } else {
        return a.points
    }
}