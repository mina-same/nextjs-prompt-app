"use client";
import React, {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const myProfile = () => {

  const [posts, setPosts] = useState([]);
  const {data: session} = useSession();

  const router = useRouter();

  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }
  
  const handleDelete = async (post) =>{
    const hasConfirmed = confirm("Are you sure tou want to delete this prompt?");
    if(hasConfirmed) {
      try{
        await fetch(`/api/prompt/${post._id.toString()}`,{
          method: 'DELETE',
        })

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);

      } catch(err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`api/users/${session?.user.id}/posts`, {method: 'GET'});
      const data = await response.json();
      setPosts(data); 
    }

    if(session?.user.id) fetchPosts();
  }, []);

  return (
    <Profile 
      name="My" 
      desc="welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default myProfile;