const userReducer = (state={
                        user: {},
                        fetchingUserDetails: false
                    }, action) => {
    switch(action.type){
        case "GET_USER_DETAILS_START":{
            return {...state, fetchingUserDetails: true};
        }
        case "SET_USER_DETAILS":{
            return {...state, fetchingUserDetails: false, user: action.payload};
        }   
    }
}

export default userReducer;