import { NAVIGATION_ANIMATIONS } from '@/constants/navigation';
import type { NavigationSection } from '@/types/navigation';
import { motion, AnimatePresence } from 'motion/react';

// NavigationButton Component for better code organization
interface NavigationButtonProps {
  section: NavigationSection;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export function NavigationButton({
  section,
  index,
  isActive,
  onClick,
}: NavigationButtonProps) {
  const baseClasses =
    'relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 group overflow-hidden cursor-pointer';

  const activeClasses = 'text-white shadow-lg';

  const inactiveClasses =
    'text-gray-600 hover:text-rose-500 hover:bg-rose-50/80';

  const labels: Record<string, string> = {
    'navigation.home': 'Trang Chủ',
    'navigation.couple': 'Cô Dâu Chú Rể',
    'navigation.details': 'Thiệp Mời',
    'navigation.venue': 'Địa Điểm',
    'navigation.gallery': 'Hình Cưới',
    'navigation.rsvp': 'Xác Nhận',
  };

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      whileHover={NAVIGATION_ANIMATIONS.button.hover}
      whileTap={NAVIGATION_ANIMATIONS.button.tap}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {/* Animated Background for Active State */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={NAVIGATION_ANIMATIONS.background.initial}
            animate={NAVIGATION_ANIMATIONS.background.animate}
            exit={NAVIGATION_ANIMATIONS.background.exit}
            transition={NAVIGATION_ANIMATIONS.background.transition}
            className={`absolute inset-0 bg-gradient-to-r ${section.gradient} rounded-lg sm:rounded-xl`}
          />
        )}
      </AnimatePresence>

      {/* Glow Effect for Active State */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={NAVIGATION_ANIMATIONS.background.initial}
            animate={{ scale: 1.2, opacity: 0.3 }}
            exit={NAVIGATION_ANIMATIONS.background.exit}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 bg-gradient-to-r ${section.gradient} rounded-lg sm:rounded-xl blur-sm -z-10`}
          />
        )}
      </AnimatePresence>

      {/* Icon with Bounce Animation */}
      <motion.span
        className="text-sm sm:text-base relative z-10"
        animate={isActive ? NAVIGATION_ANIMATIONS.icon.active : {}}
        transition={NAVIGATION_ANIMATIONS.icon.transition}
        whileHover={NAVIGATION_ANIMATIONS.icon.hover}
      >
        {section.icon}
      </motion.span>

      {/* Label with Slide Animation */}
      <motion.span
        className="hidden sm:inline-block whitespace-nowrap relative z-10 text-xs sm:text-sm"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 * index }}
      >
        {labels[section.labelKey] ?? section.id}
      </motion.span>

      {/* Active Indicator Dot with Pulse */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={NAVIGATION_ANIMATIONS.background.initial}
            animate={{ scale: 1, opacity: 1 }}
            exit={NAVIGATION_ANIMATIONS.background.exit}
            transition={NAVIGATION_ANIMATIONS.background.transition}
            className="absolute -bottom-0.5 sm:-bottom-1 left-1/2 -translate-x-1/2 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-white rounded-full shadow-lg z-10"
          >
            <motion.div
              animate={NAVIGATION_ANIMATIONS.pulse.animate}
              transition={NAVIGATION_ANIMATIONS.pulse.transition}
              className="w-full h-full bg-white rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${getRippleColor(
            section.gradient
          )} 0%, transparent 70%)`,
        }}
      />
    </motion.button>
  );
}

// Helper function to get ripple color
const getRippleColor = (gradient: string): string => {
  return gradient.includes('rose') ? '#f43f5e' : '#8b5cf6';
};
