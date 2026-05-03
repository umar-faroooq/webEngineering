import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { constants } from '../../utils/constants';
import { FiMail, FiMapPin, FiLinkedin, FiGithub, FiSend } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Replace with actual EmailJS serviceID, templateID, and publicKey
    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current, 'YOUR_PUBLIC_KEY')
    setTimeout(() => {
      setStatus('success');
      e.target.reset();
      setTimeout(() => setStatus(''), 5000);
    }, 1500); // Simulated delay
  };

  return (
    <section id="contact" className="contact-section section-padding">
      <h2 className="section-title animate-on-scroll fade-up">Get In Touch</h2>
      
      <div className="contact-container">
        <div className="contact-info animate-on-scroll fade-right">
          <h3>Let's talk about everything!</h3>
          <p>Don't like forms? Send me an email instead.</p>
          
          <div className="info-item">
            <FiMail className="info-icon" />
            <a href={`mailto:${constants.EMAIL}`}>{constants.EMAIL}</a>
          </div>
          
          <div className="info-item">
            <FiMapPin className="info-icon" />
            <span>Mirpur, AJK, Pakistan</span>
          </div>

          <div className="social-links">
            <a href={constants.LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              <FiLinkedin />
            </a>
            <a href={`https://github.com/${constants.GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
              <FiGithub />
            </a>
          </div>
        </div>

        <div className="contact-form-container animate-on-scroll fade-left">
          <form ref={formRef} onSubmit={sendEmail} className="contact-form">
            <div className="form-group">
              <input type="text" name="user_name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" name="user_email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <input type="text" name="subject" placeholder="Subject" required />
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Message" rows="5" required></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : <>Send Message <FiSend /></>}
            </button>
            
            {status === 'success' && (
              <p className="success-msg">Message sent successfully!</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
