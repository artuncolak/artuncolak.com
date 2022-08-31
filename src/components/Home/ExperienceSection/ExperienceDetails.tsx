import { Experience } from '@lib/models';

interface Props {
  experience: Experience;
}

export default function ExperienceDetails({ experience }: Props) {
  const { company, position, startDate, endDate, descriptions } = experience;

  return (
    <div className={'flex flex-col gap-3'}>
      <h1 className="text-xl sm:text-2xl">
        {position}{' '}
        <span className="text-primary-500 dark:text-primary-700">
          @{' '}
          <span>
            {company.url ? (
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {company.name}
              </a>
            ) : (
              company.name
            )}
          </span>
        </span>
      </h1>
      <span>{`${startDate} - ${endDate || 'Present'}`}</span>
      <ul className="mt-5 ml-5 flex list-disc flex-col gap-3">
        {descriptions.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
