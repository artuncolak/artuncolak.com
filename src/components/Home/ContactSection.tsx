import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import Textarea from '@components/ui/Textarea';
import { ContactRequest } from '@lib/models';
import axios from 'axios';
import { useState } from 'react';

import Section from './Section';

export default function ContactSection() {
  const [contact, setContact] = useState<ContactRequest>({
    email: '',
    message: '',
    name: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    await axios.post('/api/send-email', contact);
    setContact({ email: '', message: '', name: '' });
    setSubmitting(false);
  };

  return (
    <Section label="Contact">
      <form
        className="mx-auto flex flex-col gap-5 sm:w-3/4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex flex-col gap-5 sm:flex-row">
          <Input
            type="email"
            placeholder="Email"
            className="flex-1"
            required
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Name"
            className="flex-1"
            required
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
        </div>
        <Textarea
          rows={10}
          placeholder="Your Message"
          required
          value={contact.message}
          onChange={(e) => setContact({ ...contact, message: e.target.value })}
        />
        <Button loading={submitting} disabled={submitting}>
          Send
        </Button>
      </form>
    </Section>
  );
}
