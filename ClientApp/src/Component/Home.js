import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import './HomePage.css';
import {Link} from "react-router-dom";


class HomePage extends React.Component {
    constructor()
    {
        super();
        this.state = {
            searchBar : '',
            loading : true,
            GetData : [],
            sortType : 'desc',
            styleType : 'grid',
            currentPage : '1',
            PostPerPage: '10',
            linkstatus : 'all',
        }

        this.handleSort = this.handleSort.bind(this);
        this.handleStyle = this.handleStyle.bind(this);
        this.HandleLike = this.HandleLike.bind(this);
        
    }

    componentDidMount() {
        this.GetRequest();
      }

      searchText = e => {
        this.setState({ searchBar: e.target.value });
      };  

    async HandleLike(data) {

        var software;

        for (var i = 0; i < this.state.GetData.length; i++) {
            if (this.state.GetData[i].id === data) {
                this.state.GetData[i].likes += 1;
                software = this.state.GetData[i];
                break;
            }
        }


        let response = await fetch("api/like", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(software)
        });

        if (response.status < 300 && response.status >= 200) {
            window.location.reload();

        }

        
    }

    Changequick(e) {
        this.setState({
            linkstatus: e.target.name
        })
    }

      handleSort(sortType){
        this.setState({sortType});
      }

      handleStyle(styleType)
      {
        this.setState({styleType});
      }

      Paginating(number)
      {
        this.setState({currentPage: number});
      }


    renderDatasetsTable(Dataset) {
        return (
            <div className="SearchBack">
                <div className={this.state.styleType === 'grid' ? "DataBox" : "DataBoxList" } key={Dataset.id}>
                  {/* {software_Name} */}
                  <div className={this.state.styleType === 'grid' ? "DataTitle" : "DataTitleList" }> {Dataset.software_Name}</div>
                  {/* {software_Version} */}
                  <div className={this.state.styleType === 'grid' ? "DataVersion" : "DataVersion" }>ver: {Dataset.software_Version}</div>
                    {/* {website_Link} */}
                    <div className={this.state.styleType === 'grid' ? "DataWeb" : "DataWebList"}>{Dataset.website_Link === "" ? "" : <strong>Website :</strong>}  {Dataset.website_Link}</div>
                  {/* {nsD_Response_Time} */}
                  <div className={this.state.styleType === 'grid' ? "DataWeb" : "DataWebList"} ><strong>Date Modified </strong> : {Dataset.employee_Request_Time}</div>

                    <div className={this.state.styleType === 'grid' ? "DataWeb" : "DataWebList"} style={{ color: "red" }}>{Dataset.level_Status}</div>
                    <p className="likes">{Dataset.likes}</p>
                    <a href={Dataset.nsD_Response_Link}>
                        <button className="ui fluid button" style={{ backgroundColor: "#212121", display: "inline", color: "white", width: "85%" }} >Get Download link</button>
                    </a>
                    <button className="ui icon button" style={{ display: "inline", width: "10%", height: "35px" }} onClick={() => { this.HandleLike(Dataset.id) }} > <i className=" red heart icon" ></i></button>
                    
                </div>
            </div>
        );
      }


    render()
    {

      // Adding Custom styles to the Home Page Element
      const ui_input_div = {marginLeft : "15%" , marginRight : "15%", width  : "70%" , height : "100px", padding : "30px" };
      const ui_searchbar = { width : "90%" , borderRadius : "15px 0px 0px 15px"};
      const ui_searchbutton = { borderRadius : "0px 15px 15px 0px" ,  backgroundColor : "white" , border : "1px solid rgba(34,36,38,.15)"};
      const ui_mkrequest_button = { marginLeft : "35%" , marginRight : "35%", marginTop : "30px", height : "40px",  marginBottom:"20px", width  : "30%" , padding : "10px", backgroundColor: "#fe346e", Color: "#d2fafb"};
      const ui_search_title = { display: "inline", marginRight: "50%"};
      const ui_icon = {marginLeft : "10px", float: "right", marginRight: "10px" };
        const ui_icon_sel = { marginLeft: "10px", float: "right", marginRight: "10px", color: "#5DADEC" };
        const quick_link1 = { marginLeft: "7%", width: "18%", marginRight : "0px"};
        const quick_link2 = { marginLeft: "5%", marginRight: "4%", width: "15%" };
        const quick_link3 = { marginLeft: "5%", marginRight: "4%", width: "15%" };
        const quick_link4 = { marginLeft: "0px", marginRight: "7%", width: "18%" };



        const ui_icon1 = {width : "8%"};



      // Add variable title to the Software Data Header

      const Search_title = (this.state.searchBar.length === 0)? <h2 style={ui_search_title}> Recent Software</h2>: 
                                                                 <h2 style={ui_search_title}>Result for : {this.state.searchBar}</h2>;

    

    
    
    
    const { searchBar, sortType } = this.state;
    const filteredSoftware = this.state.GetData.filter(Software => {
      return Software.software_Name.toLowerCase().indexOf(searchBar.toLowerCase()) !== -1;
    });


        const nsdonly = this.state.linkstatus === "nsd" ? 
            filteredSoftware.filter(software => {
                return software.level_Status === "Request is pending from NSD";
            }) : filteredSoftware;

        const complete = this.state.linkstatus === "complete" ?
            filteredSoftware.filter(software => {
                return software.level_Status === "Request is complete";
            }) : nsdonly;

        

    const sorted = complete.sort((a, b) => {
    
        const isReversed = (sortType === 'asc') ? 1 : -1;
        return isReversed * a.software_Name.localeCompare(b.software_Name)
    }
        )

        const liking = (this.state.linkstatus === "like") ?
            sorted.sort((a, b) => {
                return b.likes - a.likes
            })
            : sorted;

// Pagination
      const IndexofLastPost = (this.state.currentPage)*(this.state.PostPerPage);
        const IndexofFirstPost = IndexofLastPost - (this.state.PostPerPage)
        const currentPost = liking.slice(IndexofFirstPost, IndexofLastPost);

      const Pages= [];

      for(let i = 1 ; i <= Math.ceil(liking.length/(this.state.PostPerPage)); i++)
      {
        Pages.push(i);
      }

      let Pagination = Pages.map( number => (
        <div className="Page-box" key={number}>
          <div className={this.state.currentPage === number ? "Page-Block-sel" : "Page-Block" } onClick={() => this.Paginating(number)}>{number}</div>
        </div>
    ))
     

       

      // Render Get Request
        let GetResponse = this.state.loading 
        ? <div className="Loader"><i aria-hidden="true" className=" big spinner loading icon"></i></div>
        : currentPost.map(Dataset => {
            return (
                <div key={Dataset.id} className="SearchBack">
                    {this.renderDatasetsTable(Dataset)}
                    </div>
            );
              })
  
  
  
  
  return (
<div>
 <div className="Cover">
   <div className="Nav">
                  <Link to="/">
                      <img src="https://github.com/THELAZYKING/SoftwareDownloadSystem/blob/master/NAV.png?raw=true" alt="logo" className="main-logo"></img>
     </Link>
   </div>
   <h3 className="banner-title" >Search for the Software you need to install </h3>
   <div className="ui icon input" style={ui_input_div}>
   <input type="text" placeholder="Search Here For Software "  style={ui_searchbar} onChange={this.searchText}/>
   <button className="ui icon button" style={ui_searchbutton}><i aria-hidden="true" className="search icon" style={{ color : "grey"}}></i></button>
 </div>
<Link to='/MakeRequest'>
<button className="ui button" style={ui_mkrequest_button}>Make a New Request</button>
              </Link>
              <div className="link-container">
                  <button className={this.state.linkstatus !== "nsd" ? "ui blue button" : "ui basic blue button"} style={quick_link1} name="nsd" onClick={(e) => this.Changequick(e)}><span className="hash">#</span> NSD Pending Requests</button>
                  <button className={this.state.linkstatus !== "like" ? "ui teal button" : "ui basic teal button"} style={quick_link2} name="like" onClick={(e) => this.Changequick(e)}><span className="hash">#</span> Most Liked</button>
                  <button className={this.state.linkstatus !== "all" ? "ui brown button" : "ui basic brown button"} style={quick_link3} name="all" onClick={(e) => this.Changequick(e)}><span className="hash">#</span> All Request</button>
                  <button className={this.state.linkstatus !== "complete" ? "ui purple button" : "ui basic purple button"} style={quick_link4} name="complete" onClick={(e) => this.Changequick(e)}><span className="hash">#</span>  Completed Requests</button>
              </div>

          </div>

<div className="Response">
<div className="Filter">
    {Search_title}
  <Link to="/MakeRequest">
  <i className="black large edit icon" style={ui_icon}></i>
                  </Link>

<i className="large sort alphabet down icon" style={this.state.sortType === 'asc'? ui_icon_sel : ui_icon} onClick={() => this.handleSort('asc')}></i>
<i className="large sort alphabet up icon" style={this.state.sortType === 'desc'? ui_icon_sel : ui_icon} onClick={() => this.handleSort('desc')}></i>
  <i className="large th list icon" style={this.state.styleType === 'list'? ui_icon_sel : ui_icon} onClick={() => this.handleStyle('list')}></i>
  <i className="th large icon" style={this.state.styleType === 'grid'? ui_icon_sel : ui_icon} onClick={() => this.handleStyle('grid')}></i></div>

  {GetResponse}

<div className="Pagination-block">
  {Pagination}
  </div>

</div>
            </div>
        );
    }

    
async GetRequest(){
  
    const response = await fetch('api');
    const data = await response.json();


   // change to data.data => data 
    this.setState({ GetData : data, loading : false});
}
    

}

export default HomePage;