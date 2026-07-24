import * as api from "./api.ts"

export function uploadJob(jobDesc: string, userId: string) {
    api.post(api.server("/jd"), 
        `{
        id: -1,
        user_id: ${userId},
        job_description: ${jobDesc},
        profile: null
        }`,
    )
}

export function getJobsForProfile(profile = null) {
    let userId = "0"
    return api.get(`${api.server("/jd")}?userid=${userId}`)
}

