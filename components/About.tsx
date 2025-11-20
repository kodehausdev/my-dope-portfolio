'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const highlights = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
      ),
      title: 'Problem Solver',
      description: 'I don\'t just write code - I architect solutions. Like encoding images as strings to bypass Firebase storage limits in MealFlow.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
      title: 'Fast Learner',
      description: 'From Python basics in 2020 to building full-stack production apps in 2025. Self-taught through documentation and building real projects.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
        </svg>
      ),
      title: 'Full Stack',
      description: 'Comfortable across the entire stack - from Android UI in Jetpack Compose to backend APIs with Node.js and PostgreSQL.'
    }
  ];

  return (
    <section id="about" className="min-h-screen bg-slate-950 py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Self-taught developer who turns ideas into reality
          </p>
        </motion.div>

<div className="grid md:grid-cols-2 gap-12 items-center mb-16">
  {/* Photo with Hexagon Frame */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="flex justify-center"
  >
    <motion.div
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ duration: 0.3 }}
      className="relative group"
    >
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full filter blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
      
      {/* Hexagon container */}
      <div className="relative">
        {/* Animated border */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
        </motion.div>

        {/* Inner hexagon with photo/placeholder */}
        <div 
          className="relative w-80 h-80 m-1 bg-slate-900 flex items-center justify-center overflow-hidden"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
          }}
        >
          {/* Placeholder - Replace this img src with /seyi-photo.jpg when ready */}
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-2"
              >
                SF
              </motion.div>
              <p className="text-gray-400 text-sm">Developer & Builder</p>
            </div>
          </div>
          
          {/* When you have photo, replace above div with this:
          <img 
            src="/seyi-photo.jpg" 
            alt="Seyi Fatoki"
            className="w-full h-full object-cover"
          />
          */}
        </div>

        {/* Decorative corners */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-3 h-3 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </motion.div>
  </motion.div>

  {/* Story - keep your existing story div here */}
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
      <h3 className="text-3xl font-bold text-white mb-6">My Journey</h3>
      
      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>
          Started with <span className="text-purple-400 font-semibold">Python basics in 2020</span> during university. What began as curiosity turned into a passion for building things that solve real problems.
        </p>
        
        <p>
          While studying Political Science, I taught myself to code by <span className="text-pink-400 font-semibold">building projects, not just following tutorials</span>. From my first Android app to full-stack web applications - each project taught me something new.
        </p>
        
        <p>
          Today, I architect <span className="text-orange-400 font-semibold">scalable production applications</span> using Kotlin, React, Node.js, and modern tooling. I've shipped <span className="text-green-400 font-semibold">10+ projects</span>, including an Android meal planner with an innovative Firebase workaround and an AI-powered proposal generator.
        </p>
        
        <p className="text-white font-semibold">
          I don't just write code - I build solutions that work.
        </p>
      </div>
    </div>
  </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex-shrink-0">
                    {highlight.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{highlight.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Fun Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">By The Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10+', label: 'Projects Built', icon: '🚀' },
              { value: '5', label: 'Years Coding', icon: '⏱️' },
              { value: '4', label: 'Languages', icon: '💻' },
              { value: '∞', label: 'Coffee Consumed', icon: '☕' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );

}
