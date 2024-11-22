'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; 
import ProjectTracker from '@/components/ProjectTracker';

export default function Page() {
  const router = useRouter(); 

  const handleRedirect = () => {
    router.push('/projectTracker'); 
  };

  return (
    <div className="pt-3 flex flex-col">

      
      <div>
        <ProjectTracker />
      </div>
    </div>
  );
}


  