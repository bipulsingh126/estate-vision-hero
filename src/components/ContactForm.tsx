import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { Label } from './ui/label';
import { useForm } from 'react-hook-form';

interface ContactFormProps {
  embedded?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ embedded = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    }
  });
  
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', data);
    toast.success('Thank you for your message. We will be in touch soon!');
    
    // Reset form
    reset();
    setIsSubmitting(false);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${embedded ? '' : 'max-w-lg mx-auto'}`}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Your name"
          {...register('name', { required: 'Name is required' })}
          className="mt-1"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{String(errors.name?.message)}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Your email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please enter a valid email'
            }
          })}
          className="mt-1"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{String(errors.email?.message)}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input
          id="phone"
          placeholder="Your phone number"
          {...register('phone')}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="How can we help you?"
          rows={5}
          {...register('message', { required: 'Message is required' })}
          className="mt-1"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{String(errors.message?.message)}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};

export default ContactForm;
