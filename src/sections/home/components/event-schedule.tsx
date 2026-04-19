'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useWeddingAudience } from '@/hooks/use-wedding-audience';

interface EventScheduleProps {
  wedding: WeddingConfigType;
}

export const EventSchedule = ({ wedding }: EventScheduleProps) => {
  const audience = useWeddingAudience();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const scheduleItems = [
    audience !== 'groom'
      ? {
          time: '03/05/2026 - 10:00',
          event: 'Lễ Vu Quy Nhà Gái',
          description: wedding.events.brideDay.lunarDate,
        }
      : null,
    audience !== 'groom'
      ? {
          time: '03/05/2026 - 11:00',
          event: wedding.events.brideDay.partyName,
          description: wedding.events.brideDay.address,
        }
      : null,
    audience !== 'bride'
      ? {
          time: '10/05/2026 - 10:00',
          event: 'Lễ Tân Hôn Nhà Trai',
          description: wedding.events.groomDay.lunarDate,
        }
      : null,
    audience !== 'bride'
      ? {
          time: '10/05/2026 - 11:00',
          event: wedding.events.groomDay.partyName,
          description: wedding.events.groomDay.address,
        }
      : null,
  ].filter(Boolean) as Array<{
    time: string;
    event: string;
    description: string;
  }>;

  return (
    <div
      ref={ref}
      className='py-16 px-4 bg-gradient-to-b from-white to-gray-50'
    >
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-12'
        >
          <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800 mb-4'>
            Lịch Trình Hôn Lễ
          </h3>
          <div className='w-20 h-px bg-rose-400 mx-auto'></div>
        </motion.div>

        <div className='relative'>
          {/* Timeline line */}
          <div className='absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-rose-200'></div>

          <div className='space-y-8'>
            {scheduleItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
              >
                {/* Timeline dot */}
                <div className='absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-rose-400 rounded-full border-4 border-white shadow-lg z-10'></div>

                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0
                      ? 'md:text-right md:pr-8'
                      : 'md:text-left md:pl-8'
                  } pl-12 md:pl-0`}
                >
                  <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100'>
                    <div className='flex items-center mb-2'>
                      <span className='bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium'>
                        {item.time}
                      </span>
                    </div>
                    <h4 className='text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1'>
                      {item.event}
                    </h4>
                    <p className='text-gray-600 text-xs sm:text-sm md:text-base'>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
