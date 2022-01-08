import "./share.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useAppSelector } from "../../app/hooks";
import { useRef, useState } from "react";
import { IPost } from "../../type";
import axios from "axios";
import { CircularProgress, Tooltip } from "@material-ui/core";

const Share = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const selectedUser = useAppSelector((state) => state.user.user);
  const descRef = useRef<any>();
  const [preview, setPreview] = useState<any>();
  const [file, setFile] = useState<File>();
  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!descRef.current.value) {
      alert("Please enter something!");
      return;
    }
    setLoading(true);
    let newPost: IPost & {
      tempImg?: string;
    };
    if (preview) {
      newPost = {
        userId: selectedUser!._id,
        desc: descRef.current.value,
        tempImg: preview,
      };
    } else {
      newPost = {
        userId: selectedUser!._id,
        desc: descRef.current.value,
      };
    }

    try {
      await axios.post(`${process.env.REACT_APP_SERVER}/posts`, newPost);
      alert("Post successfully added!");
      setPreview(undefined);
      window.location.reload();
    } catch (error) {
      alert("Failed to post! Try agin :(");
    }
    setLoading(false);
  };
  return (
    <div className={preview ? "share_photoInserted" : "share"}>
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={selectedUser?.profilePicture}
            alt=""
          />

          <input
            placeholder={`What's in your mind ${selectedUser?.username}`}
            className="shareInput"
            ref={descRef}
          />
        </div>
        {preview && (
          <div className="share_imageDiv">
            <img className="postImg" src={preview} alt="" />
            <span
              className="share_crossButton"
              onClick={() => {
                setPreview(undefined);
              }}
            >
              <Tooltip title="Remove this image">
                <Cancel />
              </Tooltip>
            </span>
          </div>
        )}
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <label htmlFor="file" className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo</span>
              <input
                onChange={(e) => {
                  previewFile(e.target.files![0]);
                  setFile(e.target.files![0]);
                }}
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpg, .jpeg"
              ></input>
            </div>
          </label>
          <button
            className="btn btn-primary btn-md btn-block "
            type="submit"
            style={{
              backgroundColor: `${loading ? "grey" : "green"}`,
              border: "none",
            }}
          >
            {loading ? "Loading" : "Share"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
