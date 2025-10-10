import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Download, FileText, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

export default function IlkarianVTC() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showAdmissionForm, setShowAdmissionForm] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const programs = [
    { name: 'HOSPITALITY & HOTEL MANAGEMENT', duration: '6 Months', level: 'Certificate' },
    { name: 'INFORMATION TECHNOLOGY', duration: '6 Months', level: 'Certificate' },
    { name: 'FASHION & DESIGN', duration: '6 Months', level: 'Certificate' },
    { name: 'ELECTRICAL INSTALLATION', duration: '6 Months', level: 'Certificate' },
    { name: 'PLUMBING', duration: '6 Months', level: 'Certificate' },
    { name: 'WELDING & FABRICATION', duration: '6 Months', level: 'Certificate' },
  ];

  const menuItems = {
    'ABOUT US': {
      description: 'Ilkarian Vocational Training Centre is a premier private institution dedicated to providing quality vocational education and practical skills training. We empower students with industry-relevant knowledge and hands-on experience.',
      links: ['Our Mission', 'Our Vision', 'History', 'Accreditation']
    },
    'PROGRAMS': {
      description: 'We offer comprehensive vocational training programs designed to meet industry standards and prepare students for successful careers.',
      links: programs.map(p => p.name)
    },
    'REQUIREMENTS': {
      description: 'Admission requirements include a minimum of KCPE certificate, completed application, 2 passport photos, and birth certificate copy.',
      links: ['General Requirements', 'Program-Specific Requirements', 'International Students']
    },
    'CONTACT': {
      description: 'Get in touch with us for inquiries, admissions information, or to schedule a campus visit.',
      links: ['Phone: +254 XXX XXX XXX', 'Email: info@ilkarianvtc.ac.ke', 'Location: Nairobi, Kenya']
    },
    'VISIT US': {
      description: 'Schedule a visit to our modern campus facilities. See our workshops, labs, and meet our experienced instructors.',
      links: ['Schedule a Visit', 'Virtual Tour', 'Directions', 'Campus Map']
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    alert('APPLICATION SUBMITTED SUCCESSFULLY! We will contact you soon.');
    setShowApplicationForm(false);
    setFormData({});
  };

  const handleAdmissionSubmit = (e) => {
    e.preventDefault();
    console.log('Admission request submitted:', formData);
    alert('ADMISSION REQUEST SUBMITTED! Please check your email for further instructions.');
    setShowAdmissionForm(false);
    setFormData({});
  };

  const ApplicationForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full my-8 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">APPLICATION FORM</h2>
          <button onClick={() => setShowApplicationForm(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              name="firstName"
              placeholder="First Name *" 
              onChange={handleInputChange}
              className="p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
            />
            <input 
              type="text" 
              name="lastName"
              placeholder="Last Name *" 
              onChange={handleInputChange}
              className="p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
            />
          </div>
          
          <input 
            type="email" 
            name="email"
            placeholder="Email Address *" 
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
          <input 
            type="tel" 
            name="phone"
            placeholder="Phone Number *" 
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
          <input 
            type="text" 
            name="idNumber"
            placeholder="ID/Passport Number *" 
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
          
          <select 
            name="program"
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select Program *</option>
            {programs.map((program, idx) => (
              <option key={idx} value={program.name}>{program.name}</option>
            ))}
          </select>
          
          <textarea 
            name="motivation"
            placeholder="Why do you want to join this program?" 
            rows={4}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          
          <div className="flex gap-4">
            <button 
              onClick={handleApplicationSubmit}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              SUBMIT APPLICATION
            </button>
            <button 
              onClick={() => setShowApplicationForm(false)}
              className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              CANCEL
            </button>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t dark:border-gray-700">
          <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-semibold">
            <Download size={20} />
            DOWNLOAD APPLICATION FORM (PDF)
          </button>
        </div>
      </div>
    </div>
  );

  const AdmissionForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full my-8 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">ADMISSION LETTER REQUEST</h2>
          <button onClick={() => setShowAdmissionForm(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <input 
            type="text" 
            name="refNumber"
            placeholder="Application Reference Number *" 
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
          <input 
            type="text" 
            name="fullName"
            placeholder="Full Name *" 
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
          <input 
            type="email" 
            name="admissionEmail"
            placeholder="Email Address *" 
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
          
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Upload required documents: KCPE Certificate, ID Copy, Passport Photos (2), Birth Certificate
            </p>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition">
            <FileText className="mx-auto mb-2 text-gray-400" size={48} />
            <p className="text-gray-600 dark:text-gray-400">Click to upload documents or drag and drop</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">PDF, JPG, PNG (Max 10MB)</p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={handleAdmissionSubmit}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              SUBMIT FOR ADMISSION
            </button>
            <button 
              onClick={() => setShowAdmissionForm(false)}
              className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              CANCEL
            </button>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t dark:border-gray-700">
          <button className="flex items-center gap-2 text-green-600 dark:text-green-400 hover:underline font-semibold">
            <Download size={20} />
            DOWNLOAD ADMISSION FORM (PDF)
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  IVTC
                </div>
                <div>
                  <h1 className="text-lg md:text-2xl font-bold">ILKARIAN VOCATIONAL TRAINING CENTRE</h1>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Excellence in Skills Development</p>
                </div>
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-4">
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-1 mt-4 flex-wrap">
              {Object.keys(menuItems).map((item) => (
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
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{menuItems[item].description}</p>
                      <ul className="space-y-2">
                        {menuItems[item].links.map((link, idx) => (
                          <li key={idx}>
                            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline text-sm block py-1">
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <nav className="lg:hidden mt-4 pb-4 space-y-2">
                {Object.keys(menuItems).map((item) => (
                  <div key={item} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                    <button className="w-full text-left px-4 py-2 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                      {item}
                    </button>
                  </div>
                ))}
                <button onClick={() => setDarkMode(!darkMode)} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex items-center gap-2">
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </nav>
            )}
          </div>
        </header>

        {/* Hero Section */}
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

        {/* Requirements Section with Image Placeholder */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">ADMISSION REQUIREMENTS</h2>
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
              {/* Placeholder for uploaded image */}
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

        {/* Programs Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">OUR PROGRAMS</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Industry-focused training programs designed to equip you with practical skills for immediate employment
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program, idx) => (
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
                  <button className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    Learn More →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
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

        {/* Contact Section */}
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

        {/* External Links Section */}
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

        {/* Footer */}
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

        {/* Forms */}
        {showApplicationForm && <ApplicationForm />}
        {showAdmissionForm && <AdmissionForm />}
      </div>
    </div>
  );
}