import type { Route } from "./+types/home";
import Navbar from '~/components/Navbar';
import { resumes } from '~/constants';
import ResumeCard from '~/components/ResumerCard';
import { usePuterStore } from '~/lib/puter';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumize" },
    { name: "description", content: "Smart Feedback for your resume!" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <section className="main-section">
        <Navbar />
        <div className="page-heading py-[16px]">
          <h1>Track your applications & resume ratings</h1>
          <h2>Review your submissions and check AI-powered feedback</h2>
        </div>
      </section>
      {resumes?.length > 0 &&
        (<div className="resumes-section">
          {resumes?.map((item) => (
            <ResumeCard resume={item} key={item?.id} />
          ))}
        </div>)
      }
    </main>
  );
}
