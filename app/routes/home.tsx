import type { Route } from "./+types/home";
import Navbar from '~/components/Navbar';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumize" },
    { name: "description", content: "Smart Feedback for your resume!" },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <section className="main-section">
        <Navbar />
        <div className="page-heading">
          <h1>Track your applications & resume ratings</h1>
          <h2>Review your submissions and check AI-powered feedback</h2>
        </div>
      </section>
    </main>
  );
}
