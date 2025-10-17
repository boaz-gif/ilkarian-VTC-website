import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Menu, X, Moon, Sun, Download, FileText, MapPin, Phone, Mail, ExternalLink, Upload, CheckCircle, AlertCircle, Loader, ChevronRight, ArrowLeft } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

console.log('🔥 APP.JSX LOADED - Version 2.0 - ' + new Date().toISOString());

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 🔍 DEBUG: Check Supabase config on load
console.group('🔍 Supabase Configuration Check');
console.log('Supabase URL:', supabaseUrl);
console.log('Anon key present:', !!supabaseAnonKey);
console.log('Supabase client created:', !!supabase);
console.groupEnd();

// Updated programs list with dynamic content
const PROGRAMS = [
  { 
    name: 'COMMUNICATION SKILLS', 
    duration: '3 Months', 
    level: 'Certificate',
    description: 'Develop effective verbal and written communication techniques for professional environments.',
    requirements: 'KCPE Certificate, Basic literacy skills',
    modules: ['Verbal Communication', 'Written Communication', 'Presentation Skills', 'Interpersonal Skills']
  },
  { 
    name: 'BUSINESS STUDIES', 
    duration: '6 Months', 
    level: 'Certificate',
    description: 'Learn fundamental business concepts and practices for entrepreneurial success.',
    requirements: 'KCPE Certificate, Basic numeracy skills',
    modules: ['Business Mathematics', 'Accounting Principles', 'Business Management', 'Entrepreneurship']
  },
  { 
    name: 'ICT', 
    duration: '6 Months', 
    level: 'Certificate',
    description: 'Master essential computer skills and information technology concepts.',
    requirements: 'KCPE Certificate, Basic computer literacy',
    modules: ['Computer Fundamentals', 'Microsoft Office Suite', 'Internet Basics', 'Digital Security']
  },
  { 
    name: 'MATHS', 
    duration: '3 Months', 
    level: 'Certificate',
    description: 'Strengthen mathematical skills applicable to various vocational fields.',
    requirements: 'KCPE Certificate',
    modules: ['Basic Arithmetic', 'Algebra', 'Geometry', 'Applied Mathematics']
  },
  { 
    name: 'LIFE SKILLS', 
    duration: '3 Months', 
    level: 'Certificate',
    description: 'Develop essential personal and social skills for successful living.',
    requirements: 'KCPE Certificate',
    modules: ['Decision Making', 'Problem Solving', 'Financial Literacy', 'Personal Development']
  },
  { 
    name: 'TOUR GUIDING', 
    duration: '6 Months', 
    level: 'Certificate',
    description: 'Acquire knowledge and skills for professional tour guiding in the tourism industry.',
    requirements: 'KCPE Certificate, Good communication skills',
    modules: ['Tourism Principles', 'Customer Service', 'Local History & Culture', 'Tour Management'],
    hasPractical: true
  },
  { 
    name: 'PLUMBING', 
    duration: '6 Months', 
    level: 'Certificate',
    description: 'Learn installation and maintenance of plumbing systems in residential and commercial buildings.',
    requirements: 'KCPE Certificate, Physical fitness',
    modules: ['Plumbing Tools & Materials', 'Pipe Installation', 'Drainage Systems', 'Safety Procedures'],
    hasPractical: true
  },
  { 
    name: 'HAIR DRESSING', 
    duration: '6 Months', 
    level: 'Certificate',
    description: 'Master hair styling, cutting, and treatment techniques for professional salon services.',
    requirements: 'KCPE Certificate, Creative aptitude',
    modules: ['Hair Cutting Techniques', 'Hair Coloring', 'Chemical Treatments', 'Salon Management'],
    hasPractical: true
  },
  { 
    name: 'MASONRY', 
    duration: '6 Months', 
    level: 'Certificate',
    description: 'Develop skills in bricklaying, concrete work, and general construction techniques.',
    requirements: 'KCPE Certificate, Physical fitness',
    modules: ['Building Materials', 'Bricklaying', 'Concrete Work', 'Construction Safety'],
    hasPractical: true
  },
  { 
    name: 'FOOD AND BEVERAGE', 
    duration: '6 Months', 
    level: 'Certificate',
    description: 'Learn food preparation, service, and management for hospitality industry careers.',
    requirements: 'KCPE Certificate, Food handler\'s certificate',
    modules: ['Food Preparation', 'Beverage Service', 'Kitchen Management', 'Food Safety'],
    hasPractical: true
  },
  { 
    name: 'ELECTRICAL', 
    duration: '6 Months', 
    level: 'Certificate',
    description: 'Gain skills in electrical installation, maintenance, and repair for residential and commercial settings.',
    requirements: 'KCPE Certificate, Physical fitness, Good eyesight',
    modules: ['Electrical Theory', 'Wiring Techniques', 'Appliance Repair', 'Safety Procedures'],
    hasPractical: true
  },
  { 
    name: 'DRESS MAKING AND TAILORY', 
    duration: '6 Months', 
    level: 'Certificate',
    description: 'Master garment design, pattern making, and sewing techniques for fashion industry careers.',
    requirements: 'KCPE Certificate, Creative aptitude',
    modules: ['Fashion Design', 'Pattern Making', 'Sewing Techniques', 'Business Management'],
    hasPractical: true
  }
];

// Updated menu items with dynamic content
const MENU_ITEMS = {
  'ABOUT US': {
    description: 'Ilkarian Vocational Training Centre is a premier private institution dedicated to providing quality vocational education and practical skills training.',
    links: [
      { 
        name: 'Our Mission', 
        content: 'Transform future lives through quality vocational training.',
        details: 'We are committed to providing hands-on training that equips our students with practical skills needed in today\'s job market. Our mission is to empower individuals with knowledge and abilities that lead to meaningful employment and personal growth.'
      },
      { 
        name: 'Our Vision', 
        content: 'Be an excellence centre for skill development.',
        details: 'We aspire to be recognized as the leading vocational training institution in Kenya, known for our innovative teaching methods, industry-relevant curriculum, and successful graduates who make positive contributions to society.'
      },
      { 
        name: 'History', 
        content: 'We have been involved in shaping the future of countless lives.',
        details: 'Founded in 2010, Ilkarian VTC has grown from a small training center with 50 students to a thriving institution serving over 500 students annually. Our journey has been marked by continuous improvement, expansion of programs, and building strong industry partnerships.'
      },
      { 
        name: 'Accreditation', 
        content: 'Certified by the Kenya Ministry of Education.',
        details: 'We are fully accredited by the Technical and Vocational Education and Training Authority (TVETA) and the Kenya Ministry of Education. Our programs meet national standards and our certificates are recognized nationwide.'
      }
    ]
  },
  'PROGRAMS': {
    description: 'We offer comprehensive vocational training programs designed to meet industry standards and prepare students for successful careers.',
    links: PROGRAMS.map(p => ({ 
      name: p.name, 
      duration: p.duration,
      level: p.level,
      description: p.description,
      requirements: p.requirements,
      modules: p.modules,
      hasPractical: p.hasPractical || false
    }))
  },
  'REQUIREMENTS': {
    description: 'Admission requirements include a minimum of KCPE certificate, completed application, 2 passport photos, and birth certificate copy.',
    links: [
      { 
        name: 'General Requirements', 
        content: 'Basic requirements for all programs',
        details: 'All applicants must provide: KCPE certificate or equivalent, completed application form, two recent passport-size photographs, copy of birth certificate or national ID, and payment of application fee. Additional requirements may apply for specific programs.'
      },
      { 
        name: 'Program-Specific Requirements', 
        content: 'Additional requirements for certain programs',
        details: 'Technical programs like Electrical, Plumbing, and Masonry require physical fitness and good eyesight. Creative programs like Hair Dressing and Dress Making require demonstration of artistic aptitude. Food and Beverage program requires a food handler\'s certificate.'
      },
      { 
        name: 'International Students', 
        content: 'Requirements for non-Kenyan applicants',
        details: 'International students must provide: valid passport, student visa or permit, equivalent academic certificates, proof of medical insurance, and proof of financial support. Language proficiency in English is required for all programs.'
      }
    ]
  },
  'CONTACT': {
    description: 'Get in touch with us for inquiries, admissions information, or to schedule a campus visit.',
    links: [
      { 
        name: 'Phone: +254 XXX XXX XXX', 
        content: 'Call us during business hours',
        details: 'Our office is open Monday to Friday, 8:00 AM to 5:00 PM. For urgent inquiries outside these hours, please leave a message and we will return your call the next business day.'
      },
      { 
        name: 'Email: info@ilkarianvtc.ac.ke', 
        content: 'Send us an email anytime',
        details: 'We typically respond to emails within 24 hours during business days. For admissions inquiries, please include your full name and program of interest in the subject line.'
      },
      { 
        name: 'Location: Nairobi, Kenya', 
        content: 'Visit our campus',
        details: 'We are located in the heart of Nairobi, easily accessible by public transportation. Campus tours are available by appointment. Please call or email to schedule a visit.'
      }
    ]
  },
  'VISIT US': {
    description: 'Schedule a visit to our modern campus facilities. See our workshops, labs, and meet our experienced instructors.',
    links: [
      { 
        name: 'Schedule a Visit', 
        content: 'Book a campus tour',
        details: 'Campus tours are available Monday to Friday, 9:00 AM to 4:00 PM. Tours typically last 60-90 minutes and include visits to our workshops, classrooms, and facilities. Please book at least 24 hours in advance.'
      },
      { 
        name: 'Virtual Tour', 
        content: 'Explore our campus online',
        details: 'Can\'t visit in person? Take our virtual tour to explore our facilities from anywhere. The virtual tour includes 360° views of our workshops, classrooms, and common areas.'
      },
      { 
        name: 'Directions', 
        content: 'How to find us',
        details: 'We are located on Thika Road, 5km from Nairobi CBD. Public transport options include buses number 11, 12, and 45. For those driving, secure parking is available on campus.'
      },
      { 
        name: 'Campus Map', 
        content: 'Navigate our campus',
        details: 'Download our campus map to easily find your way around. The map shows the location of all buildings, workshops, classrooms, and facilities. Printed copies are available at the reception.'
      }
    ]
  }
};

export default function IlkarianVTC() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showAdmissionForm, setShowAdmissionForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [mobileDetailPage, setMobileDetailPage] = useState(null);
  const [mobileDetailContent, setMobileDetailContent] = useState(null);
  
  // Refs to track timeouts for debouncing
  const validationTimeoutRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Memoize validation functions to prevent recreation on every render
  const validateEmail = useCallback((email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  const validatePhone = useCallback((phone) => {
    return /^(\+254|0)[17]\d{8}$/.test(phone.replace(/\s/g, ''));
  }, []);

  // Memoize form validation functions
  const validateApplicationForm = useCallback(() => {
    const errors = {};
    
    if (!formData.firstName?.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName?.trim()) errors.lastName = 'Last name is required';
    if (!formData.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      errors.phone = 'Invalid phone format (use +254 or 07/01)';
    }
    if (!formData.idNumber?.trim()) errors.idNumber = 'ID/Passport number is required';
    if (!formData.program) errors.program = 'Please select a program';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, validateEmail, validatePhone]);

  const validateAdmissionForm = useCallback(() => {
    const errors = {};
    
    if (!formData.refNumber?.trim()) errors.refNumber = 'Reference number is required';
    if (!formData.fullName?.trim()) errors.fullName = 'Full name is required';
    if (!formData.admissionEmail?.trim()) {
      errors.admissionEmail = 'Email is required';
    } else if (!validateEmail(formData.admissionEmail)) {
      errors.admissionEmail = 'Invalid email format';
    }
    if (uploadedFiles.length === 0) {
      errors.files = 'Please upload at least one document';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, uploadedFiles, validateEmail]);

  // Optimized input change handler with debouncing for error clearing
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
    }

    validationTimeoutRef.current = setTimeout(() => {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        if (name === 'email' && !validateEmail(value)) {
          newErrors.email = 'Invalid email format';
        } else if (name === 'phone' && !validatePhone(value)) {
          newErrors.phone = 'Invalid phone format';
        } else {
          delete newErrors[name];
        }
        return newErrors;
      });
    }, 300);
  }, [validateEmail, validatePhone]);

  // Optimized file upload handler
  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024;
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    
    // Process files in a separate task to avoid blocking the main thread
    setTimeout(() => {
      const validFiles = files.filter(file => {
        if (file.size > maxSize) {
          alert(`${file.name} is too large. Max size is 10MB.`);
          return false;
        }
        if (!allowedTypes.includes(file.type)) {
          alert(`${file.name} has invalid format. Use PDF, JPG, or PNG.`);
          return false;
        }
        return true;
      });

      setUploadedFiles(prev => [...prev, ...validFiles]);
      
      if (formErrors.files) {
        setFormErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.files;
          return newErrors;
        });
      }
    }, 0);
  }, [formErrors.files]);

  // Optimized file removal handler
  const removeFile = useCallback((index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Optimized file upload to Supabase
  const uploadFilesToSupabase = useCallback(async (files) => {
    const uploadedUrls = [];
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { data: _data, error } = await supabase.storage
        .from('application-documents')
        .upload(filePath, file);

      if (error) {
        console.error('Upload error:', error);
        throw new Error(`Failed to upload ${file.name}`);
      }

      const { data: urlData } = supabase.storage
        .from('application-documents')
        .getPublicUrl(filePath);

      uploadedUrls.push({
        name: file.name,
        url: urlData.publicUrl,
        path: filePath
      });
    }

    return uploadedUrls;
  }, []);

  // Optimized application submit handler
  const handleApplicationSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateApplicationForm()) {
      setSubmitStatus({ type: 'error', message: 'Please fix the errors above' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // 🔍 DEBUG: Log what we're about to submit
    console.group('📦 Application Submission Started');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Form data:', formData);
    console.groupEnd();

    try {
      console.time('⏱️ Application insert operation');
      
      const { data, error } = await supabase
        .from('applications')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            id_number: formData.idNumber,
            program: formData.program,
            motivation: formData.motivation || '',
            status: 'pending'
          }
        ])
        .select();

      console.timeEnd('⏱️ Application insert operation');

      if (error) {
        // 🔍 DEBUG: Detailed error logging
        console.group('❌ Application Insert Error');
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Error details:', error.details);
        console.error('Full error object:', error);
        
        if (error.code === '401' || error.code === '403' || error.code === 'PGRST301' || error.code === '42501') {
          console.error('💡 RLS POLICY ISSUE DETECTED!');
          console.error('Solution: Run this SQL in Supabase Dashboard → SQL Editor:');
          console.error(`
CREATE POLICY "Allow anonymous application submissions"
ON applications
FOR INSERT
TO anon
WITH CHECK (true);
          `);
        }
        console.groupEnd();
        
        throw error;
      }

      console.log('✅ Application submitted successfully!', data);

      setSubmitStatus({ 
        type: 'success', 
        message: 'Application submitted successfully! We will contact you soon.' 
      });
      
      // Use setTimeout to avoid blocking the main thread during state updates
      setTimeout(() => {
        setShowApplicationForm(false);
        setFormData({});
        setSubmitStatus(null);
        setFormErrors({});
      }, 3000);

    } catch (error) {
      console.group('❌ Application submission failed - DETAILED ERROR');
      console.error('Raw error object:', error);
      console.error('Error stringified:', JSON.stringify(error, null, 2));
      console.error('Error code:', error?.code);
      console.error('Error message:', error?.message);
      console.error('Error details:', error?.details);
      console.error('Error hint:', error?.hint);
      console.error('Error status:', error?.status);
      console.error('Error statusCode:', error?.statusCode);
      console.groupEnd();
      
      let errorMessage = 'Failed to submit application. ';
      
      // Check multiple possible error code properties
      const errorCode = error?.code || error?.statusCode || error?.status;
      
      if (errorCode === '401' || errorCode === 401 || 
          errorCode === '403' || errorCode === 403 || 
          errorCode === 'PGRST301' || errorCode === '42501') {
        errorMessage += 'Permission denied. ';
        console.error('🔒 RLS POLICY BLOCKING! Run the SQL fix in Supabase Dashboard.');
      } else {
        errorMessage += (error?.message || error?.error_description || 'Please try again.');
      }
      
      setSubmitStatus({ 
        type: 'error', 
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateApplicationForm]);

  // Optimized admission submit handler
  const handleAdmissionSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateAdmissionForm()) {
      setSubmitStatus({ type: 'error', message: 'Please fix the errors above' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // 🔍 DEBUG: Log what we're about to submit
    console.group('📦 Admission Submission Started');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Form data:', formData);
    console.log('Files to upload:', uploadedFiles.length);
    console.groupEnd();

    try {
      console.time('⏱️ File upload operation');
      const documentUrls = await uploadFilesToSupabase(uploadedFiles);
      console.timeEnd('⏱️ File upload operation');
      console.log('✅ Files uploaded:', documentUrls);

      console.time('⏱️ Admission insert operation');
      const { data, error } = await supabase
        .from('admissions')
        .insert([
          {
            ref_number: formData.refNumber,
            full_name: formData.fullName,
            email: formData.admissionEmail,
            documents_uploaded: true,
            document_urls: documentUrls,
            status: 'pending'
          }
        ])
        .select();

      console.timeEnd('⏱️ Admission insert operation');

      if (error) {
        // 🔍 DEBUG: Detailed error logging
        console.group('❌ Admission Insert Error');
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Error details:', error.details);
        console.error('Full error object:', error);
        
        if (error.code === '401' || error.code === '403' || error.code === 'PGRST301' || error.code === '42501') {
          console.error('💡 RLS POLICY ISSUE DETECTED!');
          console.error('Solution: Run this SQL in Supabase Dashboard → SQL Editor:');
          console.error(`
CREATE POLICY "Allow anonymous admission submissions"
ON admissions
FOR INSERT
TO anon
WITH CHECK (true);
          `);
        }
        console.groupEnd();
        
        throw error;
      }

      console.log('✅ Admission submitted successfully!', data);

      setSubmitStatus({ 
        type: 'success', 
        message: 'Admission request submitted! Check your email for further instructions.' 
      });
      
      // Use setTimeout to avoid blocking the main thread during state updates
      setTimeout(() => {
        setShowAdmissionForm(false);
        setFormData({});
        setUploadedFiles([]);
        setSubmitStatus(null);
        setFormErrors({});
      }, 3000);

    } catch (error) {
      console.error('❌ Admission submission failed:', error);
      
      let errorMessage = 'Failed to submit admission request. ';
      
      if (error.code === '401' || error.code === '403' || error.code === 'PGRST301' || error.code === '42501') {
        errorMessage += 'Permission denied. Please contact support.';
      } else {
        errorMessage += error.message || 'Please try again.';
      }
      
      setSubmitStatus({ 
        type: 'error', 
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, uploadedFiles, validateAdmissionForm, uploadFilesToSupabase]);

  // Memoize form components to prevent unnecessary re-renders
  const ApplicationForm = useMemo(() => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full my-8 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">APPLICATION FORM</h2>
          <button 
            onClick={() => {
              setShowApplicationForm(false);
              setFormData({});
              setFormErrors({});
              setSubmitStatus(null);
            }} 
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>
        
        {submitStatus && (
          <div className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
            submitStatus.type === 'success' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {submitStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{submitStatus.message}</span>
          </div>
        )}

        <form onSubmit={handleApplicationSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName || ''}
                placeholder="First Name *" 
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  formErrors.firstName ? 'border-red-500' : ''
                }`}
                disabled={isSubmitting}
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
              )}
            </div>
            <div>
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName || ''}
                placeholder="Last Name *" 
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  formErrors.lastName ? 'border-red-500' : ''
                }`}
                disabled={isSubmitting}
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
              )}
            </div>
          </div>
          
          <div>
            <input 
              type="email" 
              name="email"
              value={formData.email || ''}
              placeholder="Email Address *" 
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                formErrors.email ? 'border-red-500' : ''
              }`}
              disabled={isSubmitting}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          <div>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone || ''}
              placeholder="Phone Number (e.g., +254712345678) *" 
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                formErrors.phone ? 'border-red-500' : ''
              }`}
              disabled={isSubmitting}
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
            )}
          </div>

          <div>
            <input 
              type="text" 
              name="idNumber"
              value={formData.idNumber || ''}
              placeholder="ID/Passport Number *" 
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                formErrors.idNumber ? 'border-red-500' : ''
              }`}
              disabled={isSubmitting}
            />
            {formErrors.idNumber && (
              <p className="text-red-500 text-sm mt-1">{formErrors.idNumber}</p>
            )}
          </div>
          
          <div>
            <select 
              name="program"
              value={formData.program || ''}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                formErrors.program ? 'border-red-500' : ''
              }`}
              disabled={isSubmitting}
            >
              <option value="">Select Program *</option>
              {PROGRAMS.map((program, idx) => (
                <option key={idx} value={program.name}>{program.name}</option>
              ))}
            </select>
            {formErrors.program && (
              <p className="text-red-500 text-sm mt-1">{formErrors.program}</p>
            )}
          </div>
          
          <textarea 
            name="motivation"
            value={formData.motivation || ''}
            placeholder="Why do you want to join this program? (Optional)" 
            rows={4}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            disabled={isSubmitting}
          />
          
          <div className="flex gap-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  SUBMITTING...
                </>
              ) : (
                'SUBMIT APPLICATION'
              )}
            </button>
            <button 
              type="button"
              onClick={() => {
                setShowApplicationForm(false);
                setFormData({});
                setFormErrors({});
                setSubmitStatus(null);
              }}
              disabled={isSubmitting}
              className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-lg hover:bg-gray-400 transition font-semibold disabled:opacity-50"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  ), [formData, formErrors, isSubmitting, submitStatus, handleInputChange, handleApplicationSubmit]);

  const AdmissionForm = useMemo(() => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full my-8 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">ADMISSION LETTER REQUEST</h2>
          <button 
            onClick={() => {
              setShowAdmissionForm(false);
              setFormData({});
              setUploadedFiles([]);
              setFormErrors({});
              setSubmitStatus(null);
            }} 
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>
        
        {submitStatus && (
          <div className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
            submitStatus.type === 'success' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {submitStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{submitStatus.message}</span>
          </div>
        )}

        <form onSubmit={handleAdmissionSubmit} className="space-y-4">
          <div>
            <input 
              type="text" 
              name="refNumber"
              value={formData.refNumber || ''}
              placeholder="Application Reference Number *" 
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                formErrors.refNumber ? 'border-red-500' : ''
              }`}
              disabled={isSubmitting}
            />
            {formErrors.refNumber && (
              <p className="text-red-500 text-sm mt-1">{formErrors.refNumber}</p>
            )}
          </div>

          <div>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName || ''}
              placeholder="Full Name *" 
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                formErrors.fullName ? 'border-red-500' : ''
              }`}
              disabled={isSubmitting}
            />
            {formErrors.fullName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
            )}
          </div>

          <div>
            <input 
              type="email" 
              name="admissionEmail"
              value={formData.admissionEmail || ''}
              placeholder="Email Address *" 
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                formErrors.admissionEmail ? 'border-red-500' : ''
              }`}
              disabled={isSubmitting}
            />
            {formErrors.admissionEmail && (
              <p className="text-red-500 text-sm mt-1">{formErrors.admissionEmail}</p>
            )}
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Upload required documents: KCPE Certificate, ID Copy, Passport Photos (2), Birth Certificate
            </p>
          </div>
          
          <div>
            <label className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition block ${
              formErrors.files ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}>
              <input 
                type="file" 
                multiple 
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isSubmitting}
              />
              <Upload className="mx-auto mb-2 text-gray-400" size={48} />
              <p className="text-gray-600 dark:text-gray-400">Click to upload documents or drag and drop</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">PDF, JPG, PNG (Max 10MB per file)</p>
            </label>
            {formErrors.files && (
              <p className="text-red-500 text-sm mt-1">{formErrors.files}</p>
            )}
          </div>

          {uploadedFiles.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Uploaded Files ({uploadedFiles.length}):</h4>
              <ul className="space-y-2">
                {uploadedFiles.map((file, idx) => (
                  <li key={idx} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <FileText size={16} />
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="text-red-500 hover:text-red-700"
                      disabled={isSubmitting}
                    >
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex gap-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  UPLOADING...
                </>
              ) : (
                'SUBMIT FOR ADMISSION'
              )}
            </button>
            <button 
              type="button"
              onClick={() => {
                setShowAdmissionForm(false);
                setFormData({});
                setUploadedFiles([]);
                setFormErrors({});
                setSubmitStatus(null);
              }}
              disabled={isSubmitting}
              className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-lg hover:bg-gray-400 transition font-semibold disabled:opacity-50"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  ), [formData, formErrors, isSubmitting, submitStatus, uploadedFiles, handleInputChange, handleFileUpload, removeFile, handleAdmissionSubmit]);

  // Program details modal
  const ProgramDetailsModal = useMemo(() => {
    if (!selectedProgram) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full my-8 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedProgram.name}</h2>
            <button 
              onClick={() => setSelectedProgram(null)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Duration</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedProgram.duration}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Level</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedProgram.level}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-300">{selectedProgram.description}</p>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Requirements</h3>
              <p className="text-gray-700 dark:text-gray-300">{selectedProgram.requirements}</p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Course Modules</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {selectedProgram.modules.map((module, idx) => (
                  <li key={idx}>{module}</li>
                ))}
              </ul>
            </div>
            
            {selectedProgram.hasPractical && (
              <div className="bg-orange-50 dark:bg-orange-900 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Practical Training</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  This program includes hands-on practical training sessions where students will apply theoretical knowledge in real-world scenarios. 
                  Practical sessions are conducted in our modern workshops under the guidance of experienced instructors.
                </p>
              </div>
            )}
            
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  setSelectedProgram(null);
                  setShowApplicationForm(true);
                  setFormData({...formData, program: selectedProgram.name});
                }}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                APPLY FOR THIS PROGRAM
              </button>
              <button 
                onClick={() => setSelectedProgram(null)}
                className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [selectedProgram, formData, setFormData]);

  // Memoize the navigation component to prevent unnecessary re-renders
  const Navigation = useMemo(() => (
    <nav className="hidden lg:flex gap-1 mt-4 flex-wrap">
      {Object.keys(MENU_ITEMS).map((item) => (
        <div
          key={item}
          className="relative group"
          onMouseEnter={() => setActiveDropdown(item)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <button className="px-4 py-2 hover:bg-blue-600 hover:text-white rounded-lg transition font-bold text-sm">
            {item}
          </button>
          
          {activeDropdown === item && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 z-50 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{MENU_ITEMS[item].description}</p>
              <ul className="space-y-2">
                {MENU_ITEMS[item].links.map((link, idx) => (
                  <li key={idx}>
                    {item === 'PROGRAMS' ? (
                      <div 
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm block py-1 cursor-pointer"
                        onClick={() => setSelectedProgram(link)}
                      >
                        <div className="flex justify-between items-center">
                          <span>{link.name}</span>
                          <ChevronRight size={16} />
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {link.duration} • {link.level}
                        </div>
                      </div>
                    ) : (
                      <div className="group/submenu">
                        <div className="text-blue-600 dark:text-blue-400 hover:underline text-sm block py-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <span>{link.name}</span>
                            <ChevronRight size={16} />
                          </div>
                        </div>
                        <div className="absolute left-full top-0 ml-2 w-80 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 z-50 border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{link.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{link.content}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-400">{link.details}</p>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </nav>
  ), [activeDropdown, setSelectedProgram]);

  // Memoize the mobile navigation component
  const MobileNavigation = useMemo(() => {
    if (mobileDetailPage) {
      return (
        <div className="lg:hidden mt-4 pb-4">
          <div className="flex items-center gap-2 mb-4">
            <button 
              onClick={() => setMobileDetailPage(null)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft size={20} />
            </button>
            <h3 className="font-bold text-lg">{mobileDetailPage.title}</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <p className="text-gray-600 dark:text-gray-300 mb-4">{mobileDetailPage.content}</p>
            <p className="text-gray-700 dark:text-gray-400">{mobileDetailPage.details}</p>
          </div>
        </div>
      );
    }
    
    return (
      <nav className="lg:hidden mt-4 pb-4 space-y-2">
        {Object.keys(MENU_ITEMS).map((item) => (
          <div key={item} className="border-b border-gray-200 dark:border-gray-700 pb-2">
            <button 
              className="w-full text-left px-4 py-2 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex items-center justify-between transition-all duration-200 hover:translate-x-1"
              onClick={() => {
                if (item === 'PROGRAMS') {
                  setMobileDetailPage({
                    title: item,
                    content: MENU_ITEMS[item].description,
                    details: "Select a program below to view details:"
                  });
                  setMobileDetailContent(MENU_ITEMS[item].links);
                } else {
                  setMobileDetailPage({
                    title: item,
                    content: MENU_ITEMS[item].description,
                    details: "Select an option below to view details:"
                  });
                  setMobileDetailContent(MENU_ITEMS[item].links);
                }
              }}
            >
              {item}
              <ChevronRight size={20} />
            </button>
          </div>
        ))}
        
        {mobileDetailContent && (
          <div className="mt-4 space-y-2">
            {mobileDetailContent.map((link, idx) => (
              <button
                key={idx}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex items-center justify-between transition-all duration-200 hover:translate-x-1"
                onClick={() => {
                  if (mobileDetailPage.title === 'PROGRAMS') {
                    setSelectedProgram(link);
                    setMobileDetailPage(null);
                    setMobileDetailContent(null);
                  } else {
                    setMobileDetailPage({
                      title: link.name,
                      content: link.content,
                      details: link.details
                    });
                    setMobileDetailContent(null);
                  }
                }}
              >
                <span>{link.name}</span>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        )}
        
        <button onClick={() => setDarkMode(!darkMode)} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex items-center gap-2">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </nav>
    );
  }, [darkMode, mobileDetailPage, mobileDetailContent, setSelectedProgram]);

  // Memoize the program cards to prevent unnecessary re-renders
  const ProgramCards = useMemo(() => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PROGRAMS.map((program, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
          <div className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 font-bold text-xl">
            {idx + 1}
          </div>
          <h3 className="text-xl font-bold mb-3">{program.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            <span className="font-semibold">Duration:</span> {program.duration}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            <span className="font-semibold">Level:</span> {program.level}
          </p>
          <button 
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
            onClick={() => setSelectedProgram(program)}
          >
            Learn More <ChevronRight size={16} />
          </button>
        </div>
      ))}
    </div>
  ), [setSelectedProgram]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  IVTC
                </div>
                <div>
                  <h1 className="text-lg md:text-2xl font-bold">ILKARIAN VOCATIONAL TRAINING CENTRE</h1>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Excellence in Skills Development</p>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-4">
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {Navigation}
            {mobileMenuOpen && MobileNavigation}
          </div>
        </header>

        <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}></div>
          <div className="relative z-10 text-center text-white px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">TRANSFORM YOUR FUTURE</h2>
            <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow">
              Quality Vocational Training for Real-World Success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowApplicationForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition transform hover:scale-105 shadow-lg"
              >
                APPLY NOW
              </button>
              <button 
                onClick={() => setShowAdmissionForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition transform hover:scale-105 shadow-lg"
              >
                ADMISSION
              </button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">ADMISSION REQUIREMENTS</h2>
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
              <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://i.ibb.co/VcXR4zsG/20231021-160826.jpg"
                  alt="Admission Requirements" 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 h-96 rounded-lg items-center justify-center border-4 border-dashed border-gray-400 dark:border-gray-500">
                  <div className="text-center text-gray-600 dark:text-gray-300">
                    <FileText size={64} className="mx-auto mb-4" />
                    <p className="text-lg font-bold">REQUIREMENTS IMAGE</p>
                    <p className="text-sm mt-2">Replace the image URL in the code with your uploaded image</p>
                  </div>
                </div>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="font-bold text-xl mb-4">GENERAL REQUIREMENTS:</h3>
                <ul className="space-y-2">
                  <li>Minimum KCPE Certificate or equivalent</li>
                  <li>Completed application form</li>
                  <li>Two recent passport-size photographs</li>
                  <li>Copy of National ID or Birth Certificate</li>
                  <li>Application fee payment receipt</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">OUR PROGRAMS</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Industry-focused training programs designed to equip you with practical skills for immediate employment
            </p>
            {ProgramCards}
          </div>
        </section>

        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">WHY CHOOSE ILKARIAN VTC?</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎓</span>
                </div>
                <h3 className="text-xl font-bold mb-3">EXPERT INSTRUCTORS</h3>
                <p className="text-blue-100">Learn from industry professionals with years of practical experience</p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🔧</span>
                </div>
                <h3 className="text-xl font-bold mb-3">MODERN FACILITIES</h3>
                <p className="text-blue-100">State-of-the-art workshops and equipment for hands-on training</p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">💼</span>
                </div>
                <h3 className="text-xl font-bold mb-3">JOB PLACEMENT</h3>
                <p className="text-blue-100">Career support and connections to help you find employment</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">GET IN TOUCH</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                <MapPin className="mx-auto mb-4 text-blue-600" size={48} />
                <h3 className="font-bold mb-2 text-lg">LOCATION</h3>
                <p className="text-gray-600 dark:text-gray-400">Nairobi, Kenya</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Visit us during business hours</p>
              </div>
              <div className="text-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                <Phone className="mx-auto mb-4 text-blue-600" size={48} />
                <h3 className="font-bold mb-2 text-lg">PHONE</h3>
                <p className="text-gray-600 dark:text-gray-400">+254 XXX XXX XXX</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Mon-Fri: 8AM - 5PM</p>
              </div>
              <div className="text-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                <Mail className="mx-auto mb-4 text-blue-600" size={48} />
                <h3 className="font-bold mb-2 text-lg">EMAIL</h3>
                <p className="text-gray-600 dark:text-gray-400">info@ilkarianvtc.ac.ke</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">We reply within 24 hours</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">RELATED INSTITUTIONS & RESOURCES</h2>
            <div className="max-w-2xl mx-auto bg-blue-800 rounded-lg p-8 shadow-xl">
              <p className="text-center text-gray-300 mb-6">Connect with our partner institutions and resources</p>
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between p-4 bg-blue-700 rounded-lg hover:bg-blue-600 transition">
                  <span className="font-semibold">Partner Institution 1 - To be added</span>
                  <ExternalLink size={20} />
                </a>
                <a href="#" className="flex items-center justify-between p-4 bg-blue-700 rounded-lg hover:bg-blue-600 transition">
                  <span className="font-semibold">Partner Institution 2 - To be added</span>
                  <ExternalLink size={20} />
                </a>
                <a href="#" className="flex items-center justify-between p-4 bg-blue-700 rounded-lg hover:bg-blue-600 transition">
                  <span className="font-semibold">Partner Institution 3 - To be added</span>
                  <ExternalLink size={20} />
                </a>
                <a href="#" className="flex items-center justify-between p-4 bg-blue-700 rounded-lg hover:bg-blue-600 transition">
                  <span className="font-semibold">Partner Institution 4 - To be added</span>
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">ABOUT ILKARIAN VTC</h3>
                <p className="text-gray-400 text-sm">
                  Leading vocational training institution in Kenya, committed to excellence in skills development and student success.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">QUICK LINKS</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Programs</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Admissions</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">CONTACT INFO</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Nairobi, Kenya</li>
                  <li>+254 XXX XXX XXX</li>
                  <li>info@ilkarianvtc.ac.ke</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="text-gray-400 text-sm">&copy; 2025 Ilkarian Vocational Training Centre. All Rights Reserved.</p>
              <div className="flex justify-center gap-4 mt-4">
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg hover:bg-gray-800 transition">
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </div>
        </footer>

        {showApplicationForm && ApplicationForm}
        {showAdmissionForm && AdmissionForm}
        {selectedProgram && ProgramDetailsModal}
      </div>
    </div>
  );
}