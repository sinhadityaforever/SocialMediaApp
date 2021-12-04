import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Topbar from "../../components/topbar/Topbar";
import { loginFailed } from "../../features/userSlice";
const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const selectedUser = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const descRef = useRef<any>();
  const cityRef = useRef<any>();
  const fromRef = useRef<any>();
  const relationshipRef = useRef<any>();
  const [preview, setPreview] = useState<any>(selectedUser?.profilePicture);
  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
      console.log(preview);
    };
  };

  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const updatedUser = {
      desc: descRef.current.value ? descRef.current.value : "",
      from: fromRef.current.value ? fromRef.current.value : "",
      city: cityRef.current.value ? cityRef.current.value : "",
      tempImg: preview,
      relationship: relationshipRef.current.value
        ? relationshipRef.current.value
        : "",
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER}/users/update/${selectedUser?._id}`,
        updatedUser
      );
      setIsLoading(false);
      alert("Successfully updated. Please login again");
      localStorage.removeItem("user");
      dispatch(loginFailed());
    } catch (error) {
      alert("Failed to update");
      setIsLoading(false);
    }
  };
  return (
    <>
      <Topbar />
      <div className="container bootstrap snippets bootdey">
        <h1 className="text-primary">Edit Profile</h1>
        <hr />
        <div className="row">
          <div className="col-md-3">
            <div className="text-center">
              <img
                src={preview}
                className="avatar img-circle img-thumbnail"
                alt="avatar"
              />
              <h6>Upload a different photo...</h6>

              <input
                type="file"
                className="form-control"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => {
                  previewFile(e.target.files![0]);
                }}
              />
            </div>
          </div>

          <div className="col-md-9 personal-info">
            <div className="alert alert-info alert-dismissable">
              <i className="fa fa-coffee"></i>
              <strong>Note: </strong>You will need to login again after saving.
            </div>
            <h3>Personal info</h3>

            <form
              className="form-horizontal"
              role="form"
              onSubmit={updateHandler}
            >
              <div className="form-group">
                <label className="col-lg-3 control-label">Bio</label>
                <div className="col-lg-8">
                  <input
                    ref={descRef}
                    className="form-control"
                    type="text"
                    placeholder={
                      selectedUser!.desc
                        ? selectedUser!.desc
                        : "Tell us about yourself"
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Country</label>
                <div className="col-lg-8">
                  <input
                    ref={fromRef}
                    className="form-control"
                    type="text"
                    placeholder={
                      selectedUser?.from
                        ? selectedUser.from
                        : "Enter your country"
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">City</label>
                <div className="col-lg-8">
                  <input
                    ref={cityRef}
                    className="form-control"
                    type="text"
                    placeholder={
                      selectedUser?.city ? selectedUser.city : "Enter your city"
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-3 control-label">Relationship</label>
                <div className="col-lg-8">
                  <select name="Relationship" ref={relationshipRef}>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                  </select>
                </div>
              </div>
              <div className="row-lg-2">
                <button
                  style={{
                    backgroundColor: `${isLoading ? "grey" : "#1877f2"}`,
                  }}
                  type="submit"
                  className="btn btn-primary btn-lg btn-block mt-4"
                >
                  {isLoading ? "Loading" : "Save"}
                </button>
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  style={{
                    backgroundColor: "grey",
                    border: "none",
                    marginLeft: "20px",
                  }}
                  className="btn btn-primary btn-lg btn-block mt-4"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
};
export default EditProfile;
