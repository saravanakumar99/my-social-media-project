import { useCallback, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Post } from "./post";
import { Link } from "react-router-dom";

export interface Posts {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Main = () => {
  const [postsList, setPostsList] = useState<Posts[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const postsRef = collection(db, "posts");

  const getPosts = useCallback(async () => {
    try {
      const data = await getDocs(postsRef);
      setPostsList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Posts[]
      );
    } catch (err) {
      setError(`Error fetching posts: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, [postsRef]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (loading) return <p>Loading...</p>;
  if (error) return(
    <div className="home-message">
        <h4>Please log in with your Gmail account to continue,</h4>
        <Link to='/login'>login</Link>
    </div>
  );

  return (
    <div className="main-page">
      {postsList?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
