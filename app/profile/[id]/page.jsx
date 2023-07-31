"use client";
import React, {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";

import Profile from '@components/Profile';

const AuthorProfile = ({ params }) => {

  const [posts, setPosts] = useState([]);
  const {data: session} = useSession();

  const searchParams = useSearchParams();
  const userName = searchParams.get('name');
  console.log(userName);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`, {method: 'GET'});
      const data = await response.json();
      setPosts(data); 
    }

    if (params?.id) fetchPosts();
  }, []);

  {console.log(posts);}
  return (
    <Profile 
      name={userName} 
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  )
}

export default AuthorProfile;