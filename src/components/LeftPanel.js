import React,{ Component }  from 'react';
import RightPanel from './RightPanel';
// import email from './home/vedantu/Desktop/Desktop/react/boilerplate-v2/src/components/email.svg';

export default class LeftPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items : [],
      isLoaded : false
    }
    }
  componentDidMount(){
    fetch('https://api.github.com/users/supreetsingh247')
    .then(res => res.json()).then(json => {
      this.setState({
        isLoaded: true,
        items: json,
      })
    })
  }

  render(){
    var { isLoaded, items } = this.state;

    if(!isLoaded){
      return <div> Still Loading</div>
    }
    else {
      return(
        <div className="panelLeft">
          {/* <p>This is from Left Panel</p> */}
          <img className="avatar" src={items.avatar_url} />
          <ul className="leftPane-ul">
            {
                 <ul key={items.id} className="leftPane-ul"> {<div className="leftPane-name"> {items.name} </div> } 
                  {<div className="leftPane-login"> {items.login}</div>}
                  {<button className="leftPane-follow"> Follow </button>}
                  {<div className="leftPane-desc"> {items.bio} </div>}  
                  {items.company && <div className="leftPane-desc"> <img className="leftPane-svg" src="https://www.brandeps.com/icon-download/O/Organization-01.svg" />   {items.company}  </div> }  
                  {items.location && <div className="leftPane-desc"> <img className="leftPane-svg" src="https://image.flaticon.com/icons/svg/67/67347.svg" />   {items.location}  </div> }  
                  {<div className="leftPane-desc"> <img className="leftPane-svg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Aiga_mail.svg/1024px-Aiga_mail.svg.png" /> <a href="mailto:supreetsingh.247@gmail.com">supreetsingh247@gmail.com </a>  </div> }
                  
                </ul>

            }
          </ul>
          {/* <RightPanel /> */}
        </div>
      );
    }
  }
};

