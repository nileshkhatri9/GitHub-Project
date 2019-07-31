import React,{ Component }  from 'react';
import Moment from 'react-moment';

export default class RightPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items : [],
      isLoaded : false,
      repo: undefined,
      search: '',
      type : [],
      language: [],
      langFilter: '',
      typeFilterValue: '',
      filteredList: [],
    }
  }
  componentDidMount(){
    fetch('https://api.github.com/users/supreetsingh247/repos')
    .then(res => res.json()).then(json => {
      this.setState({
        isLoaded: true,
        items: json,
        filteredList: json,
      })
    })
  }
  onNamechange = e =>{
    this.setState({ 
      search: e.target.value
    }, () =>{
      this.getFilteredItems(this.state.search, 'name');
    });
  }
  languageFilter = e => {
    this.setState({
      langFilter: e.target.value
    },()=> {
      this.state.langFilter !=='All' ? 
      this.getFilteredItems(this.state.langFilter , 'Language'):
      this.handleClearFilters();
    });  
  }
  typeFilter =  e => {
    this.setState({
      typeFilterValue: e.target.value
    },() => {this.getFilteredItems(this.state.typeFilterValue , 'Type');
    });
  }
  handleClearFilters = () => {
    this.setState({ 
      search : '',
      langFilter: '',
      typeFilterValue: '',
      filteredList: this.state.items
    });
  }
  getFilteredItems = (search, filterOn) => {
    const { items } = this.state;
    let filteredList = [];
    if(filterOn === 'name'){
      filteredList =  items.filter(item => {
        return (item.name && item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
        (item.description && item.description.toLowerCase().indexOf(search.toLowerCase()) !== -1); 
      });
    } else if( filterOn === 'Language'){
      filteredList =  items.filter(item => {
        return (item.language && item.language.toLowerCase().indexOf(search.toLowerCase()) !== -1);
      });
    }else if( filterOn === 'Type'){
      filteredList =  items.filter(item => {
        return (item.fork === false && search === 'Sources') || (item.fork === true && search ==='Forks') ||
        (item.archived !== false && search === 'Archived') || (item.mirror_url !== null && search === 'Mirrors') 
        || (search == 'All' && this.handleClearFilters );
      });
       
    }
    else {
      console.log('Filter is failed ');
      
      filteredList = () => {
        return (
          <div>
            {item.login} doesn’t have any repositories that match. 
          </div>
        );
      }
    }

    this.setState({ filteredList });
  };

 

  // onFormSubmit = (e) => {
  //     var localRepo = this.state.repo;
  //     var { isLoaded, items } = this.state;
  //     const option = e.target.elements.option.value;

  //     e.preventDefault();
  
  //     if(option){
  //         localRepo = option;
  //         e.target.elements.option.value='';
  //         this.setState({repo: localRepo});

  //         items.map((item) => {
  //             if(( item.name.toLowerCase().includes(localRepo.toLowerCase())) || (item.description && (item.description.toLowerCase().includes(localRepo.toLowerCase()) ))){
  //                 // console.log(items[item.id]);
  //                 console.log(item.name,' | ',item.description);
  //                 // <div>
  //                 //     {item.description} | {item.name}
  //                 // </div>
          
          
  //             }
  //             else {
  //                 // console.log('Not Found');
  //             }
       
  //         }
  //         );
  //         // console.log('repo', localRepo);
  //     }

  //     // console.log('Success');
  // };

 render = () => {  
  var { isLoaded, items, repo, search,type, language, langFilter, typeFilterValue } = this.state;
  
  function filterdropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onClick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  // console.log(langFilter);
  if(!isLoaded){
    return <div> Still Loading</div>
  }
  else {
    const language = [];
    // console.log('items: ', items);
    const { filteredList } = this.state;

    return(
      <div className="panelRight">
        
        {/* <p>This is from Right Panel</p> */}
        <div className="ul-class">
        <ul>
              <a href="#"><li className="nav-bar"><span className="nav">Overview</span></li></a>
              <a href="#"><li className="nav-bar"><span className="nav-repo">Repositories<span className="number">  {filteredList.length}</span></span></li></a>
              <a href="#"><li className="nav-bar"><span className="nav">Stars<span className="number">7</span></span></li></a>
              <a href="#"><li className="nav-bar"><span className ="nav">Followers<span className="number"> 4</span></span></li></a>
              <a href="#"><li className="nav-bar"><span className="nav">Following<span className="number"> 2</span></span></li></a>
        </ul>
          <br></br><br></br>

        </div>
        <form className="filters-panel">
          {/* <input type="text" name="option" /> */}
          <input className="search-tab" label="Find a Repository..." value = {this.state.search} onChange={this.onNamechange} />
          
          {/* <div className="filter-btn-tab"> */}
          <select className="filter-btn" value={this.state.typeFilterValue} onChange={this.typeFilter}  >
          {/* <details> Typre */}
            {/* <summary> Type:</summary> */}

            <option className="drop-down" all="all"> All</option>
            <option className="drop-down" sources="sources">Sources</option>
            <option className="drop-down" forks="forks">Forks</option>
            <option className="drop-down" archived="archived">Archived</option>
            <option className="drop-down" mirrors="mirrors">Mirrors</option>

          {/* </details> */}
          </select>

          {/* <div className="dropdown">
            <button className="dropbtn">Right</button>
            <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>           */}
        
          {/* <button className="filter-btn" >language</button> */}
          <select className="filter-btn" value={this.state.langFilter} onChange={this.languageFilter}> 
            <option all="all">All</option>
            {/* <option html="html">HTML</option> */}
            {/* {console.log(items.language) } */}
            { 
              items.map( (item) => {
                if(item.language && language.indexOf(item.language) === -1){
                  language.push(item.language);
                }                                
              }                            
              // <option>{language && language }</option>
              )
            }
            {
              language && language.map((lang) => 
                <option key={lang} value={this.state.lang}> {lang} </option>
              )
            }
            
          </select>
          {/* {console.log(language)} */}
          {/* </div> */}

        </form>
        <div className="clear-filter">
          {
            (search || langFilter || typeFilterValue) &&  <a href="#" className="clear-filter" onClick={this.handleClearFilters}> <img className="leftPane-svg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTER71PJ-9K97tfS4E7ToVrXOQ-U_0dd580JBMdf62bv7kjJHDq" />  Clear Filter 
            </a>
          }
        </div>
        <p> {repo} </p>    
        <div>
          {(search || langFilter || typeFilterValue) &&     <div className="result-found">    <b>{filteredList.length}</b>  results found.</div>
              
          }
        </div>

        <ul className="ul-class">
        {
          filteredList && filteredList.map( (item) =>                 
          <ol key={item.id}>
            {   <h3> <a href={item.html_url}> { item.name }  </a> </h3>    }
            <div className="repo-fork">
              {  
               item.homepage && <p>forked from {item.homepage} - <a href={item.homepage}> {item.name}/{item.name} </a>   </p>  
              }
            </div>
          
          <p className="repo-desc">{item.description && item.description}</p>
          {/* <p>  */}
            <div className="repo-footer">
              <div className="">
                {item.language && 
                  <div>  
                    {/* <div className="repo-language-color">  </div> */}
                    {
                      item.language === "HTML" && <svg width="22" height="22">  <circle cx="6" cy="6" r="6"  fill="#e34c26" /></svg>
                    }
                    {
                      item.language === "JavaScript" && <svg width="22" height="22">  <circle cx="6" cy="6" r="6"  fill="#f1e05a" /></svg>
                    }
                    {
                      item.language === "CSS" && <svg width="22" height="22">  <circle cx="6" cy="6" r="6"  fill="#563d7c" /></svg>
                    }
                    

                    {/* <svg width="22" height="22">  <circle cx="6" cy="6" r="6"  fill="yellow" /></svg> */}
                    <div className="repo-language"> {item.language} </div>
                    
                  </div>  
                } 
              </div>
                 
                {
                  item.license &&  <div className="repo-data"> <img className="repo-license-icon" 
                  src="https://spng.pngfly.com/20180710/vhk/kisspng-computer-icons-repository-fork-git-clip-art-git-icons-5b45320ccd2918.0241078015312614528404.jpg"/>  {item.license["name"]} </div>
                } 
                <div className="updated-repo-data">
                Updated On <Moment date={item.pushed_at} format="DD MMM YYYY" />  
                </div>
                
          
            </div>
             {/* </p> */}

          </ol>
          )
        }
        </ul>
        {/* <LeftPanel /> */}
      </div>
    );
  }
} 
}







// Sources :     "fork": false, 
// Forks :    "fork": true,
// Archived :     "archived": false,
// Mirrors :     "mirror_url": null,


