import skills from '@data/skills.json';

export default function SkillsSection() {
  return (
    <section className={'mx-auto my-16 lg:w-3/4'}>
      <h1 className="mb-3 text-4xl">Skills</h1>
      <span>Here are a few technologies I’ve been working with recently:</span>
      <ul className="my-16 ml-5 grid list-disc grid-cols-2 gap-3 sm:grid-cols-3">
        {skills.sort().map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}
