import ContactSection from '@components/Home/ContactSection';
import ExperienceSection from '@components/Home/ExperienceSection';
import Profile from '@components/Home/Profile';
import SkillsSection from '@components/Home/SkillsSection';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Artun Çolak</title>
      </Head>

      <Profile />

      <div className="mb-10 flex flex-col gap-80">
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </>
  );
}
