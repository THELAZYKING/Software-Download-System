import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import "./Form.css";
import {Link} from "react-router-dom";

class NSDForm extends React.Component {
    constructor()
    {
        super();

        this.state = {
            TLTime : '',
            paramid: '',
            EmpNumber: '',
            EmpTime: '',
            SoftName: '',
            Version: '',
            Email: '',
            SoftTags: '',
            WebLink: '',
            TLName: '',
            License: '',
            TLstatus: '',
            TLremark: '',
            NSDremark: '',
            loading : false,
            NSDStatus: 'Approve',
            likes : 0
        }

        this.handleNSDstatus = this.handleNSDstatus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.setState({
            loading: true
        });

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        
         var data = {
             "id": `${Math.random().toString(36).substring(2, 15)}`,
            "team_Lead_Response_Time": `${this.state.TLTime}`,
            "employee_Request_time": `${this.state.EmpTime}`,
            "employee_Code": `${this.state.EmpNumber}`,
            "software_Name": `${this.state.SoftName}`,
            "software_Version": `${this.state.Version}`,
            "employee_EmailID": `${this.state.Email}`,
            "tags": `${this.state.SoftTags}`,
            "website_Link": `${this.state.WebLink}`,
            "team_Lead_ID": `${this.state.TLName}`,
             "software_License": `${this.state.License}`,
             "level_Status": `${this.state.NSDStatus === "Reject" ? "Request is declined by NSD" : "Request is complete"}`,
            "team_Lead_Status": `${this.state.TLstatus}`,
            "team_Lead_Remark": `${this.state.TLremark}`,
            "nsD_Response_Status": `${this.state.NSDStatus === "Reject" ? "Rejected" : "Accepted"}`,
             "nsD_Response_Link": `${this.state.NSDStatus === "Reject" ? null :  this.state.NSDremark }`,
             "nsD_Response_Remark": `${this.state.NSDStatus === "Reject" ? this.state.NSDremark : null}`,
             "nsd-Response-Time": `${date}`,
             "likes": this.state.likes
        };

        var deleteRequest = await fetch(`api/${this.state.paramid}`, {
            method: 'DELETE',
        });

        console.log(deleteRequest.status);

        let response = await fetch('api/postnsd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        this.setState({
            loading: false
        });

        console.log(response.status);

        window.location.replace("/");

    }

    handleNSDstatus(e) {
        if (this.state.NSDStatus === 'Reject')
            this.setState({
                NSDStatus: 'Approve'
            });
        else {
            this.setState({
                NSDStatus: 'Reject'
            });
        }
        }
    
     
    handleChange(e) {

        this.setState({
            NSDremark : e.target.value
        });
    }

    render() {

        var loader = this.state.loading ? <div className="form-loader"><i aria-hidden="true" className=" large spinner loading icon"></i></div> : '';

    return (
        <div>
          <div className="Nav">
          <Link to="/">
              <h1 className="nav-title" >Software Download System</h1>
              </Link>
              </div>

            <div className="ui red segment" style={{ marginLeft: "20%", marginRight: "20%", marginTop: "30px", width: "60%", padding: "30px" }} >

                <form className="ui mini form">

                    <div className="eight wide field">
                        <label htmlFor="EmpNumber">Employee No.</label>
                        <input id="EmpNumber" name="EmpNumber" value={this.state.EmpNumber} type="text" />
                    </div>

                    <div className="fields">
                        <div className="twelve wide field">
                            <label htmlFor="SoftName">Software Name</label>
                            <input id="SoftName" name="SoftName" value={this.state.SoftName} type="text" />
                        </div>

                        <div className="four wide field">
                            <label htmlFor="Version">Version </label>
                            <input id="Version" name="Version" value={this.state.Version} type="text" />
                        </div>
                    </div>


                    <div className="field">
                        <label htmlFor="Email">Employee Email Id</label>
                        <input id="Email" name="Email" type="Email" value={this.state.Email} />
                    </div>

                    <div className="field">
                        <label htmlFor="SoftTags">Software Tags</label>
                        <input id="SoftTags" name="SoftTags" value={this.state.SoftTags} type="text" />
                    </div>

                    <div className="field">
                        <label htmlFor="WebLink"> Website Link</label>
                        <input id="WebLink" name="WebLink" type="text" value={this.state.WebLink} />
                    </div>

                    <div className="field">
                        <label>Team Lead Name</label>
                        <input id="WebLink" name="WebLink" type="text" value={this.state.TLName} />
                    </div>



                    <div className="inline fields">
                        <label>License</label>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" value="Free" checked={this.state.License === 'Free'} />
                                <label>Free</label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" value="Paid" checked={this.state.License === 'Paid'} />
                                <label>Paid</label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="ui red segment" style={{ marginLeft: "20%", marginRight: "20%", marginTop: "30px", width: "60%", padding: "30px" }} >

                <h4 className="ui center aligned header" style={{ margin: "20px" }}> Team Lead Panel </h4>

                <form className="ui mini form">

                    <div className="inline fields">
                        <label>Approval Status</label>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" value="Approved" checked={this.state.TLstatus === 'Approved'}  />
                                <label>Approved</label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" value="Rejected" checked={this.state.TLstatus === 'Rejected'}  />
                                <label>Rejected</label>
                            </div>
                        </div>
                    </div>

                    <br />
                    <div className="field">
                        <label>Remarks</label>
                        <textarea placeholder="..." rows="3" value={this.state.TLremark} />
                    </div>
                </form>

            </div>

                <div className="ui green segment" style={{ marginLeft: "20%", marginRight: "20%", marginTop: "30px", width: "60%", padding: "30px" }} >

                    <h4 className="ui center aligned header" style={{ margin: "20px" }}> NSD Panel</h4>

                    <form className="ui mini form">

                    
                        <div className="field">
                        <label>Download Link <span className="astrick"> * </span></label>
                        <textarea placeholder={this.state.NSDStatus === 'Reject' ? "Please Enter the reason for Rejection" : "Enter the download link" } rows="3" value={this.state.NSDremark} onChange={(e) => this.handleChange(e)}></textarea>
                    </div>

                    <div class="ui checkbox">
                        <input type="checkbox" checked={this.state.NSDStatus === 'Reject'} onChange={this.handleNSDstatus} />
                        <label>Didn't find the download link</label>
                    </div>

                    <br />
                    <button onClick={this.handleSubmit}>Submit Download Link</button>

                    {loader}
                    </form>
    </div>

            </div>

            
    );
    }

    componentDidMount() {
        this.getSofwarebyid();
    }

    async getSofwarebyid() {

        const { id } = this.props.match.params;


        this.setState({
            paramid: id
        });

        const response = await fetch(`api/${id}`);
        const data = await response.json();

        this.setState({
            EmpNumber: data.employee_Code,
            SoftName: data.software_Name,
            Version: data.software_Version,
            Email: data.employee_EmailID,
            SoftTags: data.tags,
            WebLink: data.website_Link,
            TLName: data.team_Lead_ID,
            License: data.software_License,
            EmpTime: data.employee_Request_Time,
            TLstatus: data.team_Lead_Status,
            TLremark: data.team_Lead_Remark,
            TLTime: data.team_Lead_Response_Time,
            likes: data.likes
        });

        if (response.status === 404) {
            window.location.replace('/error');
        };
    }

}


export default NSDForm;