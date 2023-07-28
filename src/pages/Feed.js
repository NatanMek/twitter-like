import "./Feed.css";
import { useEffect, useCallback, useMemo } from "react";
import TweetsHeader from "../components/layout/TweetsHeader";
import { useState } from "react";
//import FlipMove from "react-flip-move";
import { connect } from "react-redux";
import Post from "../components/Post";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  WindowScroller,
} from "react-virtualized";

import { getTweets, clearTweets, likeTweet } from "../store/action";

const Feed = ({
  tweets,
  getTweetsForMe,
  clearTweetsForMe,
  likeTweetForMe,
  isInError,
  errorMessage,
}) => {
  const [showLikedTweets, setShowLikedTweets] = useState(false);

  useEffect(() => {
    getTweetsForMe();
  }, [getTweetsForMe]);

  const handleClearTweets = useCallback(() => {
    clearTweetsForMe();
  }, [clearTweetsForMe]);

  const handleLikePost = useCallback(
    (id, isLiked) => {
      likeTweetForMe(id, isLiked);
    },
    [likeTweetForMe]
  );

  const toggleShowLikedTweets = useCallback(() => {
    setShowLikedTweets(!showLikedTweets);
  }, [setShowLikedTweets, showLikedTweets]);

  const tweetsToShow = useMemo(() => {
    if (showLikedTweets) {
      return tweets && tweets.filter((eachTweet) => eachTweet.isLiked);
    } else {
      return tweets;
    }
  }, [showLikedTweets, tweets]);

  const likedTweetsLength = useMemo(
    () => tweets && tweets.filter((eachTweet) => eachTweet.isLiked).length,
    [tweets]
  );

  const renderCache = useMemo(
    () => new CellMeasurerCache({ defaultHeight: 80, fixedWidth: true }),
    []
  );

  const renderRow = useCallback(
    ({ index, key, parent, style }) => {
      const eachTweet = tweetsToShow[index];
      return (
        <CellMeasurer
          cache={renderCache}
          columnIndex={0}
          key={key}
          rowIndex={index}
          parent={parent}
        >
          {() => (
            <div style={style} className="row">
              <Post
                {...eachTweet}
                handleLikePost={handleLikePost}
                key={eachTweet.id}
              />
            </div>
          )}
        </CellMeasurer>
      );
    },
    [tweetsToShow, renderCache, handleLikePost]
  );

  if (isInError) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="feed">
      <TweetsHeader
        tweetsLength={tweets && tweets.length}
        handleClearTweets={handleClearTweets}
        handleShowLikedTweets={toggleShowLikedTweets}
        showLikedTweets={showLikedTweets}
        likedTweetsLength={likedTweetsLength}
      />
      <WindowScroller>
        {({ height, isScrolling, scrollTop }) => (
          <AutoSizer disableHeight={true}>
            {({ width }) => (
              <List
                autoHeight={true}
                deferredMeasurementCache={renderCache}
                height={height}
                isScrolling={isScrolling}
                overscanRowCount={500}
                rowHeight={renderCache.rowHeight}
                rowRenderer={renderRow}
                rowCount={tweetsToShow.length}
                scrollTop={scrollTop}
                width={width}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
      {tweetsToShow && !tweetsToShow.length && (
        <>
          {tweets && tweets.length ? (
            <h5>Like the tweets to see the filter working</h5>
          ) : (
            <h5>Please wait for the tweets to load or come back later</h5>
          )}
        </>
      )}
    </div>
  );

  /* return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <TweetBox />
      <div className="feed__posts posts__liked">
        <h3>Tweets Liked: {counter}</h3>
        <Button variant="contained" onClick={toggleLikedTweets}>
          Toggle Liked Tweets
        </Button>
      </div>
      <div className="feed__posts">
        {posts.length > 0 && (
          <FlipMove>
            {posts.map((post, index) => (
              <Post
                key={index}
                displayName={post.account}
                attribute={post.content}
                username={post.username}
                date={new Intl.DateTimeFormat("de-DE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }).format(post.timestamp)}
                verified
              />
            ))}
          </FlipMove>
        )}
      </div>
    </div>
  ); */
};

const mapDispatchToProps = (dispatch) => ({
  getTweetsForMe: () => dispatch(getTweets()),
  clearTweetsForMe: () => dispatch(clearTweets()),
  likeTweetForMe: (id, isLiked) => dispatch(likeTweet(id, isLiked)),
});

const mapStateToProps = (state) => ({
  tweets: state.tweets,
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
