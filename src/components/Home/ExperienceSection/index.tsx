import experiences from '@data/experiences.json';
import { useState } from 'react';

import Section from '../Section';
import ExperienceDetails from './ExperienceDetails';
import ExperienceTab from './ExperienceTab';

export default function ExperienceSection() {
  const [activeExperience, setActiveExperience] = useState(0);

  return (
    <Section label="Where I’ve Worked">
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-20">
        <div className="flex items-start overflow-x-auto sm:flex-col sm:overflow-x-visible">
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
    </Section>
  );
}
