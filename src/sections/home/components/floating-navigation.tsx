'use client';

import { motion } from 'motion/react';
import { FloatingParticles, NavigationButton } from '@/components';
import { NAVIGATION_SECTIONS } from '@/constants';
import { NAVIGATION_ANIMATIONS } from '@/constants/navigation';

interface FloatingNavigationProps {
  activeSection: string;
  onScrollToSection: (sectionId: string) => void;
}

export default function FloatingNavigation({
  activeSection,
  onScrollToSection,
}: FloatingNavigationProps) {
  return (
    <motion.nav
      initial={NAVIGATION_ANIMATIONS.navigation.initial}
      animate={NAVIGATION_ANIMATIONS.navigation.animate}
      transition={NAVIGATION_ANIMATIONS.navigation.transition}
      className="fixed top-3 sm:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl px-1.5 sm:px-2 py-1.5 sm:py-2 shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-300"
      >
        <div className="flex items-center space-x-0.5 sm:space-x-1">
          {NAVIGATION_SECTIONS.map((section, index) => (
            <NavigationButton
              key={section.id}
              section={section}
              index={index}
              isActive={activeSection === section.id}
              onClick={() => onScrollToSection(section.id)}
            />
          ))}
        </div>

        <FloatingParticles />
      </motion.div>
    </motion.nav>
  );
}
