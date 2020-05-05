import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import "./Form.css";
import { Link } from "react-router-dom";


class MyForm extends React.Component {
    constructor()
    {
        super();

        this.state = {
            EmpNumber: '',
            SoftName: '',
            Version: '',
            Email: '',
            SoftTags: '',
            SoftTagList: [],
            SoftTagPost: '',
            WebLink: '',
            TLName: 'Anil Kumar Modest',
            License: '',
            loading: false
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTL = this.handleTL.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }


    /*Validate = (data) =>{

      *//* if (!(/^\d + $ /.test(data.employee_Code)) || data.employee_Code.length < 3) {
            this.setState({
                Error: "There is an Error : Please Check Employee Code"
            });

            return false;
        }*//*

         if (!(/^[a-zA-Z]+$/.test(data.software_Name)) || data.employee_Code.length < 3) {
            this.setState({
                Error: "There is an Error : Please Check Software Name"
            });

            return false;
        }

        else if (data.software_License === '') {
            this.setState({
                Error: "There is an Error : License of the software must be selected"
            });

            return false;
        }

        else if (!(/@navbackoffice.com\s*$/.test(data.employee_EmailID))) {
            this.setState({
                Error: "There is an Error : Email must be @navbackoffice.com"
            });

            return false;
        }

        this.setState({
            Error: ""
        });

        return true;
    }*/

async handleSubmit(e){
    e.preventDefault();

    this.setState({
        loading: true
    });

   var today = new Date();
   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    var data = {
        "id": `${Math.random().toString(36).substring(2, 15)}`,
        "employee_Request_Time" : `${date}`,
        "employee_Code": `${this.state.EmpNumber}`,
        "software_Name": `${this.state.SoftName}`,
        "software_Version": `${this.state.Version}`,
        "employee_EmailID": `${this.state.Email}`,
        "tags": `${this.state.SoftTags}`,
        "website_Link": `${this.state.WebLink}`,
        "team_Lead_ID": `${this.state.TLName}`,
        "software_License": `${this.state.License}`,
        "level_Status": "Request is generated",
        "likes": 0
    };

   
        let response = await fetch('api/postemp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });


    this.setState({
        loading : false
    });

        if (response.status < 299 && response.status >= 200)

            window.location.replace('/');
    

}

handleOptionChange(e) {
  this.setState({
    License: e.target.value
  });

}

 handleChange(e){

  this.setState({
    [e.target.name] : e.target.value
  });


 }

/*    TagsClip(e) {

        e.preventDefault();

        if (e.key === 'Enter') {
            this.setState(prevState => ({
                SoftTagList: [...prevState.SoftTagList, this.state.SoftTags]
            }))

            this.setState(prevState => ({
                SoftTagPost: this.state.SoftTagPost + this.state.SoftTags + ", ",
                SoftTags: ''
            }))

            
        }
    }*/

handleTL(e){
  this.setState({
    TLName : e.target.value
  });
}

    render() {

/*       const { SoftTagList } = this.state;

        var taglist = SoftTagList.map(data => {
            return <div className="Capsule">{data}</div>
        });*/

        var loader = this.state.loading ? <div className="form-loader"><i aria-hidden="true" className=" large spinner loading icon"></i></div> : '';

    return (
        <div>
          <div className="Nav-form">
                <div className="Nav">
                    <Link to="/">
                        <img src="https://github.com/THELAZYKING/SoftwareDownloadSystem/blob/master/NAV.png?raw=true" alt="logo" className="main-logo"></img>
                    </Link>
                </div>
              </div>

      <div className="form-container">
        <h3 className="ui center aligned header" style={{ margin: "10px" , color : "white" }}>Create a new Software Request </h3>

        <div className="ui green segment" style={{ marginLeft : "20%" , marginRight : "20%", marginTop : "30px" , width  : "60%" , padding : "30px"}} >

        <form onSubmit={this.handleSubmit} className="ui mini form">
        
                        <div className="eight wide field">
                            <label htmlFor="EmpNumber">Employee No.  <span className="astrick"> * </span></label>
        <input id="EmpNumber" name="EmpNumber" value={this.state.EmpNumber}  type="text" onChange={ (e) => this.handleChange(e)}/>
        </div>

        <div className="fields">
        <div className="twelve wide field">
                                <label htmlFor="SoftName">Software Name  <span className="astrick"> * </span></label>
        <input id="SoftName" name="SoftName" value={this.state.SoftName}  type="text" onChange={ (e) => this.handleChange(e)}/>
        </div>

        <div className="four wide field">
                                <label htmlFor="Version">Version   <span className="astrick"> * </span></label>
        <input id="Version" name="Version" value={this.state.Version} type="text" onChange={ (e) => this.handleChange(e)} />
        </div>
        </div>


        <div className="field"> 
                            <label htmlFor="Email">Employee Email Id <span className="astrick"> * </span></label>
        <input id="Email" name="Email" type="Email" value={this.state.Email} onChange={ (e) => this.handleChange(e)} />
        </div>
                        

                 
        <div className="field">
                            <label htmlFor="SoftTags">Software Tags</label>
                            <input id="SoftTags" name="SoftTags" value={this.state.SoftTags} type="text"  onChange={(e) => this.handleChange(e)} />
        </div>

        <div className="field">
                            <label htmlFor="WebLink"> Website Link</label>
        <input id="WebLink" name="WebLink" type="text" value={this.state.WebLink}  onChange={ (e) => this.handleChange(e)}/>
        </div>

        <div className="field">
                            <label>Team Lead Name <span className="astrick"> * </span></label>
      <select value={this.state.value} onChange={this.handleTL}>
        <option value="Anil Kumar Modest">Anil Kumar Modest</option>
        <option value="Yogesh Parashar">Yogesh Parashar</option>
        <option value="Puneet Singhal">Puneet Singhal</option>
        <option value="Rahul Gupta">Rahul Gupta</option>
      </select>
                        </div>

      <br />  

        <div className="inline fields">
                            <label>License <span className="astrick"> * </span></label>
    <div className="field">
      <div className="ui radio checkbox">
        <input type="radio"  value="Free" checked={this.state.License === 'Free'} onChange={this.handleOptionChange}/>
        <label>Free</label>
      </div>
    </div>
    <div className="field">
      <div className="ui radio checkbox">
        <input type="radio"  value="Paid" checked={this.state.License === 'Paid'} onChange={this.handleOptionChange} />
        <label>Paid</label>
      </div>
    </div>
                        </div>

                       

                        <button onClick={this.handleSubmit}>Submit Download Request</button>

                        {loader}
                        
      </form> 
</div>

</div>
      </div>
    );
}

}


export default MyForm;