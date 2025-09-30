'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { 
  Moon, Sun, Menu, X, Github, Linkedin, Mail, Phone, MapPin, 
  Download, ChevronRight, Code, Brain, Database, Award, 
  GraduationCap, Briefcase, User, FolderOpen, Heart, Send,
  ExternalLink, Calendar, Globe, Settings, Server, Shield,
  Zap, Factory, Cpu, BarChart3
} from 'lucide-react';

const Portfolio = () => {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const toggleTheme = () => setIsDark(!isDark);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Fonction pour télécharger le CV
  const downloadCV = () => {
    try {
      const link = document.createElement('a');
      link.href = '/cv/cv-meriem.pdf';
      link.download = 'CV-Meriem-BOURAMTANE.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Tentative de téléchargement du CV');
    } catch (error) {
      console.error('Erreur téléchargement CV:', error);
      window.open('/cv/cv-meryem.pdf', '_blank');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('Tentative d\'envoi email...');
      
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS not loaded');
      }
      
      const result = await emailjs.send(
        'service_XXXXX',
        'template_XXXXX',
        {
          from_name: formData.nom,
          from_email: formData.email,
          subject: formData.sujet,
          message: formData.message,
          to_email: 'meriembouramtane@gmail.com',
        }
      );

      console.log('Résultat EmailJS:', result);

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ nom: '', email: '', sujet: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Erreur envoi email:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    emailjs.init('XXXXXXX');
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: User },
    { id: 'about', label: 'À propos', icon: User },
    { id: 'experience', label: 'Expérience', icon: Briefcase },
    { id: 'projects', label: 'Projets', icon: FolderOpen },
    { id: 'skills', label: 'Compétences', icon: Code },
    { id: 'education', label: 'Formation', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const experiences = [
    {
      company: "GRDF-DIEM Paris",
      role: "Appui au Chef d'Agence",
      period: "09/2023 - 09/2024",
      description: "Optimisation de la performance de maintenance et gestion de crise lors des Jeux Olympiques Paris 2024",
      technologies: ["Gestion de projet", "Maintenance industrielle", "Gestion de crise", "Optimisation processus"],
      highlights: [
        "Élaboration d'un plan de performance de la maintenance",
        "Optimisation des programmes d'intervention des équipes",
        "Appui aux équipes dans la gestion de la cellule de crise pendant les JO Paris 2024"
      ]
    },
    {
      company: "ENEDIS - Paris Nanterre IDF",
      role: "Ingénieure Prescriptrice",
      period: "09/2021 - 08/2023",
      description: "Spécialisation dans la prescription et l'optimisation des compteurs Linky",
      technologies: ["Compteurs intelligents", "Cahier des charges", "Spécifications techniques", "IoT"],
      highlights: [
        "Prescription de compteur Linky",
        "Simplification des cahiers des charges pour amélioration des fonctionnalités",
        "Réalisation des spécifications ciblées et simplifiées du cahier des charges Linky"
      ]
    },
    {
      company: "Ansaldo Energia - Maroc",
      role: "Stage d'observation",
      period: "07/2018 - 08/2018",
      description: "Support aux équipes commerciales dans la gestion documentaire d'acquisitions de matériels",
      technologies: ["Gestion documentaire", "Support commercial", "Opérations d'acquisition"],
      highlights: [
        "Aide aux groupes commerciaux dans la gestion et répartition des documents",
        "Support dans le cadre d'opération d'acquisition de matériels"
      ]
    }
  ];

  const projects = [
    {
      title: "Projets École des Mines de Paris",
      type: "Master Spécialisé",
      description: "Études et projets en ingénierie et gestion du gaz naturel",
      technologies: ["Dimensionnement", "Distribution gaz", "GNL", "Réseaux", "Analyse énergétique"],
      highlights: [
        "Projet de dimensionnement de réseaux de distribution",
        "Étude de cas de distribution gazière",
        "Life Cycle of Energy Systems",
        "Conception et calcul des réseaux",
        "Chaîne du gaz naturel liquéfié (GNL)"
      ]
    },
    {
      title: "Route Électrique Intelligente",
      type: "Projet ECAM-EPMI",
      description: "Système intelligent de gestion du trafic urbain utilisant la vision par ordinateur",
      technologies: ["Vision industrielle", "Intelligence artificielle", "Gestion trafic", "Capteurs"],
      highlights: [
        "Avant-projet des caméras publiques pour gérer l'embouteillage",
        "Amélioration de la fluidité de la circulation",
        "Intégration de capteurs intelligents"
      ]
    },
    {
      title: "Système de Commande Moteur Asynchrone",
      type: "Projet Technique",
      description: "Optimisation et commande numérique de systèmes électriques",
      technologies: ["C++", "Commande numérique", "Machines électriques", "Automatique"],
      highlights: [
        "Commande numérique d'un système électrique",
        "Étude et analyse du fonctionnement du moteur",
        "Maximisation de la performance d'une machine électrique",
        "Développement en C++ et tests machine"
      ]
    }
  ];

  const skills = {
    "Ingénierie Énergétique": ["Distribution gaz", "GNL", "Smart Grids", "Stockage énergie", "Énergies renouvelables", "Efficacité énergétique"],
    "Développement & Data": ["C/C++", "Matlab", "VBA", "Python", "Analyse de données", "Systèmes et réseaux"],
    "Outils Techniques": ["SolidWorks", "GMAO", "O2", "OPTIC", "Cloud computing", "Capteurs industriels"],
    "Gestion de Projet": ["Planification", "Analyse et synthèse", "Gestion de crise", "Optimisation processus", "Spécifications techniques"],
    "Systèmes Industriels": ["Automatique", "Vision industrielle", "Commande numérique", "IoT", "Maintenance industrielle"]
  };

  const education = [
    {
      degree: "Master Spécialisé en Ingénierie et Gestion du Gaz",
      school: "École des Mines de Paris",
      period: "09/2023 - 09/2024",
      status: "En alternance avec GRDF",
      specialty: "GNL, Distribution, Stockage, Data & Smart Grids, CCS, Transport gaz, Transition énergétique"
    },
    {
      degree: "Diplôme d'Ingénieur Généraliste - Convergence Énergie et Data",
      school: "ECAM-EPMI",
      period: "09/2021 - 09/2023",
      status: "En alternance avec ENEDIS",
      specialty: "Automatique, Réseaux, Cloud, Smart Grids, Vision industrielle, Énergies renouvelables"
    },
    {
      degree: "Master EEA et Licence Sciences Technologies et Santé",
      school: "CYTECH - CERGY",
      period: "09/2021 - 09/2023",
      specialty: "Électronique, Électrotechnique, Automatique"
    },
    {
      degree: "Classes Préparatoires Intégrées - Énergies Renouvelables",
      school: "École Supérieure de l'Ingénierie de l'Energie - UIR Rabat",
      period: "09/2017 - 09/2020",
      specialty: "Spécialité Énergies Renouvelables"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header Navigation */}
      <header className={`fixed top-0 w-full z-50 backdrop-blur-lg ${isDark ? 'bg-slate-900/80' : 'bg-white/80'} border-b ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              BOURAMTANE MERIEM
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                    activeSection === item.id
                      ? 'bg-emerald-600 text-white'
                      : isDark
                      ? 'text-gray-300 hover:text-white hover:bg-slate-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button
                onClick={toggleMenu}
                className={`lg:hidden p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`lg:hidden ${isDark ? 'bg-slate-900' : 'bg-white'} border-t ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeSection === item.id
                      ? 'bg-emerald-600 text-white'
                      : isDark
                      ? 'text-gray-300 hover:text-white hover:bg-slate-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-purple-500/20"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Photo de profil */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-emerald-500/30 shadow-2xl">
                  <Image
                    src="/images/profile-meryem.jpg"
                    alt="BOURAMTANE MERIEM"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-cyan-400 rounded-full border-4 border-white/20 animate-pulse"></div>
              </div>
            </div>
            
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
                BOURAMTANE MERIEM
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl mb-8 text-gray-300">
                Ingénieure <span className="text-emerald-400">Énergie & Data</span> • 
                Spécialiste <span className="text-cyan-400">Gaz & Smart Grids</span> • 
                Expert <span className="text-purple-400">Systèmes Industriels</span>
              </p>
              <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Diplômée de l&apos;École des Mines de Paris et ECAM-EPMI, spécialisée en ingénierie du gaz et systèmes énergétiques intelligents avec plus de 3 ans d&apos;expérience chez GRDF et ENEDIS.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Mail size={20} />
                <span>Me Contacter</span>
              </button>
              <button 
                onClick={downloadCV}
                className="px-8 py-3 border-2 border-purple-500 text-purple-500 rounded-lg font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center space-x-2"
              >
                <Download size={20} />
                <span>Télécharger CV</span>
              </button>
            </div>

            <div className="flex justify-center space-x-6">
              <a href="mailto:meriembouramtane@gmail.com" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
                <Mail size={24} />
              </a>
              <a href="https://www.linkedin.com/in/meriem-bouramtane-479934167/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              À Propos de Moi
            </h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  Ingénieure généraliste diplômée en Énergie & Data de l&apos;ECAM-EPMI et titulaire d&apos;un 
                  Master Spécialisé en Ingénierie et Gestion du Gaz de l&apos;École des Mines de Paris. 
                  Forte de plus de 36 mois d&apos;expérience en alternance chez ENEDIS et GRDF.
                </p>
                <p className="text-lg leading-relaxed">
                  Spécialisée dans les systèmes énergétiques intelligents, la distribution du gaz 
                  naturel et les technologies smart grids. Passionnée par l&apos;optimisation des processus 
                  industriels et la transition énergétique.
                </p>
                <p className="text-lg leading-relaxed">
                  Actuellement à la recherche d&apos;un CDI pour contribuer à des projets innovants 
                  dans le secteur de l&apos;énergie et du développement durable.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="flex items-center space-x-2">
                    <MapPin size={20} className="text-emerald-600" />
                    <span>Paris 7ème, France</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={20} className="text-cyan-500" />
                    <span>+33 6 67 97 75 51</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe size={20} className="text-purple-500" />
                    <span>Français (C1), Anglais (B2), Arabe</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={20} className="text-emerald-500" />
                    <span>Disponible pour CDI</span>
                  </div>
                </div>
                
                <div className="pt-6">
                  <button 
                    onClick={downloadCV}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 via-cyan-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  >
                    <Download size={20} />
                    <span>Télécharger mon CV</span>
                  </button>
                </div>
              </div>
              <div className={`p-8 rounded-2xl ${isDark ? 'bg-slate-900' : 'bg-gray-50'} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-purple-500/10"></div>
                
                <div className="relative z-10 text-center mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-emerald-500/20 shadow-lg mb-4">
                    <Image
                      src="/images/profile-meryem.jpg"
                      alt="BOURAMTANE MERIEM"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-6">Ingénieure Énergie & Data</h3>
                </div>
                
                <div className="relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Zap className="text-emerald-600" size={24} />
                      <span>Systèmes Énergétiques Intelligents</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Factory className="text-cyan-500" size={24} />
                      <span>Distribution Gaz & Smart Grids</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="text-purple-500" size={24} />
                      <span>Optimisation Processus Industriels</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-emerald-600/20 via-cyan-500/20 to-purple-500/20 rounded-lg">
                    <p className="font-semibold">Ingénieure Spécialisée</p>
                    <p className="text-sm opacity-80">Énergie, Data et Systèmes Industriels avec expertise GRDF/ENEDIS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Expérience Professionnelle
            </h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-emerald-600 mb-1">{exp.company}</h3>
                      <p className="text-lg font-semibold">{exp.role}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm bg-cyan-500/20 px-3 py-1 rounded-full">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <p className="mb-4 leading-relaxed">{exp.description}</p>
                  {exp.highlights && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-purple-500">Réalisations clés :</h4>
                      <ul className="space-y-1">
                        {exp.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-center space-x-2 text-sm">
                            <ChevronRight size={16} className="text-emerald-500" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Projets Académiques & Techniques
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div key={index} className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900' : 'bg-gray-50'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-emerald-600/20 to-cyan-500/20 text-emerald-500 rounded-full text-xs font-medium mb-2">
                      {project.type}
                    </span>
                    <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                    <p className="text-sm leading-relaxed mb-4">{project.description}</p>
                  </div>
                  {project.highlights && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2 text-purple-500">Points clés :</h4>
                      <ul className="space-y-1">
                        {project.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-start space-x-2 text-xs">
                            <ChevronRight size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={`px-2 py-1 rounded-full text-xs ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Compétences Techniques
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, skillList], index) => (
                <div key={index} className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <h3 className="text-lg font-bold mb-4 text-emerald-600">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, skillIndex) => (
                      <span key={skillIndex} className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors cursor-default`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Formation
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900' : 'bg-gray-50'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{edu.degree}</h3>
                      <p className="text-emerald-600 font-medium mb-2">{edu.school}</p>
                      {edu.specialty && (
                        <p className="text-sm text-cyan-500 mb-2">{edu.specialty}</p>
                      )}
                      {edu.status && (
                        <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-500 rounded-full text-sm font-medium">
                          {edu.status}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm bg-emerald-600/20 px-3 py-1 rounded-full mt-2 lg:mt-0">
                      <Calendar size={16} />
                      <span>{edu.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Me Contacter
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-6">Restons en contact</h3>
                <p className="text-lg leading-relaxed mb-8">
                  Ingénieure spécialisée en systèmes énergétiques et data avec une expertise unique 
                  en distribution du gaz et smart grids. Passionnée par l&apos;innovation et la transition 
                  énergétique, je recherche des opportunités pour contribuer à des projets ambitieux 
                  dans le secteur de l&apos;énergie.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-emerald-600/20 rounded-lg">
                      <Mail className="text-emerald-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:meriembouramtane@gmail.com" className="text-emerald-600 hover:underline">
                        meriembouramtane@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-cyan-500/20 rounded-lg">
                      <Phone className="text-cyan-500" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Téléphone</p>
                      <a href="tel:+33667977551" className="text-cyan-500 hover:underline">
                        +33 6 67 97 75 51
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <MapPin className="text-purple-500" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Localisation</p>
                      <p>27 Rue du Champ de Mars, Paris 7ème</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <p className="font-semibold mb-3">Retrouvez-moi sur :</p>
                  <div className="flex space-x-4">
                    <a href="https://www.linkedin.com/in/meriem-bouramtane-479934167/" target="_blank" rel="noopener noreferrer" className="p-3 bg-emerald-600/20 hover:bg-emerald-600/30 rounded-lg transition-colors">
                      <Linkedin size={24} />
                    </a>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom complet</label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDark 
                          ? 'bg-slate-700 border-slate-600 text-white focus:border-emerald-600' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-emerald-600'
                      } focus:ring-2 focus:ring-emerald-600/20 outline-none transition-all`}
                      placeholder="Votre nom complet"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDark 
                          ? 'bg-slate-700 border-slate-600 text-white focus:border-emerald-600' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-emerald-600'
                      } focus:ring-2 focus:ring-emerald-600/20 outline-none transition-all`}
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Sujet</label>
                    <input
                      type="text"
                      name="sujet"
                      value={formData.sujet}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDark 
                          ? 'bg-slate-700 border-slate-600 text-white focus:border-emerald-600' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-emerald-600'
                      } focus:ring-2 focus:ring-emerald-600/20 outline-none transition-all`}
                      placeholder="Opportunité CDI / Collaboration"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDark 
                          ? 'bg-slate-700 border-slate-600 text-white focus:border-emerald-600' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-emerald-600'
                      } focus:ring-2 focus:ring-emerald-600/20 outline-none transition-all resize-none`}
                      placeholder="Décrivez votre projet ou vos besoins..."
                    ></textarea>
                  </div>
                  
                  {/* Messages de statut */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-emerald-600/20 text-emerald-600 rounded-lg text-sm">
                      ✅ Message envoyé avec succès ! Je vous répondrai rapidement.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-600/20 text-red-600 rounded-lg text-sm">
                      ❌ Erreur lors de l&apos;envoi. Veuillez réessayer ou me contacter directement.
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 bg-gradient-to-r from-emerald-600 via-cyan-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    <Send size={20} />
                    <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-8 ${isDark ? 'bg-slate-900 border-t border-slate-800' : 'bg-white border-t border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-4 text-lg font-semibold">
              BOURAMTANE MERIEM
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Ingénieure Énergie & Data • Spécialiste Gaz & Smart Grids • Systèmes Industriels
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
              École des Mines de Paris • ECAM-EPMI • Expérience GRDF/ENEDIS
            </p>
            <div className="flex justify-center space-x-6 mt-6">
              <a href="mailto:meriembouramtane@gmail.com" className="text-emerald-600 hover:text-emerald-700 transition-colors">
                <Mail size={20} />
              </a>
              <a href="https://www.linkedin.com/in/meriem-bouramtane-479934167/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-700 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-6`}>
              © 2025 BOURAMTANE MERIEM. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;