'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useWeddingAudience } from '@/hooks/use-wedding-audience';

interface VenueInformationProps {
  wedding: WeddingConfigType;
}

export const VenueInformation = ({ wedding }: VenueInformationProps) => {
  const audience = useWeddingAudience();
  const { venue, events, family } = wedding;

  const visibleLocations = [
    audience !== 'bride'
      ? {
          key: 'groom',
          title: 'Ngày Nhà Trai',
          icon: '🏡',
          venue: venue.ceremony.name,
          address: venue.ceremony.address,
          time: venue.ceremony.time,
          lunarDate: events.groomDay.lunarDate,
          familyLabel: 'Thông tin nhà trai',
          familyAddress: family.groom.address,
          father: family.groom.father,
          mother: family.groom.mother,
          mapUrl: events.groomDay.mapUrl,
          buttonLabel: 'Vị Trí Đãi Tiệc Nhà Trai',
          panelClass: 'from-purple-50 to-indigo-50 border-purple-100',
          iconClass: 'from-purple-400 to-indigo-500',
          buttonClass:
            'from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600',
        }
      : null,
    audience !== 'groom'
      ? {
          key: 'bride',
          title: 'Ngày Nhà Gái',
          icon: '🥂',
          venue: venue.reception.name,
          address: venue.reception.address,
          time: venue.reception.time,
          lunarDate: events.brideDay.lunarDate,
          familyLabel: 'Thông tin nhà gái',
          familyAddress: family.bride.address,
          father: family.bride.father,
          mother: family.bride.mother,
          mapUrl: events.brideDay.mapUrl,
          buttonLabel: 'Vị Trí Đãi Tiệc Nhà Gái',
          panelClass: 'from-amber-50 to-orange-50 border-amber-100',
          iconClass: 'from-amber-400 to-orange-500',
          buttonClass:
            'from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600',
        }
      : null,
  ].filter(Boolean) as Array<LocationPanelProps & { key: string }>;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className='py-20 px-4 bg-white'>
      <div className='max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4'>
            Địa Điểm Tổ Chức
          </h2>
          <div className='w-24 h-px bg-rose-400 mx-auto'></div>
          <p className='text-base sm:text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto'>
            Thân mời Quý Khách đến tham dự hai ngày vui của gia đình chúng tôi
            tại TP. HCM và Đồng Nai.
          </p>
        </motion.div>

        <div
          className={`grid grid-cols-1 gap-12 ${
            visibleLocations.length > 1 ? 'lg:grid-cols-2' : 'max-w-3xl mx-auto'
          }`}
        >
          {visibleLocations.map(({ key, ...location }) => (
            <LocationPanel key={key} {...location} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='mt-16 text-center'
        >
          <div className='bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 max-w-3xl mx-auto border border-rose-100'>
            <h4 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center'>
              <span className='mr-2'>💌</span>
              Lời Mời
            </h4>
            <p className='text-gray-600 mb-4 text-sm sm:text-base'>
              Trân trọng báo tin lễ cưới của chúng tôi.
            </p>
            <div className='grid grid-cols-1 gap-4 text-xs sm:text-sm text-gray-600'>
              <div className='bg-white/50 rounded-lg p-4'>
                <p className='font-medium'>Trân trọng kính mời: Quý khách</p>
                <p>
                  Sự hiện diện của Quý Khách là niềm vinh hạnh cho gia đình
                  chúng tôi!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

type LocationPanelProps = {
  title: string;
  icon: string;
  venue: string;
  address: string;
  time: string;
  lunarDate: string;
  familyLabel: string;
  familyAddress: string;
  father: string;
  mother: string;
  mapUrl: string;
  buttonLabel: string;
  panelClass: string;
  iconClass: string;
  buttonClass: string;
};

const LocationPanel = ({
  title,
  icon,
  venue,
  address,
  time,
  lunarDate,
  familyLabel,
  familyAddress,
  father,
  mother,
  mapUrl,
  buttonLabel,
  panelClass,
  iconClass,
  buttonClass,
}: LocationPanelProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className={`bg-gradient-to-br ${panelClass} rounded-3xl p-8 shadow-lg border`}
  >
    <div className='text-center mb-8'>
      <div
        className={`w-20 h-20 bg-gradient-to-br ${iconClass} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
      >
        <span className='text-white text-3xl'>{icon}</span>
      </div>
      <h3 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 mb-2'>
        {title}
      </h3>
      <div className='w-16 h-px bg-rose-400 mx-auto'></div>
    </div>

    <div className='space-y-6'>
      <div className='text-center'>
        <h4 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2'>
          {venue}
        </h4>
        <p className='text-sm sm:text-base md:text-lg text-gray-600 mb-4 h-[56px]'>
          {address}
        </p>
        <div className='inline-block bg-white/60 rounded-lg px-4 py-2 shadow-sm'>
          <p className='font-medium text-sm sm:text-base text-gray-800'>
            📅 {time}
          </p>
          <p className='mt-2 text-xs sm:text-sm text-gray-600'>{lunarDate}</p>
        </div>
      </div>

      <div className='bg-white/50 rounded-2xl p-6 space-y-4'>
        <h5 className='font-semibold text-gray-800 mb-3 text-sm sm:text-base'>
          {familyLabel}
        </h5>
        <div className='space-y-2 text-xs sm:text-sm text-gray-600'>
          <p>• Vui lòng đến trước giờ cử hành 15 phút</p>
          <p>• Địa chỉ: {familyAddress}</p>
          <p>• Ông: {father}</p>
          <p>• Bà: {mother}</p>
        </div>
      </div>

      <button
        onClick={() => window.open(mapUrl, '_blank')}
        className={`w-full bg-gradient-to-r ${buttonClass} text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base cursor-pointer`}
      >
        {buttonLabel}
      </button>
    </div>
  </motion.div>
);
