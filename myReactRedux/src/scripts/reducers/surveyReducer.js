const surveyReducer = (state={
                        fetchingSurveys: false,
                        surveys: []
                    }, action) => {
    switch(action.type){
        case "GET_SURVEYS_START":{
                state = { ...state, fetchingUser: true};
                return state;
        }
        case "SET_SURVEYS":{
                state = { ...state, fetchingUser: false, surveys: action.payload};
                return state;
        }   
    }
}

export default surveyReducer;