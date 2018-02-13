const surveyActions = {
    fetchSurveyStart: () => ({
        type: "GET_SURVEYS_START"
    }),
    setSurvey: (surveys)=> ({
        type: "SET_SURVEYS",
        payload: surveys
    })
};

export default surveyActions;