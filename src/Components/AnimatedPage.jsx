import React from 'react'
import { motion } from "framer-motion";

// const animations = {             //rotate one
//     initial: { rotate: -90 },
//     animate: { rotate: 0 },
//     exit: { rotate: 90 },
//     transition: { duration: 0.6 }
//   };

    // const animations = {         //slide one
    //     initial: { x: -100 },
    //     animate: { x: 0 },
    //     exit: { x: 100 },
    //     transition: { duration: 1 }
    // };

// const animations = {        //fade
//     initial: { opacity: 0 },
//     animate: { opacity: 1 },
//     exit: { opacity: 0 },
//     transition: { duration: 0.5 }
//   };
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