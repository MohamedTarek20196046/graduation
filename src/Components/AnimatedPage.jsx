import React from 'react'
import { motion } from "framer-motion";

const animations = {         //floop
    initial: { perspective: "100px", rotateY: 90 },
    animate: { perspective: "100px", rotateY: 0 },
    exit: { perspective: "100px", rotateY: -90 },
    transition: { duration: 0.8 }
  };
  
function AnimatedPage({ children }) {
  return (
    <motion.div variants={animations} initial="initial" animate="animate" exit="exit" transition={animations.transition}>
       {children}
    </motion.div>
  )
}

export default AnimatedPage