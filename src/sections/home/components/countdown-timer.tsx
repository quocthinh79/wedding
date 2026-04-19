'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import type { WeddingConfigType } from '@/types';
import { useWeddingAudience } from '@/hooks/use-wedding-audience';

interface CountdownTimerProps {
  wedding: WeddingConfigType;
}

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const CountdownTimer = ({ wedding }: CountdownTimerProps) => {
  const audience = useWeddingAudience();

  const [groomTimeLeft, setGroomTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [brideTimeLeft, setBrideTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const calculateTimeLeft = (targetDate: Date): TimeLeft => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    };

    const updateCountdowns = () => {
      setGroomTimeLeft(calculateTimeLeft(wedding.events.groomDay.date));
      setBrideTimeLeft(calculateTimeLeft(wedding.events.brideDay.date));
    };

    updateCountdowns();

    const timer = setInterval(updateCountdowns, 1000);

    return () => clearInterval(timer);
  }, [wedding.events.brideDay.date, wedding.events.groomDay.date]);

  const visibleCountdowns = [
    audience !== 'groom'
      ? {
          key: 'bride',
          title: 'Ngày Nhà Gái',
          subtitle: 'Chủ nhật, 03/05/2026',
          timeLeft: brideTimeLeft,
          messageSuffix: 'tới lễ cưới nhà gái',
          delay: 0.2,
          accentClass: 'from-amber-400 to-orange-500',
        }
      : null,
    audience !== 'bride'
      ? {
          key: 'groom',
          title: 'Ngày Nhà Trai',
          subtitle: 'Chủ nhật, 10/05/2026',
          timeLeft: groomTimeLeft,
          messageSuffix: 'tới lễ cưới nhà trai',
          delay: 0.35,
          accentClass: 'from-rose-400 to-pink-500',
        }
      : null,
  ].filter(Boolean) as Array<{
    key: string;
    title: string;
    subtitle: string;
    timeLeft: TimeLeft;
    messageSuffix: string;
    delay: number;
    accentClass: string;
  }>;

  return (
    <div
      ref={ref}
      className='py-16 px-4 bg-gradient-to-br from-gray-50 to-rose-50/30'
    >
      <div className='max-w-7xl mx-auto text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className='mb-12'
        >
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800 mb-4'>
            Đếm Ngược Tới Ngày Vui
          </h2>
          <div className='w-24 h-px bg-rose-400 mx-auto mb-4'></div>
          <p className='text-gray-600 text-base sm:text-lg md:text-xl'>
            Từng khoảnh khắc đều đưa chúng tôi đến gần hơn với ngày tân hôn.
          </p>
        </motion.div>

        <div
          className={`grid gap-8 ${
            visibleCountdowns.length > 1
              ? 'lg:grid-cols-2'
              : 'max-w-3xl mx-auto'
          }`}
        >
          {visibleCountdowns.map((countdown) => (
            <CountdownCard
              key={countdown.key}
              title={countdown.title}
              subtitle={countdown.subtitle}
              timeLeft={countdown.timeLeft}
              messageSuffix={countdown.messageSuffix}
              inView={inView}
              delay={countdown.delay}
              accentClass={countdown.accentClass}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

type CountdownCardProps = {
  title: string;
  subtitle: string;
  timeLeft: TimeLeft;
  messageSuffix: string;
  inView: boolean;
  delay: number;
  accentClass: string;
};

const CountdownCard = ({
  title,
  subtitle,
  timeLeft,
  messageSuffix,
  inView,
  delay,
  accentClass,
}: CountdownCardProps) => {
  const timeUnits = [
    {
      label: 'Ngày',
      value: timeLeft.days,
      color: accentClass,
    },
    {
      label: 'Giờ',
      value: timeLeft.hours,
      color: 'from-purple-400 to-indigo-500',
    },
    {
      label: 'Phút',
      value: timeLeft.minutes,
      color: 'from-blue-400 to-cyan-500',
    },
    {
      label: 'Giây',
      value: timeLeft.seconds,
      color: 'from-emerald-400 to-teal-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
      transition={{ duration: 0.8, delay }}
      className='rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl backdrop-blur-sm'
    >
      <div className='mb-8 text-center'>
        <div
          className={`inline-flex rounded-full bg-gradient-to-r ${accentClass} px-5 py-2 text-sm font-semibold text-white shadow-lg`}
        >
          {title}
        </div>
        <p className='mt-4 text-sm sm:text-base text-gray-500'>{subtitle}</p>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
        {timeUnits.map((unit, index) => (
          <motion.div
            key={`${title}-${unit.label}`}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{
              opacity: inView ? 1 : 0,
              scale: inView ? 1 : 0.8,
              y: inView ? 0 : 50,
            }}
            transition={{
              duration: 0.6,
              delay: delay + index * 0.1 + 0.15,
              type: 'spring',
              stiffness: 100,
            }}
            className='relative group'
          >
            <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2'>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${unit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
              ></div>

              <div className='relative z-10'>
                <div
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-br ${unit.color} bg-clip-text text-transparent mb-2`}
                >
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className='text-gray-600 font-medium text-xs sm:text-sm md:text-base uppercase tracking-wider'>
                  {unit.label}
                </div>
              </div>

              <div
                className={`absolute top-0 right-0 w-8 h-8 bg-gradient-to-br ${unit.color} opacity-20 rounded-bl-full rounded-tr-2xl`}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        transition={{ duration: 0.8, delay: delay + 0.6 }}
        className='mt-10'
      >
        <div className='inline-block bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-md border border-white/40'>
          <p className='text-gray-700 font-medium text-sm sm:text-base md:text-lg'>
            {timeLeft.days > 0
              ? `${timeLeft.days} ngày nữa ${messageSuffix}`
              : timeLeft.hours > 0
                ? `${timeLeft.hours} giờ nữa ${messageSuffix}`
                : timeLeft.minutes > 0
                  ? `${timeLeft.minutes} phút nữa ${messageSuffix}`
                  : 'Khoảnh khắc hạnh phúc đã đến!'}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
