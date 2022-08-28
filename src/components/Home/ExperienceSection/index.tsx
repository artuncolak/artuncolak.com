import experiences from '@data/experiences.json';
import { useState } from 'react';

import ExperienceDetails from './ExperienceDetails';
import ExperienceTab from './ExperienceTab';

export default function ExperienceSection() {
  const [activeExperience, setActiveExperience] = useState(0);

  return (
    <section className="mx-auto mt-32 lg:w-3/4">
      <h1 className="text-4xl">Where I’ve Worked</h1>

      <div className="my-16 flex gap-20">
        <div className="flex min-w-max flex-col items-start">
          {experiences.map(({ company }, index) => (
            <ExperienceTab
              key={index}
              label={company.name}
              active={index === activeExperience}
              onClick={() => setActiveExperience(index)}
            />
          ))}
        </div>

        <ExperienceDetails experience={experiences[activeExperience]} />
      </div>
    </section>
  );
}
