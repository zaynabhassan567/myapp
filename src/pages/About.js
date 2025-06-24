import React, { useRef, useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { FaBriefcase, FaRocket, FaQuoteLeft, FaUsers } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function CountUp({ end, duration = 1200 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    let raf;
    function animate() {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        raf = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    }
    animate();
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  return <span>{count}</span>;
}

function About() {
  const growthRef = useRef();
  const [animate, setAnimate] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.3 }
    );
    if (growthRef.current) observer.observe(growthRef.current);
    return () => observer.disconnect();
  }, []);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 1800);
  };

  // Contact form validation
  const nameRegExp = /^[A-Za-z\s]+$/;
  const contactValidation = Yup.object({
    name: Yup.string()
      .matches(nameRegExp, 'Name must only contain letters and spaces')
      .min(4, 'Name must be at least 4 characters')
      .required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    message: Yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
  });

  return (
    <div className="about-page pro-about-bg">
      {toast.show && <div className="toast-msg">{toast.message}</div>}
      <section className="about-hero">
        <img src="/images/logo.png" alt="ABC Consultancy Logo Large" className="about-hero-img" />
        <div className="about-hero-text">
          <div className="about-hero-title-row">
            <h1>ABC Consultancy</h1>
          </div>
          <p>Empowering businesses to grow, innovate, and succeed.</p>
        </div>
      </section>
      <Navigation />
      <main className="about-main no-card-about">
        <section className="about-company-section no-card-section" data-aos="fade-up">
          <h2><FaBriefcase className="about-icon" /> Who We Are</h2>
          <p>
            <strong>ABC Consultancy</strong> is a leading provider of business solutions, specializing in digital transformation, strategic planning, and operational excellence. Since our founding, we have empowered organizations to achieve their goals through innovative technology and expert guidance.
          </p>
        </section>
        <section className="about-growth-section no-card-section" ref={growthRef} data-aos="fade-up">
          <h2><FaRocket className="about-icon" /> Our Growth</h2>
          <p>
            Over the past decade, ABC Consultancy has grown from a small team of passionate professionals to a trusted partner for hundreds of clients worldwide. Our commitment to excellence and client success has driven our expansion into new markets and industries.
          </p>
          <div className="growth-bubbles-row">
            <div className="growth-bubble">
              <span className="bubble-num">{animate ? <CountUp end={500} /> : 0}+</span>
              <span className="bubble-label">Successful Projects</span>
            </div>
            <div className="growth-bubble">
              <span className="bubble-num">{animate ? <CountUp end={200} /> : 0}+</span>
              <span className="bubble-label">Satisfied Clients</span>
            </div>
            <div className="growth-bubble">
              <span className="bubble-num">{animate ? <CountUp end={10} /> : 0}+</span>
              <span className="bubble-label">Years of Experience</span>
            </div>
          </div>
        </section>
        <section className="about-reviews-section no-card-section" data-aos="fade-up">
          <h2><FaQuoteLeft className="about-icon" /> What Our Clients Say</h2>
          <div className="reviews-grid no-card-reviews">
            <div className="review-card no-card-review" data-aos="fade-right">
              <p className="review-msg">“ABC Consultancy transformed our business processes and helped us scale efficiently. Their team is knowledgeable and always available.”</p>
              <div className="review-client">- Sarah K., CEO, TechNova</div>
            </div>
            <div className="review-card no-card-review" data-aos="fade-up">
              <p className="review-msg">“We saw a 40% increase in productivity after implementing their solutions. Highly recommended!”</p>
              <div className="review-client">- Ahmed R., Operations Head, FinEdge</div>
            </div>
            <div className="review-card no-card-review" data-aos="fade-left">
              <p className="review-msg">“Professional, reliable, and innovative. ABC Consultancy is our go-to partner for all things digital.”</p>
              <div className="review-client">- Priya S., CTO, MarketLeap</div>
            </div>
          </div>
        </section>
        <section className="about-cta-section" data-aos="zoom-in">
          <h2><FaUsers className="about-icon" /> Let's Work Together</h2>
          <p>Ready to take your business to the next level?{' '}
            <a href="#contact" className="about-cta-link" onClick={e => { e.preventDefault(); setShowContactModal(true); }}>Contact us today!</a>
          </p>
        </section>
      </main>
      {/* Contact Modal */}
      {showContactModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setShowContactModal(false)}>✖️</button>
            <h2 style={{marginBottom: '16px'}}>Contact Us</h2>
            <Formik
              initialValues={{ name: '', email: '', message: '' }}
              validationSchema={contactValidation}
              onSubmit={(values, actions) => {
                setShowContactModal(false);
                showToast('Message sent successfully!');
                actions.resetForm();
              }}
            >
              {() => (
                <Form className="add-employee-form modal-form">
                  <Field name="name" placeholder="Your Name" />
                  <ErrorMessage name="name" component="div" className="form-error" />
                  <Field name="email" placeholder="Your Email" />
                  <ErrorMessage name="email" component="div" className="form-error" />
                  <Field as="textarea" name="message" placeholder="Your Message" rows={4} style={{resize:'vertical'}} />
                  <ErrorMessage name="message" component="div" className="form-error" />
                  <div style={{display:'flex', gap:'8px', marginTop:'8px', justifyContent:'center'}}>
                    <button type="submit" className="add-btn">Send</button>
                    <button type="button" className="cancel-btn" onClick={() => setShowContactModal(false)}>Cancel</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
