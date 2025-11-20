
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Projects() {
  const [activeImageIndex, setActiveImageIndex] = useState<{[key: string]: number}>({});

  const projects = [
    {
      id: 'mealflow',
      title: 'MealFlow',
      description: 'Full-featured Android meal planning app with Firebase backend and Jetpack Compose UI. Engineered innovative zero-cost storage solution by encoding images as strings to bypass Firebase storage limitations.',
      tech: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Room Database'],
      gradient: 'from-purple-500 to-pink-500',
      status: 'Live',
      images: [
        '/projects/mealflow-1.png',
        '/projects/mealflow-2.png',
        '/projects/mealflow-3.png',
        '/projects/mealflow-4.png',
        '/projects/mealflow-5.png'
      ],
      links: {
        demo: 'https://meal-flow-landing-page.vercel.app/',
        github: 'https://github.com/kodehausdev'
      }
    },
    {
      id: 'optipropose',
      title: 'OptiPropose',
      description: 'AI-powered SaaS proposal generator that analyzes project requirements and generates persuasive, data-backed proposals. Focus on win-rate optimization algorithms.',
      tech: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Firebase'],
      gradient: 'from-pink-500 to-orange-500',
      status: 'In Development',
      images: [
        '/projects/optipropose-1.png',
        '/projects/optipropose-2.png'
      ],
      links: {
        demo: 'https://optipropose.com',
        github: '#'
      }
    },
    {
      id: 'hustlehawk',
      title: 'HustleHawk',
      description: 'Smart job scraper that monitors multiple platforms (Remotive, RemoteOK, Arbeitnow) and filters opportunities based on your skill level. Auto-notifies via Discord for quality matches.',
      tech: ['Python', 'Beautiful Soup', 'SQLite', 'Discord API'],
      gradient: 'from-orange-500 to-purple-500',
      status: 'Live',
      images: [
        '/projects/hustlehawk-1.png',
        '/projects/hustlehawk-2.png'
      ],
      links: {
        demo: '#',
        github: 'https://github.com/kodehausdev'
      }
    },
    {
      id: 'two-truths',
      title: 'Two Truths and a Lie',
      description: 'Interactive social game with shareable links and URL compression. Built with React and deployed on Vercel. Features smooth animations and real-time gameplay.',
      tech: ['React', 'Tailwind CSS', 'Vercel', 'Framer Motion'],
      gradient: 'from-blue-500 to-purple-500',
      status: 'Live',
      images: [
        '/projects/two-truths-1.png',
        '/projects/two-truths-2.png'
      ],
      links: {
        demo: 'https://two-truth-and-a-lie-efrd.vercel.app',
        github: '#'
      }
    }
  ];

  const handleNextImage = (projectId: string, totalImages: number) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % totalImages
    }));
  };

  const handlePrevImage = (projectId: string, totalImages: number) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="projects" className="min-h-screen bg-slate-900 py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Building real solutions that solve real problems - from Android apps to AI-powered tools
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
	   transition={{ staggerChildren: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {projects.map((project, index) => {
            const currentImageIndex = activeImageIndex[project.id] || 0;
            
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
	        transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl`}></div>
                
                <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-300 h-full flex flex-col overflow-hidden">
                  {/* Image Carousel */}
                  <div className="relative w-full h-64 bg-slate-950 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full"
                      >
                        <img
                          src={project.images[currentImageIndex]}
                          alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation arrows */}
                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={() => handlePrevImage(project.id, project.images.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        >
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleNextImage(project.id, project.images.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        >
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Image dots indicator */}
                    {project.images.length > 1 && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {project.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndex(prev => ({ ...prev, [project.id]: idx }))}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentImageIndex 
                                ? 'bg-white w-6' 
                                : 'bg-white/40 hover:bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'Live' 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                          : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {currentImageIndex + 1} / {project.images.length}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-slate-800/80 backdrop-blur-sm rounded-lg border border-white/10 text-gray-300 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      {project.links.demo !== '#' && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 px-6 py-3 bg-gradient-to-r ${project.gradient} text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 text-center`}
                        >
                          View Live
                        </a>
                      )}
                      {project.links.github !== '#' && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* More Projects Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur-xl"></div>
          
          <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10 border-dashed group-hover:border-white/30 transition-all duration-300 text-center">
            <div className="mb-4">
              <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              More Projects Coming Soon
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Currently building more awesome stuff. Stay tuned for updates!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
