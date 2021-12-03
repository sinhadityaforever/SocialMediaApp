import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { useAppSelector } from "../../app/hooks";
import { useRef, useState } from "react";
import { IPost } from "../../type";
import axios from "axios";

const Share = () => {
  const selectedUser = useAppSelector((state) => state.user.user);
  const descRef = useRef<any>();
  const [preview, setPreview] = useState<any>();
  const [file, setFile] = useState<File>();
  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
      console.log(preview);
    };
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      console.log(error);
    }
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
        {preview && <img className="postImg" src={preview} alt="" />}
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <label htmlFor="file" className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
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
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </label>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
