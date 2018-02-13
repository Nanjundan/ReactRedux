import React, {Component} from 'react';
import {connect} from 'react-redux';

import surveyActions from '../actions/surveyActions.jsx';

class Surveys extends Component {
  constructor(props) {
    super(props);
    this.getSurveys = this.getSurveys.bind(this);
    this.getSurveys();
  }

  getSurveys(){
        var comp = this;
        oCommon
            .makeServiceCall( 'https://maqpulseservice.azurewebsites.net/api/Survey'+'/GetSurveys', 'GET', function (data) {
                comp.props.dispatch(surveyActions.setSurvey(data));
                //comp.setState({surveys: data, showLoader: false});
            }, function (data) {
                //Error handler
                console.error(data);
            }, {
                //Request parameters
            });
  }


  render() {
     var completedSurveys = <div className="flexColumnWise summaryDiv">
                                <span className="numbers"> {this.props.surveys.filter((survey)=> {
                                   return survey.ResponseID != "";
                                }).length}
                                </span>
                                <span className="summaryDivText">
                                    Completed <br /> Surveys
                                </span>
                          </div>
     var pendingSurveys = <div className="flexColumnWise summaryDiv">
                                <span className="numbers"> {this.props.surveys.filter((survey)=> {
                                    return survey.ResponseID == "";
                                }).length}
                                </span>
                                <span className="summaryDivText">
                                    Incomplete <br /> Surveys
                                </span>
                          </div>
      var rewardPoints = <div className="flexColumnWise summaryDiv">
                                <span className="numbers"> {this.props.surveys.reduce((val1, val2) => {
                                            return val2.ResponseID != "" ? (val1 + val2.RewardPoints) : (val1 + 0);
                                    }, 0)}
                                </span>
                                <span className="summaryDivText">
                                    Reward Points Earned
                                </span>
                          </div>

    var summaryDiv = <div> 
                        {true ?
                            <div className="justifyCenter marginLeftRight15pt marginBottom10pt">
                                {completedSurveys}
                                {pendingSurveys}
                                {rewardPoints}
                            </div> 
                        : "" }
                        {true ?
                            <div> 
                                
                                <button className="closeButton"> CLOSE </button>
                                <div className="blueBackgroundSeparator">
                                </div>
                            </div>
                        : "" }
                     </div>
      var popularSurveySort = function(survey1, survey2){
            if(survey1.NumberOfSurveyCompletion > survey2.NumberOfSurveyCompletion ){
                return -1;
            }
            else if(survey1.NumberOfSurveyCompletion < survey2.NumberOfSurveyCompletion ){
                return 1;
            }
            else{
                return 0;
            }
      }
      var popularSurveys = <div className="marginAll15pt">
                            <div className="sideHeading"> Popular Surveys </div>
                              <div className="scrollView">
                                {
                                    this.props.surveys.length === 0 ? <div className="summaryDivText"> No surveys available </div> :
                                    this.props.surveys.slice().sort(popularSurveySort).map((value, key) => {
                                        return (
                                            <div key={key}>
                                            <div className={"flexColumnWise overviewTiles"}>
                                                <div className={value.ResponseID == "" ? "overviewTileHeading activeBorderLeft" : "overviewTileHeading completedBorderLeft"}>
                                                    <span className="marginLeft5pt"> {value.SurveyCategory} </span>
                                                </div>
                                                <span className="overviewTileName">
                                                    {value.SurveyName}
                                                </span>
                                                <div className="alignVerticalCenter">
                                                    <div className="marginTopLeft10pt alignVerticalCenter smallFont">
                                                        <img src="../images/People.png" />
                                                        <span className="marginLeft5pt"> {value.NumberOfSurveyCompletion} already filled </span>
                                                    </div>
                                                    <div className="marginLeft15pt marginTopLeft10pt alignVerticalCenter smallFont">
                                                        <img src="../images/Rewards.png" />
                                                        <span className="marginLeft5pt"> Earn {value.RewardPoints} points </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className={value.ResponseID == "" ? "detailsButton" : "frozenButton"} > {value.ResponseID == "" ? "TAKE SURVEY" : "COMPLETED"} </button>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
        var mostRecentSurveys = <div className="marginAll15pt">
                            <div className="sideHeading"> Most Recent Surveys </div>
                              <div className="scrollView">
                                {
                                    this.props.surveys.length === 0 ? <div className="summaryDivText"> No surveys available </div> :
                                    this.props.surveys.map((value, key) => {
                                        return (
                                            <div key={key}>
                                            <div className={"flexColumnWise overviewTiles"}>
                                                <div className={value.ResponseID == "" ? "overviewTileHeading activeBorderLeft" : "overviewTileHeading completedBorderLeft"}>
                                                    <span className="marginLeft5pt"> {value.SurveyCategory} </span>
                                                </div>
                                                <span className="overviewTileName">
                                                    {value.SurveyName}
                                                </span>
                                                <div className="alignVerticalCenter">
                                                    <div className="marginTopLeft10pt alignVerticalCenter smallFont">
                                                        <img src="../images/People.png" />
                                                        <span className="marginLeft5pt"> {value.NumberOfSurveyCompletion} already filled </span>
                                                    </div>
                                                    <div className="marginLeft15pt marginTopLeft10pt alignVerticalCenter smallFont">
                                                        <img src="../images/Rewards.png" />
                                                        <span className="marginLeft5pt"> Earn {value.RewardPoints} points </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className={value.ResponseID == "" ? "detailsButton" : "frozenButton"} > {value.ResponseID == "" ? "TAKE SURVEY" : "COMPLETED"} </button>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
    var screen = <div> 
                    {summaryDiv}
                    {mostRecentSurveys}
                    <div className="blueBackgroundSeparator">
                    </div>
                    {popularSurveys}
                    <div className="blueBackgroundSeparator">
                    </div>
                    <div className="marginTop25">
                    </div>
                </div>;
    return (
                screen 
            );
  }
}

// Map state to props
const mapStateToProps = ({state}) => {
    return {
        surveys: state.surveys,
        fetchingSurveys: state.fetchingSurveys
    }
}
export default connect(mapStateToProps)(Surveys);
