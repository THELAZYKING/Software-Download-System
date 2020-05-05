import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import "./TLForm.css";
import {Link} from "react-router-dom";

class MyForm extends React.Component {
    constructor() {
        super();



        this.state = {
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
            TL_status: '',
            TL_remark: '',
            Likes: 0,
            loading : false

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }


    handleChange(e) {

        this.setState({
            TL_remark: e.target.value
        });

    }

/*    Validate = (data) => {

        if (data.team_Lead_Status === "") {
            this.setState({
                Error: "There is an Error : There must be any value to Approval Status"
            });

            return false;
        }

        if (data.team_Lead_Remark.length < 10) {
            this.setState({
                Error: "There is an Error : Your Remark should be longer"
            });

            return false;
        }
    }*/

    async handleSubmit(e) {
        e.preventDefault();

        this.setState({
            loading: true
        });

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        var data = {
            "id": `${Math.random().toString(36).substring(2, 15)}`,
            "team_Lead_Response_Time": `${date}`,
            "employee_Request_time": `${this.state.EmpTime}`,
            "employee_Code": `${this.state.EmpNumber}`,
            "software_Name": `${this.state.SoftName}`,
            "software_Version": `${this.state.Version}`,
            "employee_EmailID": `${this.state.Email}`,
            "tags": `${this.state.SoftTags}`,
            "website_Link": `${this.state.WebLink}`,
            "team_Lead_ID": `${this.state.TLName}`,
            "software_License": `${this.state.License}`,
            "level_Status": `${this.state.TL_status === "Approved" ? "Request is pending from NSD" : "Request is rejected from Team Lead"}`,
            "team_Lead_Status": `${this.state.TL_status}`,
            "team_Lead_Remark": `${this.state.TL_remark}`,
            "likes": this.state.likes

        };

        var deleteRequest = await fetch(`api/${this.state.paramid}`, {
            method: 'DELETE',
        });

        /*if (this.Validate(data)) {*/
            let response = await fetch('api/posttl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

        this.setState({
            loading: false
        });

            if (response.status >= 200 && response.status < 299) {
                window.location.replace('/')
            }
        

    }
        handleOptionChange(e) {
            this.setState({
                TL_status: e.target.value
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

                <h3 className="ui center aligned header" style={{ margin: "10px" }}>Create a new Software Request </h3>

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

                <div className="ui green segment" style={{ marginLeft: "20%", marginRight: "20%", marginTop: "30px", width: "60%", padding: "30px" }} >

                    <h4 className="ui center aligned header" style={{ margin: "20px" }}> Team Lead Panel </h4>

                    <form className="ui mini form">

                        <div className="inline fields">
                            <label>Approval Status <span className="astrick"> * </span></label>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input type="radio" value="Approved" checked={this.state.TL_status === 'Approved'} onChange={this.handleOptionChange} />
                                    <label>Approved</label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input type="radio" value="Rejected" checked={this.state.TL_status === 'Rejected'} onChange={this.handleOptionChange} />
                                    <label>Rejected</label>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label>Remarks <span className="astrick"> * </span></label>
                            <textarea placeholder="..." rows="3" value={this.state.TL_remark} onChange={(e) => this.handleChange(e)} ></textarea>
                        </div>


                        <button onClick={this.handleSubmit}>Submit Approval</button>

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

        console.log(id);

        this.setState({
            paramid: id
        });

        const response = await fetch(`api/${id}`);
        const data = await response.json();

        this.setState({
            Likes: data.likes,
            EmpNumber: data.employee_Code,
            SoftName: data.software_Name,
            Version: data.software_Version,
            Email: data.employee_EmailID,
            SoftTags: data.tags,
            WebLink: data.website_Link,
            TLName: data.team_Lead_ID,
            License: data.software_License,
            EmpTime: data.employee_Request_Time
        });

        if (response.status === 404) {
            window.location.replace('/error');
        };
    }

}

export default MyForm;