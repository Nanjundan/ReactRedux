import {React, Component} from 'react';
import Surveys from './surveys';

class Home extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Surveys />
        );
    }
}

export default Home;