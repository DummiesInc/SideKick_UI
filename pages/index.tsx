import Image from 'next/image';
import { Geist, Geist_Mono } from 'next/font/google';
import { CustomerQuestionnaireForm } from '@/src/components/Questionnaire/QuestionnaireForm';

export default function Home() {
  return (

    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm max-w-xl">
      <h5
      className="text-2xl font-bold tracking-tight text-gray-900 mb-4"
      >
        Franchise Questionnaire
      </h5>

      <p
      className="tracking-tight text-gray-900 mb-4"
      >
        Please answer the following assessments so we can find you the perfect franchise
      </p>
      <CustomerQuestionnaireForm /> 
    </div>
  )
}
