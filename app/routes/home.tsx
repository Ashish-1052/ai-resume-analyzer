import type { Route } from "./+types/home";
import Navbar from '~/components/Navbar';
import ResumeCard from '~/components/ResumerCard';
import { usePuterStore } from '~/lib/puter';
import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumize" },
    { name: "description", content: "Smart Feedback for your resume!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState<boolean>(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = await (kv.list('resume: *', true)) as KVItem[];
      if (!resumes) return setLoadingResumes(false);
      
      const parsedResumes = resumes?.map((item) => JSON.parse(item.value) as Resume) || [];
      setResumes(parsedResumes);
      setLoadingResumes(false);
    }
    loadResumes();
  }, []);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-[16px]">
          <h1>Track your applications & resume ratings</h1>
          <h2>Review your submissions and check AI-powered feedback</h2>
        </div>
      </section>
      {!loadingResumes && resumes?.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <p>No Resumes Found</p>
          <Link to="/upload" className="primary-button">Upload Resume</Link>
        </div>
      )} 
      {!loadingResumes && resumes?.length > 0 &&
        (<div className="resumes-section">
          {resumes?.map((item) => (
            <ResumeCard resume={item} key={item?.id} />
          ))}
        </div>
      )}
      {loadingResumes && (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/resume-scan-2.gif" className="w-[200px]" />
        </div>
      )} 
    </main>
  );
}
