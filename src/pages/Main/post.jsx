import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Post = (props) => {
  const [likes, setLikes] = useState([]);
  const { post } = props;
  const likeRef = collection(db, 'likes');
  const [user] = useAuthState(auth);

  const likeDocQuery = query(likeRef, where('post_id', '==', post.id));

  const getLikes = async () => {
    const data = await getDocs(likeDocQuery);
    setLikes(data.docs.map((doc) => ({ id: doc.id, userId: doc.data().user_id })));
  };

  const hasUserLiked = likes.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  const addLike = async () => {
    if (user) {
      try {
        if (hasUserLiked) {
          // Unlike
          const likeToRemove = likes.find((like) => like.userId === user.uid);
          await deleteDoc(doc(db, 'likes', likeToRemove.id));
          setLikes((prev) => prev.filter((like) => like.id !== likeToRemove.id));
        } else {
          // Like
          const newLike = await addDoc(likeRef, {
            user_id: user.uid,
            post_id: post.id,
          });
          setLikes((prev) => [...prev, { id: newLike.id, userId: user.uid }]);
        }
      } catch (error) {
        console.error('Error adding like: ', error);
        alert(`Error adding like: ${error.message}`);
      }
    } else {
      console.log('User not authenticated');
      alert('Please log in to like a post.');
    }
  };

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p> {/* Ensure this matches the field in Firestore */}
      </div>
      <div className="footer">
        <p>@{post.username}</p>
        <button onClick={addLike}>
          {hasUserLiked ? '👎' : '👍'}
        </button>
        {likes && <p>Likes: {likes.length}</p>}
      </div>
    </div>
  );
};
