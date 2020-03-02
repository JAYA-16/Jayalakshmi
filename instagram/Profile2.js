import React, { Component } from "react";
import axios from "axios";

export class Profile2 extends Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        profile_image:
          "https://web.uri.edu/neuralpclab/files/Man-Gentleman-Silhouette-Gray-Free-Illustrations-F-0424.jpg",
        username: this.props.username,
        fullname: this.props.fullname,
        bio: "",
        gender: "",
        phone: "",
        email: this.props.email,
        show: false,
        showpost: false,
        showupload: false,
        exists: true,
        post_image: "",
        post_caption: ""
      };
    }
  }
  componentDidMount() {
    //fetch from the database
    console.log("COMPONENT DID MOUNT CALLED FOR PROFILE2");
    axios
      .post("http://localhost:7000/users/profile2", {
        uid: this.props.uid
      })
      .then(res => {
        console.log("RESPONSE FROM PROFILE2", res);
        if (res.data !== "failed") {
          this.setState({
            profile_image: res.data[0].url,
            bio: res.data[0].bio,
            gender: res.data[0].gender,
            phone: res.data[0].phone,
            exists: true
          });
        }
      });
  }
  showModal = event => {
    this.setState({
      show: true
    });
  };
  hideModal = event => {
    this.setState({
      show: false
    });
  };
  showPost = event => {
    this.setState({
      showpost: true
    });
  };
  hidePost = event => {
    this.setState({
      showpost: false
    });
  };
  showUpload = event => {
    this.setState({
      showupload: true
    });
  };
  hideUpload = event => {
    this.setState({
      showupload: false
    });
  };
  handleBioChange = event => {
    this.setState({
      bio: event.target.value
    });
  };
  handleGenderChange = event => {
    this.setState({
      gender: event.target.value
    });
  };
  handlePhoneChange = event => {
    this.setState({
      phone: event.target.value
    });
  };
  handleImageChange = event => {
    // console.log("IMAGE raw value:------>", event.target.value);

    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = () => {
      this.setState({
        profile_image: reader.result
      });
    };

    reader.readAsDataURL(file);
  };
  handleSubmit = event => {
    // console.log("this is the data of the profile----->", this.state.filei);
    if (this.state.exists) {
      axios
        .post("http://localhost:7000/users/profile", {
          uid: this.props.uid,
          bio: this.state.bio,
          gender: this.state.gender,
          phone: this.state.phone,
          url: this.state.profile_image
        })
        .then(res => {
          console.log("After submitting the profile data!", res);
          this.setState({
            show: false,
            showupload: false
          });
        });
    } else {
      axios
        .post("http://localhost:7000/users/updateprofile", {
          uid: this.props.uid,
          bio: this.state.bio,
          gender: this.state.gender,
          phone: this.state.phone,
          url: this.state.profile_image
        })
        .then(res => {
          console.log("updated Successfuly!!", res);
          this.setState({
            show: false,
            showupload: false
          });
        });
    }
  };

  //handles the post related activities
  handlePostImageChange = event => {
    console.log("post image url!");
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = () => {
      //console.log(reader.result);
      this.setState({
        post_image: reader.result
      });
    };

    reader.readAsDataURL(file);
  };
  handlePostCaptionChange = event => {
    this.setState({
      post_caption: event.target.value
    });
  };
  post = event => {
    // console.log("this is the post image url", this.state.post_image);
    //put it into the posts database
    axios
      .post("http://localhost:7000/users/post", {
        uid: this.props.uid,
        image_url: this.state.post_image,
        caption: this.state.post_caption
      })
      .then(res => {
        console.log("inserted in post table", res);
        this.setState({
          showpost: false
        });
      });
  };

  render() {
    return (
      <div>
        <div className="posts">
          <img className="pro" src={this.state.profile_image} alt="profile" />
          <div className="post-head">
            <div className="heads">
              <h1 className="heading">{this.state.username}</h1>
              <div className="iconic">
                <button className="edit" onClick={this.showModal}>
                  Edit Profile
                </button>

                <img
                  className="settings"
                  src="https://cdn0.iconfinder.com/data/icons/instagram-ui-1/24/Instagram-UI_setting-512.png"
                  alt="settings"
                />
              </div>
            </div>
            <div className="posts-bio">
              <p className="bio">
                <b>{this.state.fullname}</b>
              </p>
              <p className="bio">{this.state.bio}</p>
              <button className="post-btn" onClick={this.showPost}>
                post
              </button>
            </div>

            {this.state.showpost ? (
              <div className="modalss">
                <div className="modal2">
                  <div className="modal2-data">
                    <label for="image">
                      <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={this.handlePostImageChange}
                      />
                      <h6 className="caption-label">Select from Gallery</h6>
                    </label>
                    <div className="caption">
                      <h6 className="caption-label">Add a Caption</h6>
                      <input
                        type="text"
                        className="caption-input"
                        value={this.state.post_caption}
                        onChange={this.handlePostCaptionChange}
                      />
                    </div>
                    <button className="caption-label" onClick={this.post}>
                      post
                    </button>
                  </div>
                  <div>
                    <span className="close" onClick={this.hidePost}>
                      X
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            {this.state.show ? (
              <div className="modalss">
                <div className="modal1">
                  <div className="labels">
                    <p className="content">Edit Profile</p>
                    <p className="content">Change Password</p>
                    <p className="content">Apps and Website</p>
                    <p className="content">Email and SMS</p>
                    <p className="content">Push Notifications</p>
                    <p className="content">Manage Contacts</p>
                    <p className="content">Privacy and Security</p>
                    <p className="content">Login Activity</p>
                    <p className="content">Email from Instagram</p>
                  </div>
                  <div className="vl1"></div>
                  <div className="edit-profile">
                    <img
                      className="edit-profile-avatar"
                      src={this.state.profile_image}
                      alt="edit profile"
                    />
                    <h3 className="edit-profile-name">{this.state.username}</h3>
                    <h3
                      className="edit-profile-photo"
                      onClick={this.showUpload}
                    >
                      Change Profile Photo
                    </h3>
                    {this.state.showupload ? (
                      <div>
                        <label for="image">
                          <input
                            type="file"
                            name="image"
                            id="image"
                            value={this.state.image}
                            onChange={this.handleImageChange}
                          />
                          <h6>Upload your profile</h6>
                        </label>
                        <h6 onClick={this.hideUpload}>cancel</h6>
                      </div>
                    ) : null}

                    <div className="edit-profile-data">
                      <div className="input-label">
                        <label className="labels">Name </label>
                        <input
                          className="edit-profile-input"
                          type="text"
                          value={this.state.fullname}
                        />
                      </div>
                      <div className="input-label">
                        <label className="labels">Username</label>
                        <input
                          className="edit-profile-input"
                          type="text"
                          value={this.state.username}
                        />
                      </div>
                      <div className="input-label">
                        <label className="labels">Website</label>
                        <input className="edit-profile-input" type="text" />
                      </div>
                      <div className="input-label">
                        <label className="labels">Bio</label>
                        <textarea
                          value={this.state.bio}
                          onChange={this.handleBioChange}
                        ></textarea>
                      </div>
                      <div className="input-label">
                        <h5>Personal Information</h5>
                      </div>

                      <div className="input-label">
                        <label className="labels">Email</label>
                        <input
                          className="edit-profile-input"
                          type="text"
                          value={this.state.email}
                        />
                      </div>

                      <div className="input-label">
                        <label className="labels">Phone Number</label>
                        <input
                          className="edit-profile-input"
                          type="text"
                          value={this.state.phone}
                          onChange={this.handlePhoneChange}
                        />
                      </div>
                      <div className="input-label">
                        <label className="labels">Gender</label>
                        <input
                          className="edit-profile-input"
                          type="text"
                          value={this.state.gender}
                          onChange={this.handleGenderChange}
                        />
                      </div>
                    </div>
                    <div className="submit">
                      <button
                        className="edit-profile-submit"
                        onClick={this.handleSubmit}
                      >
                        Submit
                      </button>
                      <h6>Temporarily disable my account</h6>
                    </div>
                  </div>

                  <div>
                    <span className="close" onClick={this.hideModal}>
                      X
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile2;
