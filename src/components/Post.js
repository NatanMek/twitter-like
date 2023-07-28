import { Avatar } from "@mui/material";
import "./Post.css";
import {
  Publish,
  Repeat,
  VerifiedUser,
  Favorite,
  ChatBubble,
} from "@mui/icons-material";
import { forwardRef, memo } from "react";

const Post = forwardRef(
  ({ account, content, relativeDiff, isLiked, id, handleLikePost }, ref) => {
    const handleLikeTweetPost = (isTweetLiked) => {
      handleLikePost(id, isTweetLiked);
    };

    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {account}{" "}
                <span className="post__headerSpecial">
                  <VerifiedUser className="post__badge" />
                  {relativeDiff}
                </span>
              </h3>
              <p>{content}</p>
            </div>
            <div className="post__headerDescription">
              <p></p>
            </div>
          </div>
          <div className="post__footer">
            <div className="post__actions post__comment">
              <ChatBubble fontSize="small" />
            </div>

            <div className="post__actions post__retweet">
              <Repeat fontSize="small" />
            </div>

            <div className="post__actions post__like">
              <Favorite
                fontSize="small"
                className={isLiked ? "post__liked" : ""}
                onClick={() => handleLikeTweetPost(!isLiked)}
              />
            </div>
            <div className="post__actions post__share">
              <Publish fontSize="small" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default memo(Post);
