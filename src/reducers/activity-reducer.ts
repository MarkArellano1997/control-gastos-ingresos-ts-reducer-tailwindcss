import { Activity } from "../types"

export type ActivityActions = 
{type: 'add-activity', payload: {newActivity: Activity}} |
{type: 'set-activeId', payload: {id: Activity['id']}} |
{type: 'remove-activity', payload: {id: Activity['id']}} |
{type: 'restar-app'}

export type ActivityState = {
    activities: Activity[]
    activeId: Activity['id']
}

const initialActivities = ():Activity[]=>{
    const localStorageActivity = localStorage.getItem('activity')
    return localStorageActivity ? JSON.parse(localStorageActivity):[]
}

export const initialState:ActivityState ={
    activities: initialActivities(),
    activeId: ''
}

export const ActivityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
)=>{
    if (action.type === 'add-activity') {

        let updateActivities: Activity[] = []
        if (state.activeId) {
            updateActivities = state.activities.map(activity=>{
                if (activity.id ===state.activeId) {
                    return action.payload.newActivity
                }
                return activity
            })
        }else{
            updateActivities = [...state.activities, action.payload.newActivity]
        }

        return{
            ...state,
            activities: updateActivities,
            activeId: ''
        }
    }

    if (action.type === 'set-activeId') {
        return{
            ...state,
            activeId: action.payload.id
        }
    }

    if (action.type === 'remove-activity') {
        const activities = state.activities.filter(activity => activity.id!==action.payload.id)
        return{
            ...state,
            activities
        }
    }

    if (action.type === 'restar-app') {
        
        return{
            activities: [],
            activeId:''
        }
    }

    return state
}



