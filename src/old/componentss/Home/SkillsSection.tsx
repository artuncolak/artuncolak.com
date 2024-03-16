import skills from '@data/skills.json';

import Section from './Section';

export default function SkillsSection() {
  return (
    <Section
      className="mt-16"
      label="Skills"
      description="Here are a few technologies I’ve been working with recently:"
    >
      <ul className="ml-5 grid list-disc grid-cols-2 gap-3 sm:grid-cols-3">
        {skills.sort().map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </Section>
  );
}
