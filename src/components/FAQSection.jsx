import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQSection() {
  return (
    <section className="mb-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold">
          Frequently Asked{' '}
          <span className="underline underline-offset-4">Questions</span>
          <span className="text-clr-primary">.</span>
        </h2>
        <p className="text-lg mt-8">
          Have questions about Delibox? Find the answers below.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto mt-12">
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// FAQ Data
const faqs = [
  {
    question: 'How does Delibox work?',
    answer:
      "Delibox allows you to book parcel deliveries with ease. Simply enter pickup and delivery details, and we'll handle the rest.",
  },
  {
    question: 'What types of parcels can I send?',
    answer:
      'You can send a variety of items, including gifts, documents, packages, accessories, and electronics.',
  },
  {
    question: 'How do I track my delivery?',
    answer:
      "Once your parcel is booked, you'll receive a tracking link to monitor its real-time status.",
  },
  {
    question: 'Are my parcels insured?',
    answer:
      'Yes, we provide insurance coverage for valuable parcels to ensure their safety during transit.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept credit/debit cards, mobile payments, and online transfers.',
  },
];
