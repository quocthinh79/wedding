'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'sonner';

export const RSVP = () => {
  const initialFormData = {
    name: '',
    email: '',
    attendance: '',
    guests: '1',
    dietaryRestrictions: '',
    message: '',
  };

  const [formData, setFormData] = useState({
    ...initialFormData,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as {
        success: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Không thể gửi xác nhận lúc này.');
      }

      setIsSubmitted(true);
      setFormData(initialFormData);
      toast.success('Đã gửi xác nhận tham dự thành công.');

      setIsSubmitted(false);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Không thể gửi xác nhận lúc này.';

      setSubmitError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <div className='py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-100'>
        <div className='max-w-2xl mx-auto text-center'>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='bg-white rounded-3xl p-12 shadow-xl border border-rose-100'
          >
            <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <span className='text-4xl'>✅</span>
            </div>
            <h3 className='text-2xl sm:text-3xl md:text-4xl font-serif text-gray-800 mb-4'>
              Cảm ơn Quý Khách
            </h3>
            <p className='text-gray-600 text-base sm:text-lg md:text-xl'>
              Thông tin xác nhận đã được ghi nhận. Hẹn gặp Quý Khách trong ngày
              vui của chúng tôi!
            </p>
            <div className='mt-6 text-2xl'>💕</div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className='py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-100'
    >
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-12'
        >
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4'>
            Xác Nhận Tham Dự
          </h2>
          <div className='w-24 h-px bg-rose-400 mx-auto mb-6'></div>
          <p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto'>
            Quý Khách vui lòng để lại thông tin để gia đình chúng tôi chuẩn bị
            chu đáo hơn.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 gap-12'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className='bg-white rounded-3xl p-8 shadow-xl border border-rose-100'>
              <h3 className='text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 mb-6 text-center'>
                Thông Tin Khách Mời
              </h3>

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-xs sm:text-sm font-medium text-gray-700 mb-2'
                  >
                    Họ và tên *
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300'
                    placeholder='Họ và tên'
                  />
                </div>

                <div>
                  <label
                    htmlFor='attendance'
                    className='block text-xs sm:text-sm font-medium text-gray-700 mb-2'
                  >
                    Quý Khách có tham dự không? *
                  </label>
                  <select
                    id='attendance'
                    name='attendance'
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300'
                  >
                    <option value=''>Vui lòng chọn</option>
                    <option value='yes'>Có, tôi sẽ tham dự</option>
                    <option value='no'>Xin lỗi, tôi không thể tham dự</option>
                  </select>
                </div>

                {formData.attendance === 'yes' && (
                  <div>
                    <label
                      htmlFor='guests'
                      className='block text-xs sm:text-sm font-medium text-gray-700 mb-2'
                    >
                      Số lượng khách
                    </label>
                    <select
                      id='guests'
                      name='guests'
                      value={formData.guests}
                      onChange={handleChange}
                      className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300'
                    >
                      <option value='1'>1 Khách</option>
                      <option value='2'>2 Khách</option>
                      <option value='3'>3 Khách</option>
                      <option value='4'>4 Khách</option>
                    </select>
                  </div>
                )}

                {formData.attendance === 'yes' && (
                  <div>
                    <label
                      htmlFor='dietaryRestrictions'
                      className='block text-xs sm:text-sm font-medium text-gray-700 mb-2'
                    >
                      Ghi chú thêm
                    </label>
                    <input
                      type='text'
                      id='dietaryRestrictions'
                      name='dietaryRestrictions'
                      value={formData.dietaryRestrictions}
                      onChange={handleChange}
                      className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300'
                      placeholder='Ví dụ: đi cùng gia đình, đến trễ...'
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor='message'
                    className='block text-xs sm:text-sm font-medium text-gray-700 mb-2'
                  >
                    Lời chúc dành cho cô dâu chú rể
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300 resize-none'
                    placeholder='Để lại lời chúc của bạn...'
                  />
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-4 px-6 rounded-xl font-medium text-base sm:text-lg hover:from-rose-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70 disabled:transform-none'
                >
                  {isSubmitting ? 'Đang gửi...' : 'Gửi Xác Nhận'}
                </button>

                {submitError ? (
                  <p className='rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600'>
                    {submitError}
                  </p>
                ) : null}
              </form>
            </div>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-rose-600 text-xl">⏰</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    Thời gian phản hồi
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Trước ngày 01/05/2026
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">
                Quý Khách vui lòng xác nhận sớm để gia đình chúng tôi chuẩn bị chu đáo cho buổi tiệc.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-xl">📞</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    Liên hệ
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Nếu cần hỗ trợ thêm thông tin
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <p>👰 Cô dâu: Đống Giai Nhân</p>
                <p>🤵 Chú rể: Lê Quốc Thịnh</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 shadow-lg border border-amber-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-amber-600 text-xl">💝</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    Lời nhắn
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Sự hiện diện của Quý Khách là món quà quý giá nhất
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">
                Gia đình chúng tôi chân thành cảm ơn và rất mong được đón tiếp Quý Khách trong ngày vui.
              </p>
            </div>
          </motion.div> */}
        </div>
      </div>
    </div>
  );
};
