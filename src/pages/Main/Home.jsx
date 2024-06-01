import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Post } from './post';

export const Home = () => {
  const [postList, setPostList] = useState([]);

  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(posts); // Log the posts to check the structure
    setPostList(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
