'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

type GalleryTemplate = {
  category: string;
  emoji: string;
  accentClass: string;
  src?: string;
};

type GalleryImage = GalleryTemplate & {
  id: number;
};

const VISIBLE_IMAGE_COUNT = 6;

const GALLERY_IMAGE_FILES = [
  'DSC03579.jpg',
  'DSC03601.jpg',
  'DSC03645.jpg',
  'DSC03653.jpg',
  'DSC03690.jpg',
  'DSC03709.jpg',
  'DSC03725.jpg',
  'DSC03764.jpg',
  'DSC03776.jpg',
  'DSC03857.jpg',
  'DSC03888.jpg',
  'DSC04179.jpg',
  'DSC04441.jpg',
  'DSC04465.jpg',
  'DSC04589.jpg',
  'DSC04655.jpg',
  'DSC04701.jpg',
  'DSC04755.jpg',
  'DSC04863.jpg',
  'DSC04912.jpg',
  'DSC04967.jpg',
  'DSC05021.jpg',
  'DSC05089.jpg',
  'DSC05131.jpg',
  'DSC05226.jpg',
  'DSC05243.jpg',
  'DSC05247.jpg',
  'DSC05257.jpg',
  'DSC05314.jpg',
  'DSC05375.jpg',
  'DSC05401.jpg',
  'DSC05417.jpg',
] as const;

const TOTAL_IMAGE_COUNT = GALLERY_IMAGE_FILES.length;

export const GalleryPreview = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const galleryTemplates: GalleryTemplate[] = [
    {
      category: 'engagement',
      emoji: '💕',
      accentClass: 'from-rose-100 via-pink-100 to-orange-50',
    },
    {
      category: 'travel',
      emoji: '✈️',
      accentClass: 'from-sky-100 via-cyan-100 to-blue-50',
    },
    {
      category: 'date',
      emoji: '🌹',
      accentClass: 'from-amber-50 via-rose-100 to-pink-100',
    },
    {
      category: 'proposal',
      emoji: '💍',
      accentClass: 'from-yellow-50 via-amber-100 to-rose-100',
    },
    {
      category: 'family',
      emoji: '👨‍👩‍👧‍👦',
      accentClass: 'from-emerald-50 via-lime-100 to-yellow-50',
    },
    {
      category: 'friends',
      emoji: '🎉',
      accentClass: 'from-fuchsia-100 via-rose-100 to-orange-50',
    },
  ];

  const galleryImages: GalleryImage[] = Array.from(
    { length: TOTAL_IMAGE_COUNT },
    (_, index) => {
      const template = galleryTemplates[index % galleryTemplates.length];

      return {
        id: index + 1,
        ...template,
        src: `/assets/images/wedding-images/${GALLERY_IMAGE_FILES[index]}`,
      };
    },
  );

  const visibleImages = galleryImages.slice(0, VISIBLE_IMAGE_COUNT);

  const activeImage =
    activeImageIndex !== null ? galleryImages[activeImageIndex] : null;

  const closePreview = () => setActiveImageIndex(null);

  const openPreview = (index: number) => setActiveImageIndex(index);

  const openGallery = () => {
    setIsGalleryOpen(true);
  };

  const closeGallery = () => setIsGalleryOpen(false);

  useEffect(() => {
    if (!activeImage && !isGalleryOpen) {
      document.body.style.overflow = '';

      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      if (activeImage) {
        closePreview();

        return;
      }

      closeGallery();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [activeImage, isGalleryOpen]);

  return (
    <div
      ref={ref}
      className='py-20 px-4 bg-gradient-to-br from-gray-50 to-rose-50'
    >
      <div className='max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4'>
            Album Ảnh Cưới
          </h2>
          <div className='w-24 h-px bg-rose-400 mx-auto mb-6'></div>
        </motion.div>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
          {visibleImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className='h-full'
            >
              <button
                type='button'
                onClick={() => openPreview(index)}
                className='group relative aspect-[2/3] w-full overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-lg transition-all duration-300 hover:shadow-xl'
                aria-label={`Preview`}
              >
                <GalleryCardImage image={image} />
                <div className='absolute right-3 top-3 rounded-full bg-white/80 px-3 py-2 text-lg opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100'>
                  {image.emoji}
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className='mt-12 text-center'
        >
          <p className='mb-4 text-sm text-gray-500 sm:text-base'>
            {VISIBLE_IMAGE_COUNT} / {TOTAL_IMAGE_COUNT} ảnh đang hiển thị
          </p>
          <button
            type='button'
            onClick={() => openGallery()}
            className='group rounded-full border border-gray-200 bg-white px-8 py-3 text-sm font-medium text-gray-700 shadow-lg transition-all duration-300 hover:border-rose-300 hover:shadow-xl sm:text-base'
          >
            <span className='flex items-center space-x-2'>
              <span>Xem Toàn Bộ Album</span>
              <span className='transition-transform duration-300 group-hover:translate-x-1'>
                📸
              </span>
            </span>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm'
            onClick={closePreview}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25 }}
              className='relative w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl'
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type='button'
                onClick={closePreview}
                className='absolute right-4 top-4 z-10 rounded-full bg-black/50 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-black/70'
                aria-label='Đóng'
              >
                Đóng
              </button>

              <div className='relative aspect-[2/3] w-full overflow-hidden'>
                <GalleryCardImage image={activeImage} isPriority />
              </div>

              <div className='space-y-4 p-6 sm:p-8'>
                <div className='flex items-center justify-between gap-3'>
                  <span className='inline-flex items-center justify-center rounded-full bg-rose-100 px-4 py-2 text-lg text-rose-700'>
                    {activeImage.emoji}
                  </span>
                  <p className='text-sm text-gray-500'>
                    {activeImage.id} / {TOTAL_IMAGE_COUNT}
                  </p>
                </div>
                <div className='flex flex-wrap gap-3'>
                  <button
                    type='button'
                    onClick={() =>
                      openPreview(
                        activeImageIndex === 0
                          ? TOTAL_IMAGE_COUNT - 1
                          : Number(activeImageIndex) - 1,
                      )
                    }
                    className='rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-rose-300 hover:text-rose-600'
                  >
                    Trước
                  </button>
                  <button
                    type='button'
                    onClick={() =>
                      openPreview(
                        activeImageIndex === TOTAL_IMAGE_COUNT - 1
                          ? 0
                          : Number(activeImageIndex) + 1,
                      )
                    }
                    className='rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-rose-300 hover:text-rose-600'
                  >
                    Sau
                  </button>
                  <button
                    type='button'
                    onClick={() => {
                      setIsGalleryOpen(true);
                      closePreview();
                    }}
                    className='rounded-full bg-rose-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-600'
                  >
                    Xem Toàn Bộ Album
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isGalleryOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-40 bg-black/70 px-4 pt-30 pb-10 backdrop-blur-sm'
            onClick={closeGallery}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className='mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl'
              onClick={(event) => event.stopPropagation()}
            >
              <div className='flex items-center justify-between gap-4 border-b border-rose-100 px-6 py-5'>
                <div>
                  <h3 className='text-2xl font-serif text-gray-800'>
                    Toàn Bộ Album Ảnh
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    {TOTAL_IMAGE_COUNT} khoảnh khắc để xem lại
                  </p>
                </div>

                <button
                  type='button'
                  onClick={closeGallery}
                  className='rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-rose-300 hover:text-rose-600'
                >
                  Đóng
                </button>
              </div>

              <div className='overflow-y-auto px-6 py-6'>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                  {galleryImages.map((image, index) => (
                    <button
                      key={image.id}
                      type='button'
                      onClick={() => {
                        openPreview(index);
                      }}
                      className='group text-left'
                    >
                      <div className='relative aspect-[2/3] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg'>
                        <GalleryCardImage image={image} />
                        <div className='absolute right-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-gray-600 backdrop-blur-sm'>
                          {String(image.id).padStart(2, '0')}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

type GalleryCardImageProps = {
  image: GalleryImage;
  isPriority?: boolean;
};

const GalleryCardImage = ({
  image,
  isPriority = false,
}: GalleryCardImageProps) => {
  if (image.src) {
    return (
      <Image
        src={image.src}
        alt=''
        fill
        className='object-cover transition-transform duration-300 group-hover:scale-105'
        sizes='(max-width: 768px) 50vw, 33vw'
        priority={isPriority}
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${image.accentClass}`}
    >
      <span className='text-4xl opacity-60 transition-transform duration-300 group-hover:scale-110 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'>
        {image.emoji}
      </span>
    </div>
  );
};
