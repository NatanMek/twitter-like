import React, { memo } from "react";

import { Button } from "@mui/material";
import TweetBox from "./UI/TweetBox";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./TweetsHeader.css";

import { getTweetCountText } from "../../utils/genericUtils";

const TweetsHeader = ({
  tweetsLength = 0,
  likedTweetsLength = 0,
  handleShowLikedTweets,
  showLikedTweets,
  handleClearTweets,
}) => {
  return (
    <div className="feed__header">
      <h2>Home</h2>
      <TweetBox />
      {tweetsLength > 0 && (
        <>
          <div className="feed__header liked__tweets">
            <span>
              {likedTweetsLength > 0 ? (
                <>
                  {getTweetCountText(likedTweetsLength, true)} of{" "}
                  {getTweetCountText(tweetsLength)}
                </>
              ) : (
                <>{getTweetCountText(tweetsLength)}</>
              )}
            </span>
            <div className="switch">
              <FormControlLabel
                control={
                  <Switch
                    checked={showLikedTweets}
                    onChange={handleShowLikedTweets}
                  />
                }
                label="Toggle Liked Tweets"
              />
            </div>
          </div>
          <Button
            className="header__button"
            variant="contained"
            onClick={handleClearTweets}
          >
            Clear Tweets
          </Button>
        </>
      )}
    </div>
  );
};

export default memo(TweetsHeader);
