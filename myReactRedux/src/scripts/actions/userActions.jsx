const userActions = {
    fetchUserStart: () => ({
        type: "GET_USER_DETAILS_START"
    }),
    setUser: (user)=> ({
        type: "SET_USER_DETAILS",
        payload: user
    })
};