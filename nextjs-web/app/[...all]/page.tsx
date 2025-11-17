import { notFound } from 'next/navigation';

export default function FallbackNotImplemented() {
  notFound();
  return null;
}
