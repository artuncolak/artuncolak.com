import Select from '@components/ui/Select';
import experiences from '@data/experiences.json';
import { useState } from 'react';

import Section from '../Section';
import ExperienceDetails from './ExperienceDetails';
import ExperienceTab from './ExperienceTab';

export default function ExperienceSection() {
  const [activeExperience, setActiveExperience] = useState(0);

  return (
    <Section label="Where I’ve Worked">
      <div className="flex min-h-fit flex-col gap-5 sm:flex-row sm:gap-20">
        <div className="hidden min-w-fit flex-col sm:flex">
          {experiences.map(({ company }, index) => (
            <ExperienceTab
              key={index}
              label={company.name}
              active={index === activeExperience}
              onClick={() => setActiveExperience(index)}
            />
          ))}
        </div>

        <Select
          className="sm:hidden"
          value={activeExperience}
          onChange={(e) => setActiveExperience(Number(e.target.value))}
        >
          {experiences.map(({ company }, index) => (
            <option key={index} value={index}>
              {company.name}
            </option>
          ))}
        </Select>

        <ExperienceDetails experience={experiences[activeExperience]} />
      </div>
    </Section>
  );
}
