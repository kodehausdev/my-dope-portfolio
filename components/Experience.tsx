'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Experience() {
const experiences = [
  {
    period: '2022 - Present',
    title: 'Freelance & Personal Projects Developer',
    company: 'Remote',
    type: 'Freelance',
    description: 'Design, develop, and deploy Android and web applications using modern frameworks. Built full-stack MVPs independently, integrating frontend with backend services and cloud infrastructure.',
    achievements: [
      'Architected scalable, production-ready solutions optimized for real-world constraints',
      'Developed MealFlow with innovative zero-cost Firebase storage solution',
      'Built OptiPropose AI-powered SaaS platform with TypeScript and PostgreSQL',
      'Created HustleHawk job automation tool with intelligent filtering'
    ],
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    period: 'June 2023 - November 2023',
    title: 'Business Development & Social Media Lead',
    company: 'Animation Studio, Abuja',
    type: 'Contract',
    description: 'Led digital marketing campaigns and social media strategy for animation studio.',
    achievements: [
      'Earned Meta Social Media Marketing certification',
      'Developed content strategies that significantly increased engagement',
      'Managed multi-platform digital campaigns',
      'Increased brand reach and audience interaction'
    ],
    gradient: 'from-pink-500 to-orange-500'
  },
  {
    period: '2020 - Present',
    title: 'Self-Taught Developer Journey',
    company: 'Independent Learning',
    type: 'Education',
    description: 'Started with Python basics and progressively built expertise across mobile and web development through hands-on projects and real-world problem solving.',
    achievements: [
      'Mastered Python, Kotlin, JavaScript, and TypeScript through project-based learning',
      'Built 10+ complete projects from scratch to production deployment',
      'Transitioned from tutorials to architecting production applications',
      'Self-taught through documentation, open-source contributions, and building real solutions'
    ],
    gradient: 'from-green-500 to-blue-500'
  },
  {
    period: 'August 2020 - December 2020',
    title: 'Volunteer Digital Literacy Educator',
    company: 'Rural Nigeria',
    type: 'Volunteer',
    description: 'Designed and delivered curriculum teaching digital skills to underserved communities.',
    achievements: [
      'Created comprehensive digital literacy curriculum',
      'Used Google Classroom for remote teaching',
      'Empowered communities with essential tech skills',
      'Bridged the digital divide in rural areas'
    ],
    gradient: 'from-orange-500 to-purple-500'
  },
  {
    period: '2016 - 2021',
    title: 'Bachelor of Science in Political Science',
    company: 'University of Abuja',
    type: 'Education',
    description: 'Self-taught developer journey began here. Started learning programming while completing degree.',
    achievements: [
      'Completed degree while learning to code',
      'Built first Android apps during university',
      'Developed problem-solving and analytical skills',
      'Balanced academics with technical education'
    ],
    gradient: 'from-blue-500 to-purple-500'
  }
];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1
    }
  };

  return (
    <section id="experience" className="min-h-screen bg-slate-950 py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Experience & Journey
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From self-taught developer to building production applications - here's my journey
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.3 }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 opacity-30"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
              className={`relative mb-16 ${
                index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
              }`}
            >
              <div className="group">
                {/* Timeline dot */}
                <div className={`hidden md:block absolute top-8 ${
                  index % 2 === 0 ? 'right-0' : 'left-0'
                } transform ${
                  index % 2 === 0 ? 'translate-x-1/2' : '-translate-x-1/2'
                } w-4 h-4 rounded-full bg-gradient-to-r ${exp.gradient} group-hover:scale-150 transition-transform duration-300 z-10`}>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r animate-ping opacity-75"></div>
                </div>

                {/* Content card */}
                <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 group-hover:border-white/20 transition-all duration-300 group-hover:scale-105">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${exp.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl`}></div>

                  <div className="relative z-10">
                    {/* Type badge */}
                    <div className="inline-block mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${exp.gradient} text-white`}>
                        {exp.type}
                      </span>
                    </div>

                    {/* Period */}
                    <div className="text-gray-400 text-sm font-mono mb-2">
                      {exp.period}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {exp.title}
                    </h3>

                    {/* Company */}
                    <div className={`text-lg bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent font-semibold mb-4`}>
                      {exp.company}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {exp.achievements.map((achievement, achIndex) => (
                        <motion.li
                          key={achIndex}
                          initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: achIndex * 0.1 }}
                          className="flex items-start gap-2 text-gray-400 text-sm"
                        >
                          <span className={`${index % 2 === 0 ? 'order-first' : 'order-last'}`}>
                            <svg className="w-5 h-5 text-pink-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                          </span>
                          <span className="flex-1">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-lg mb-6">
            Want to see my full resume?
          </p>
          <a
            href="/Seyi_Fatoki_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-purple-500/50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Download Full Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
