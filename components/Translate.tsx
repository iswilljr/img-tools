import { motion, type HTMLMotionProps, type MotionProps } from 'framer-motion';

interface TranslateProps extends MotionProps, HTMLMotionProps<'div'> {}

export function Translate(props: TranslateProps) {
  return (
    <motion.div
      {...props}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 0.9 }}
      transition={{ duration: 0.4 }}
    />
  );
}
