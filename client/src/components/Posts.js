import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styles from "./Posts.module.css";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Posts(props) {
  const PER_PAGE = 6;
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const history = useHistory();

  const fetchPosts = async () => {
    try {
      const response = await axios.get("api/user-posts", {
        params: {
          start: (page - 1) * PER_PAGE,
          offset: PER_PAGE,
          userId: props.userId,
          refresh: props.refreshPosts,
        },
      });

      const { data } = response;
      if (!data.posts.length) {
        setHasMore(false);
        return;
      }

      setPosts((posts) => [...posts, ...data.posts]);
      setPage((page) => page + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchPosts}
      hasMore={hasMore}
    >
      <div className={styles.imageGrid}>
        {posts.map((post) => (
          <img
            key={post.postId}
            className={styles.img}
            src={`${post.path}_thumb.jpeg`}
            alt=""
            onClick={() => {
              history.push({
                pathname: "/photo",
                state: { post: post },
              });
            }}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}
