import { Search } from "@mui/icons-material";
import "./Widgets.css";
import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed";

function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <Search className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text"></input>
      </div>
      <div className="widgets__widgetContainer">
        <h2>What's happening?</h2>
        <TwitterTweetEmbed tweetId={"1683748949981638658"} />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="IBMDACH"
          options={{ height: 400 }}
        />
      </div>
    </div>
  );
}

export default Widgets;
