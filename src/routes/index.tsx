import { createFileRoute } from '@tanstack/react-router';
import { Social } from '@/components/social';
import { Avatar, AvatarFallback, AvatarImage, Heading, Text } from '@/components/ui';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-8 px-4">
        <Avatar className="size-32 lg:size-40">
          <AvatarImage alt="Artun Colak" src="/profile.jpg" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="space-y-4 text-left">
          <Heading className="font-normal lg:text-6xl" level={1}>
            Hi, I'm Artun
          </Heading>
          <Heading className="font-normal lg:text-4xl" level={3}>
            I build software
          </Heading>
          <Text className="lg:text-xl" variant="muted">
            I'm a software engineer with experience in delivering clean, elegant and efficient code.
          </Text>
        </div>
        <Social />
      </div>
    </div>
  );
}
