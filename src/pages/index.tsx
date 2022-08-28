import ExperienceSection from '@components/Home/ExperienceSection';
import Profile from '@components/Home/Profile';
import SkillsSection from '@components/Home/SkillsSection';

export default function Home() {
  return (
    <>
      <Profile />

      <div className="mx-auto mb-96 flex flex-col gap-96 lg:w-3/4">
        <SkillsSection />
        <ExperienceSection />
      </div>
    </>
  );
}
