import ContactSection from '@components/Home/ContactSection';
import ExperienceSection from '@components/Home/ExperienceSection';
import Profile from '@components/Home/Profile';
import SkillsSection from '@components/Home/SkillsSection';
import Page from '@components/Page';

export default function Home() {
  return (
    <Page title="Artun Çolak">
      <Profile />

      <div className="mb-10 flex flex-col gap-80">
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </Page>
  );
}
