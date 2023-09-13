import React from "react";
import Topic from "./Topic";

const Topics = () => {
  const topics = [
    { topic: "Updates", description: "Site-related updates" },
    {
      topic: "Methods",
      description: "Suggestions and Discussions",
    },
    {
      topic: "Books",
      description: "Talk about the best books on Rizz",
    },
    {
      topic: "Games",
      description: "How are you getting played or are you playing them?",
    },
    {
      topic: "Movies",
      description: "The love story in the Twilight Saga is subpar",
    },
    {
      topic: "Music",
      description: "Post your favorite song for Rizzing someone up",
    },
    { topic: "Off-topic", description: "Anything non-Rizz related goes here" },
  ];

  return (
    <div>
      <ul className="list-group">
        {topics.map(({ topic, description }) => (
          <Topic topic={topic} description={description} />
        ))}
      </ul>
    </div>
  );
};

export default Topics;
