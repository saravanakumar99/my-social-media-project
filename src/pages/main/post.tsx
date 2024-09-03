import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../config/firebase";
import { Posts as IPost } from "./main";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartRegular } from '@fortawesome/free-regular-svg-icons';

interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<Like[] | null>(null);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  // Memoize the getLikes function
  const getLikes = useCallback(async () => {
    const data = await getDocs(likesDoc);
    const likesData = data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }));
    setLikes(likesData);
    setHasLiked(likesData.some((like) => like.userId === user?.uid));
  }, [likesDoc, user?.uid]);

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
        setHasLiked(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
        setHasLiked(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLikes();
  }, [getLikes]); // Include getLikes in the dependency array

  return (
    <div className="post-container">
      <div className="post-header">
        <h1>{post.title}</h1>
      </div>
      <div className="post-body">
        <p>"{post.description}"</p>
      </div>
      <div className="post-footer">
        <p>@{post.username}</p>
        <button 
          className={`like-button ${hasLiked ? 'liked' : ''}`} 
          onClick={hasLiked ? removeLike : addLike}
        >
          <FontAwesomeIcon 
            icon={hasLiked ? heartSolid : heartRegular} 
            className="like-icon"
          />
        </button>
        {likes && <p className="like-count">Likes: {likes.length}</p>}
      </div>
    </div>
  );
};
