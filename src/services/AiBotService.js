import ApiService from './ApiService'

export async function apiAskUniverse (data) {
    return ApiService.fetchData({
        url: '/send_to_websocket_context',
        method: 'post',
        data
    })
}

export async function apiDetailUserStoryFromSocket (data) {
    return ApiService.fetchData({
        url: '/send_to_websocket_context',
        method: 'post',
        data
    })
}

export async function apiGetUserStoryCodeFromSocket (data) {
    return ApiService.fetchData({
        url: '/send_to_websocket_context',
        method: 'post',
        data
    })
}

export async function apiAskCourseTopics (course_name) {
    return ApiService.fetchData({
        url: '/ask-course-headers/'+course_name,
        method: 'get',
        
    })
}

export async function apiAskCourseDetails (data) {
    return ApiService.fetchData({
        url: '/gaze_tutor/ask-universe-context',
        method: 'post',
        data
        
    })
}

export async function apiGetUserStories (data) {
    return ApiService.fetchData({
        url: '/gaze_tutor/ask-universe-context',
        method: 'post',
        data
        
    })
}

