'use client';

import { getHomeFAQItems } from '@/lib/faq';
import FAQSection from './FAQSection';

export default function FAQ() {
  const homeFAQItems = getHomeFAQItems();

  return (
    <FAQSection
      items={homeFAQItems}
      showViewAllButton={true}
    />
  );
}

