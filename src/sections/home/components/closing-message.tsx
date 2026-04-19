'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

interface ClosingMessageProps {
  bride: string;
  groom: string;
}

export const ClosingMessage = ({ bride, groom }: ClosingMessageProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className='py-20 px-4 bg-gradient-to-br from-rose-100 to-pink-200'
    >
      <div className='max-w-4xl mx-auto text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className='mb-12'
        >
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-6'>
            Hẹn Gặp Quý Khách
          </h2>
          <div className='w-24 h-px bg-rose-500 mx-auto mb-8'></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/40 mb-12'
        >
          <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed mb-6 font-light'>
            &quot;Sự hiện diện của Quý Khách <br /> là niềm vinh hạnh cho gia
            đình chúng tôi!&quot;
          </p>
          <div className='text-base sm:text-lg text-gray-600'>
            Trân trọng kính mời,
          </div>
          <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-rose-600 mt-2'>
            {groom} & {bride}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='space-y-6'
        >
          <div className='flex justify-center space-x-4 text-2xl sm:text-3xl md:text-4xl'>
            <span className='animate-bounce'>💕</span>
            <span className='animate-bounce' style={{ animationDelay: '0.1s' }}>
              💖
            </span>
            <span className='animate-bounce' style={{ animationDelay: '0.2s' }}>
              💕
            </span>
          </div>

          <p className='text-sm sm:text-base text-gray-600'>
            #QuocThinhGiaiNhan #LeThanhHon #LeVuQuy #TramNamHanhPhuc
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='mt-16 pt-8 border-t border-white/40'
        >
          <p className='text-xs sm:text-sm text-gray-500'>
            Hân hạnh được đón tiếp Quý Khách trong ngày vui của gia đình.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
