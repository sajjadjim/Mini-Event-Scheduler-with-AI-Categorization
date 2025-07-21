import { useState, useEffect } from 'react';

type VisibilityMap = {
  hero?: boolean;
  mission?: boolean;
  benefits?: boolean;
  testimonials?: boolean;
  cta?: boolean;
};

const About = () => {
  const [isVisible, setIsVisible] = useState<VisibilityMap>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 mt-10 to-blue-50 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 space-y-20 w-full max-w-7xl mx-auto px-4 pt-20 pb-32">
        {/* Hero Section */}
        <section
          id="hero"
          data-animate
          className={`relative bg-gradient-to-r from-indigo-400 via-teal-300 to-teal-600 text-white text-center p-12 rounded-3xl shadow-2xl transform transition-all duration-1000 ${
            isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        >
          <div className="absolute inset-0 bg-black opacity-10 rounded-3xl"></div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 animate-fade-in-up">
              About Easy Sub
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8 animate-fade-in-up animation-delay-500">
              Easy Sub delivers a curated subscription box filled with exciting products from local businesses, tailored just for you. It's all about discovering new
              favorites and supporting the community.
            </p>
            <button className="group relative px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-bounce-subtle">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section
          id="mission"
          data-animate
          className={`text-center py-16 transform transition-all duration-1000 ${
            isVisible.mission ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Our Mission & Vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '💡',
                title: 'Innovative Solutions',
                desc: 'We create custom-tailored subscription boxes that bring joy and excitement while providing new experiences each month.',
                delay: '0s',
              },
              {
                icon: '👥',
                title: 'Community-Focused',
                desc: 'Supporting local businesses is at the heart of our service, and we foster a thriving marketplace for customers and vendors.',
                delay: '0.2s',
              },
              {
                icon: '🏆',
                title: 'Top Quality',
                desc: 'Each box is curated with only the best products, ensuring quality, value, and satisfaction in every delivery.',
                delay: '0.4s',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: item.delay }}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section
          id="benefits"
          data-animate
          className={`py-16 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl shadow-xl transform transition-all duration-1000 ${
            isVisible.benefits ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Why Choose Easy Sub?</h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-8 px-8">
            {[
              'Tailored experiences that surprise and delight every month.',
              'Support small local businesses and discover hidden gems.',
              'High-quality, handpicked products delivered right to your doorstep.',
            ].map((benefit, index) => (
              <div
                key={index}
                className="group flex gap-6 items-start p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 animate-fade-in-right"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-3xl text-emerald-500 group-hover:scale-110 transition-transform duration-300">✔️</div>
                <p className="text-gray-700 text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          data-animate
          className={`py-16 text-center transform transition-all duration-1000 ${
            isVisible.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold mb-16 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">What Our Customers Say</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              {
                text: 'I look forward to my Easy Sub box every month. The items are always thoughtful and a great mix of new and familiar products!',
                author: 'Jessica Smith',
                delay: '0s',
              },
              {
                text: "Easy Sub has introduced me to so many fantastic local products. It's like getting a surprise gift every month!",
                author: 'Michael Brown',
                delay: '0.3s',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: testimonial.delay }}
              >
                <div className="text-4xl text-rose-400 mb-4 group-hover:scale-110 transition-transform duration-300">"</div>
                <p className="text-gray-700 italic text-lg leading-relaxed mb-6">{testimonial.text}</p>
                <p className="text-rose-600 font-bold text-xl">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="cta"
          data-animate
          className={`relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-center p-16 rounded-3xl shadow-2xl transform transition-all duration-1000 ${
            isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black opacity-10 rounded-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-8 animate-pulse-subtle">Join the Easy Sub Family</h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Ready to experience the best subscription box around? Join us today and start enjoying curated experiences delivered straight to your door.
            </p>
            <button className="group relative px-10 py-5 bg-white text-indigo-600 font-bold text-xl rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-bounce-subtle">
              <span className="relative z-10">Get Started Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
