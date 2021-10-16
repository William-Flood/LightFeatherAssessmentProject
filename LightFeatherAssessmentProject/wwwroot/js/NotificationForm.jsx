
class NotificationForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.makeHandleSubmit.bind(this);
        this.state = { error: "", supervisorData: [], emailDisabled: true, phoneDisabled: true };
        this.toggleEmail = this.makeToggleEmail.bind(this);
        this.togglePhone = this.makeTogglePhone.bind(this);
    }
    makeToggleEmail(event) {
        this.setState({
            emailDisabled: (!event.target.checked)
        });
    }
    makeTogglePhone(event) {
        this.setState({
            phoneDisabled: (!event.target.checked)
        });
    }
    makeHandleSubmit(event) {
        event.preventDefault();
        var formElements = event.target.elements;
        var notificationRequest = {
            "FirstName": formElements.FirstName.value,
            "LastName": formElements.LastName.value,
            "Email": formElements.Email.value,
            "PhoneNumber": formElements.PhoneNumber.value,
            "Supervisor": formElements.Supervisor.value
        }
        if (!/(^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4})?$/.test(notificationRequest.PhoneNumber)) {
            this.setState({ error: "Invalid phone number" });
            return;
        }
        if (!/^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))?$/.test(notificationRequest.Email)) {
            this.setState({ error: "Invalid email" });
            return;
        }
        if ("" == notificationRequest.Email && "" == notificationRequest.PhoneNumber) {
            this.setState({ error: "Either an email or phone number must be provided!" });
            return;
        }
        if ("" == notificationRequest.FirstName) {
            this.setState({ error: "First name field required!" });
            return;
        }
        if (!/^[a-zA-Z']+$/.test(notificationRequest.FirstName)) {
            this.setState({ error: "First name must only contain letters!" });
            return;
        }
        if ("" == notificationRequest.LastName) {
            this.setState({ error: "Last name field required!" });
            return;
        }
        if (!/^[a-zA-Z']+$/.test(notificationRequest.LastName)) {
            this.setState({ error: "Last name must only contain letters!" });
            return;
        }
        if ("--Select--" == notificationRequest.Supervisor) {
            this.setState({ error: "Supervisor required!" });
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open("post", this.props.submitURL);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(notificationRequest));
        xhr.onload = () => {
            this.setState({ error: xhr.responseText });
        }
    }
    // componentWillMount() {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open("get", "this.props.supervisorsURL", false);
    //     xhr.onload = () => {
    //         const supervisorData = JSON.parse(xhr.responseText);
    //         this.setState({ supervisorData: supervisorData });
    //     };
    //     xhr.send();
    // }
    render() {
        var supervisorOptions = this.props.supervisorList.map(supervisorElem => (
            <option value={supervisorElem} key={supervisorElem}>{supervisorElem}</option>
                ));
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Notification Form</h1>
                <h3>{ this.state.error}</h3>
                <div id="form_container">
                    <div className="half_segment">
                        <label>First Name</label><br/>
                        <input name="FirstName" />
                    </div>
                    <div className="half_segment">
                        <label>Last Name</label><br />
                        <input name="LastName" />
                    </div>
                    <div className="full_segment">How would you prefer to be notified?</div>
                    <div className="half_segment">
                        <input name="EmailCheckbox" onChange={this.toggleEmail} type="checkbox" /><label>Email</label><br />
                        <input name="Email" disabled={this.state.emailDisabled } />
                    </div>
                    <div className="half_segment">
                        <input name="PhoneCheckbox" type="checkbox" onChange={ this.togglePhone } /><label>Phone Number</label><br />
                        <input name="PhoneNumber" disabled={this.state.phoneDisabled} />
                    </div>
                    <div className="full_segment">
                        <label>Supervisor</label>
                        <select name="Supervisor">
                            <option>--Select--</option>
                            { supervisorOptions}
                        </select>
                        <input type="submit" value="Submit"/>
                    </div>
                </div>
            </form>    
        );
    }
}