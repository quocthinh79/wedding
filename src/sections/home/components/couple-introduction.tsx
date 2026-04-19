'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface CoupleIntroductionProps {
  bride: WeddingConfigType['bride'];
  groom: WeddingConfigType['groom'];
  isVisible: boolean;
}

export const CoupleIntroduction = ({
  bride,
  groom,
}: CoupleIntroductionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className='py-20 px-4 bg-gradient-to-b from-white to-rose-50/30'
    >
      <div className='max-w-6xl mx-auto'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4'>
            Cô Dâu & Chú Rể
          </h2>
          <div className='w-24 h-px bg-rose-400 mx-auto'></div>
          <p className='text-base sm:text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto'>
            Hân hoan giới thiệu hai nhân vật chính trong ngày vui trọng đại của
            gia đình chúng tôi.
          </p>
        </motion.div>

        {/* Couple Cards */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-center lg:text-right'
          >
            <div className='relative inline-block mb-6'>
              <div className='w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gradient-to-br from-rose-100 to-pink-200 rounded-full flex items-center justify-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl shadow-2xl border-8 border-white'>
                <Image
                  src={bride.photo}
                  alt={`${bride.fullName}'s photo`}
                  width={256}
                  height={256}
                  className='rounded-full object-cover'
                  loading='lazy'
                />
              </div>
              <div className='absolute -bottom-4 -right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-rose-400 rounded-full flex items-center justify-center shadow-lg'>
                <span className='text-white text-xl sm:text-2xl'>👸</span>
              </div>
            </div>

            <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800 mb-2'>
              {bride.fullName}
            </h3>
            <p className='text-base sm:text-lg md:text-xl text-rose-600 mb-4 font-medium'>
              Cô Dâu
            </p>
            <p className='text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0 lg:ml-auto'>
              Trưởng nữ của <br /> ông <strong>Đống Văn Điểu</strong> và bà{' '}
              <strong>Mai Ngọc Hiền</strong>, <br /> hiện đang sinh sống tại
              Đồng Nai.
            </p>

            {/* Decorative Elements */}
            <div className='mt-6 flex justify-center lg:justify-end space-x-2'>
              <div className='w-2 h-2 bg-rose-300 rounded-full'></div>
              <div className='w-2 h-2 bg-rose-400 rounded-full'></div>
              <div className='w-2 h-2 bg-rose-500 rounded-full'></div>
            </div>
          </motion.div>

          {/* Heart Divider (Desktop) */}
          <div className='hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: inView ? 1 : 0, rotate: inView ? 0 : -180 }}
              transition={{ duration: 1, delay: 0.5 }}
              className='w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-rose-100'
            >
              <span className='text-xl sm:text-2xl md:text-3xl animate-pulse'>
                💖
              </span>
            </motion.div>
          </div>

          {/* Heart Divider (Mobile) */}
          <div className='lg:hidden flex justify-center -my-6 z-10'>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: inView ? 1 : 0, rotate: inView ? 0 : -180 }}
              transition={{ duration: 1, delay: 0.5 }}
              className='w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-rose-100'
            >
              <span className='text-lg sm:text-xl md:text-2xl animate-pulse'>
                💖
              </span>
            </motion.div>
          </div>

          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-center lg:text-left'
          >
            <div className='relative inline-block mb-6'>
              <div className='w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl shadow-2xl border-8 border-white'>
                <Image
                  src={groom.photo}
                  alt={`${groom.fullName}'s photo`}
                  width={256}
                  height={256}
                  className='rounded-full object-cover'
                />
              </div>
              <div className='absolute -bottom-4 -left-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-400 rounded-full flex items-center justify-center shadow-lg'>
                <span className='text-white text-xl sm:text-2xl'>🤴</span>
              </div>
            </div>

            <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800 mb-2'>
              {groom.fullName}
            </h3>
            <p className='text-base sm:text-lg md:text-xl text-blue-600 mb-4 font-medium'>
              Chú Rể
            </p>
            <p className='text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0'>
              Trưởng nam của <br /> ông <strong>Lê Văn Minh</strong> và bà{' '}
              <strong>Võ Thị Hồng Liên</strong>, <br /> hiện đang sinh sống tại
              TP. HCM.
            </p>

            {/* Decorative Elements */}
            <div className='mt-6 flex justify-center lg:justify-start space-x-2'>
              <div className='w-2 h-2 bg-blue-300 rounded-full'></div>
              <div className='w-2 h-2 bg-blue-400 rounded-full'></div>
              <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
            </div>
          </motion.div>
        </div>

        {/* Love Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='text-center mt-16'
        >
          <div className='bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg border border-white/40'>
            <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-700 italic mb-4'>
              Trăm năm tình viên mãn, <br /> bạc đầu nghĩa phu thê.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
