import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';


class App extends Component{
    render(){
        return ( 
            <div className="main-container">
                <div className="left-pane">
                    <LeftPanel />
                </div>
                <div className="right-pane">
                    <RightPanel />
                </div>

             </div>
        );

        
    }
}


ReactDOM.render(<App />, document.getElementById('app'));