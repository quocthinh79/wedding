'use client';

import { motion } from 'motion/react';
import { formatWeddingTime } from '@/lib/wedding-utils';
import type { WeddingConfigType } from '@/types';
import { useWeddingAudience } from '@/hooks/use-wedding-audience';

interface WeddingDetailsCardProps {
  wedding: WeddingConfigType;
}

export const WeddingDetailsCard = ({ wedding }: WeddingDetailsCardProps) => {
  const audience = useWeddingAudience();
  const { venue, events, family } = wedding;

  const visibleWeddingDays = [
    audience !== 'bride'
      ? {
          key: 'groom',
          event: events.groomDay,
          delay: 0.2,
          gradientClass: 'from-white via-rose-50/30 to-pink-50/50',
          blurClass: 'from-rose-200/20 to-pink-200/20',
          badgeClass:
            'from-rose-500/10 to-pink-500/10 border-rose-200/50 text-rose-600',
          dayClass: 'from-rose-500 to-pink-600',
          monthClass: 'from-purple-500 to-indigo-600',
          timeClass: 'from-emerald-500 to-teal-600',
        }
      : null,
    audience !== 'groom'
      ? {
          key: 'bride',
          event: events.brideDay,
          delay: 0.3,
          gradientClass: 'from-white via-amber-50/40 to-orange-50/50',
          blurClass: 'from-amber-200/20 to-orange-200/20',
          badgeClass:
            'from-amber-500/10 to-orange-500/10 border-amber-200/50 text-amber-600',
          dayClass: 'from-rose-500 to-pink-600',
          monthClass: 'from-orange-500 to-amber-600',
          timeClass: 'from-emerald-500 to-teal-600',
        }
      : null,
  ].filter(Boolean) as Array<
    WeddingDayDetailsCardProps & {
      key: string;
    }
  >;

  const visibleFamilyCards = [
    {
      key: 'groom',
      title: 'Nhà Trai',
      father: family.groom.father,
      mother: family.groom.mother,
      address: family.groom.address,
    },
    {
      key: 'bride',
      title: 'Nhà Gái',
      father: family.bride.father,
      mother: family.bride.mother,
      address: family.bride.address,
    },
  ];

  const visibleEventSummaries = [
    audience !== 'bride'
      ? {
          key: 'groom',
          label: events.groomDay.label,
          venue: events.groomDay.venueName,
          address: events.groomDay.address,
          time: '10:00, Chủ nhật, 10/05/2026',
          lunarDate: events.groomDay.lunarDate,
        }
      : null,
    audience !== 'groom'
      ? {
          key: 'bride',
          label: events.brideDay.label,
          venue: events.brideDay.venueName,
          address: events.brideDay.address,
          time: '10:00, Chủ nhật, 03/05/2026',
          lunarDate: events.brideDay.lunarDate,
        }
      : null,
  ].filter(Boolean) as Array<EventSummaryCardProps & { key: string }>;

  const visibleVenueCards = [
    audience !== 'bride'
      ? {
          key: 'groom',
          icon: '⛪',
          title: 'Ngày Nhà Trai',
          venue: venue.ceremony.name,
          address: venue.ceremony.address,
          time: venue.ceremony.time,
          mapUrl: events.groomDay.mapUrl,
          colorClass: 'from-purple-500 to-indigo-500',
          accentClass: 'bg-purple-600',
        }
      : null,
    audience !== 'groom'
      ? {
          key: 'bride',
          icon: '🎉',
          title: 'Ngày Nhà Gái',
          venue: venue.reception.name,
          address: venue.reception.address,
          time: venue.reception.time,
          mapUrl: events.brideDay.mapUrl,
          colorClass: 'from-emerald-500 to-teal-500',
          accentClass: 'bg-emerald-600',
        }
      : null,
  ].filter(Boolean) as Array<VenueCardProps & { key: string }>;

  return (
    <div className='py-20 bg-gradient-to-br from-white to-rose-50/50'>
      <div className='max-w-6xl mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4'>
            Thông Tin Thiệp Cưới
          </h2>
          <div className='w-24 h-px bg-rose-400 mx-auto mb-6'></div>
          <p className='text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto'>
            Trân trọng báo tin lễ cưới của chúng tôi và kính mời Quý Khách đến
            chung vui.
          </p>
        </motion.div>

        <div className='space-y-8 mb-12'>
          {visibleWeddingDays.map(({ key, ...card }) => (
            <WeddingDayDetailsCard key={key} {...card} />
          ))}
        </div>

        <div
          className={`grid gap-6 mb-12 ${
            visibleFamilyCards.length > 1 ? 'md:grid-cols-2' : ''
          }`}
        >
          {visibleFamilyCards.map(({ key, ...card }) => (
            <FamilyCard key={key} {...card} />
          ))}
        </div>

        <div
          className={`grid gap-6 mb-12 ${
            visibleEventSummaries.length > 1 ? 'md:grid-cols-2' : ''
          }`}
        >
          {visibleEventSummaries.map(({ key, ...card }) => (
            <EventSummaryCard key={key} {...card} />
          ))}
        </div>

        <div
          className={`grid gap-8 ${
            visibleVenueCards.length > 1 ? 'md:grid-cols-2' : ''
          }`}
        >
          {visibleVenueCards.map(({ key, ...card }) => (
            <VenueCard key={key} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

type FamilyCardProps = {
  title: string;
  father: string;
  mother: string;
  address: string;
};

type WeddingDayDetailsCardProps = {
  event: WeddingConfigType['events']['groomDay'];
  delay: number;
  gradientClass: string;
  blurClass: string;
  badgeClass: string;
  dayClass: string;
  monthClass: string;
  timeClass: string;
};

const WeddingDayDetailsCard = ({
  event,
  delay,
  gradientClass,
  blurClass,
  badgeClass,
  dayClass,
  monthClass,
  timeClass,
}: WeddingDayDetailsCardProps) => {
  const locale = 'vi-VN';
  const eventDate = event.date;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`relative bg-gradient-to-br ${gradientClass} rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 border border-rose-100/50 overflow-hidden group`}
    >
      <div
        className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${blurClass} rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500`}
      ></div>
      <div
        className={`absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br ${blurClass} rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500`}
      ></div>

      <div className='relative z-10'>
        <div className='text-center mb-8'>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay + 0.1 }}
            className={`inline-flex items-center gap-3 bg-gradient-to-r ${badgeClass} backdrop-blur-sm rounded-full px-6 py-3 mb-6 border`}
          >
            <span className='text-2xl'>💕</span>
            <span className='text-sm sm:text-base font-semibold tracking-wide uppercase'>
              {event.label}
            </span>
          </motion.div>
        </div>

        <div className='flex flex-col sm:flex-row items-stretch justify-center gap-6 sm:gap-8 md:gap-12 mb-8'>
          <DateStatCard
            value={String(
              Number(eventDate.getDate()).toString().padStart(2, '0'),
            )}
            label='Ngày'
            gradientClass={dayClass}
            delay={delay + 0.2}
          />
          <DateStatCard
            value={`${eventDate
              .toLocaleDateString(locale, { month: 'short' })
              .toUpperCase()}\n${eventDate.getFullYear()}`}
            label='Tháng & Năm'
            gradientClass={monthClass}
            delay={delay + 0.3}
            multiline
          />
          <DateStatCard
            value={formatWeddingTime(eventDate, locale)}
            label='Giờ'
            gradientClass={timeClass}
            delay={delay + 0.4}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
          className='text-center mb-8 px-2'
        >
          <div className='relative inline-block w-full max-w-sm sm:max-w-md md:max-w-lg bg-gradient-to-r from-white/90 via-rose-50/80 to-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 shadow-xl border border-rose-100/50'>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3'>
              <span className='text-xl sm:text-2xl md:text-3xl'>🗓️</span>
              <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif text-gray-800 font-bold text-center leading-tight'>
                {eventDate.toLocaleDateString(locale, { weekday: 'long' })}
              </p>
              <span className='text-xl sm:text-2xl md:text-3xl'>🗓️</span>
            </div>
            <div className='w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-3'></div>
            <p className='text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-medium'>
              {eventDate.toLocaleDateString(locale, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <p className='text-xs sm:text-sm md:text-base text-rose-600 font-semibold mt-2'>
              {event.lunarDate}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

type DateStatCardProps = {
  value: string;
  label: string;
  gradientClass: string;
  delay: number;
  multiline?: boolean;
};

const DateStatCard = ({
  value,
  label,
  gradientClass,
  delay,
  multiline = false,
}: DateStatCardProps) => {
  const [primary, secondary] = value.split('\n');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className='text-center group-hover:scale-105 transition-transform duration-300 flex-1 sm:flex-none'
    >
      <div
        className={`bg-gradient-to-br ${gradientClass} text-white rounded-2xl p-4 sm:p-6 shadow-lg mb-2 h-24 sm:h-28 md:h-32 lg:h-36 flex flex-col items-center justify-center min-w-[100px] sm:min-w-[120px] md:min-w-[140px]`}
      >
        <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none'>
          {multiline ? primary : value}
        </div>
        {multiline ? (
          <div className='text-sm sm:text-base md:text-lg font-medium opacity-90 mt-2'>
            {secondary}
          </div>
        ) : null}
      </div>
      <p className='text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mt-3'>
        {label}
      </p>
    </motion.div>
  );
};

const FamilyCard = ({ title, father, mother, address }: FamilyCardProps) => (
  <div className='bg-white rounded-3xl shadow-xl p-8 border border-gray-100'>
    <h3 className='text-2xl font-serif text-gray-800 mb-4'>{title}</h3>
    <p className='text-gray-700'>
      Ông: <strong>{father}</strong>
    </p>
    <p className='text-gray-700'>
      Bà: <strong>{mother}</strong>
    </p>
    <p className='text-gray-600 mt-3'>{address}</p>
  </div>
);

type EventSummaryCardProps = {
  label: string;
  venue: string;
  address: string;
  time: string;
  lunarDate: string;
};

const EventSummaryCard = ({
  label,
  venue,
  address,
  time,
  lunarDate,
}: EventSummaryCardProps) => (
  <div
    className='bg-white rounded-3xl shadow-xl p-8 border border-rose-100'
    style={{ height: 'stretch' }}
  >
    <p className='text-sm font-semibold uppercase tracking-[0.24em] text-rose-500 mb-3'>
      {label}
    </p>
    <h3 className='text-2xl font-serif text-gray-800 mb-2'>{venue}</h3>
    <p className='text-gray-600 mb-2 h-[50px]'>{address}</p>
    <p className='text-gray-700 font-medium'>{time}</p>
    <p className='text-sm text-rose-600 mt-2'>{lunarDate}</p>
  </div>
);

type VenueCardProps = {
  icon: string;
  title: string;
  venue: string;
  address: string;
  time: string;
  mapUrl: string;
  colorClass: string;
  accentClass: string;
};

const VenueCard = ({
  icon,
  title,
  venue,
  address,
  time,
  mapUrl,
  colorClass,
  accentClass,
}: VenueCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className='bg-white rounded-3xl shadow-xl p-8 border border-gray-100 group hover:shadow-2xl transition-all duration-300'
    style={{ height: 'stretch' }}
  >
    <div className='text-center mb-6'>
      <div
        className={`inline-block rounded-full p-4 mb-4 text-white ${accentClass} group-hover:scale-110 transition-transform duration-300`}
      >
        <div className='text-4xl'>{icon}</div>
      </div>
      <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2'>
        {title}
      </h3>
      <div className='w-16 h-px bg-rose-400 mx-auto'></div>
    </div>

    <div className='space-y-4 text-center'>
      <div>
        <h4 className='font-semibold text-gray-800 mb-1 text-sm sm:text-base'>
          {venue}
        </h4>
        <p className='text-gray-600 text-xs sm:text-sm h-[50px]'>{address}</p>
      </div>

      <div className='bg-gray-50 rounded-xl p-4'>
        <p className='font-medium text-gray-800 text-sm sm:text-base'>
          Thời gian
        </p>
        <p className='text-rose-600 font-semibold text-sm sm:text-base'>
          {time}
        </p>
      </div>

      <motion.a
        href={mapUrl}
        target='_blank'
        rel='noopener noreferrer'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`inline-flex items-center gap-2 bg-gradient-to-r ${colorClass} text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300`}
      >
        📍 Xem Bản Đồ
      </motion.a>
    </div>
  </motion.div>
);
