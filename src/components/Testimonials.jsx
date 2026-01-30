import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Published Author",
      content: "Phantm.ink helped me overcome writer's block and complete my debut novel in half the time. The AI suggestions are remarkably insightful.",
      avatar: "👩‍💼"
    },
    {
      name: "James Chen",
      role: "Literary Agent",
      content: "I've seen manuscripts improve dramatically using this platform. It's like having a co-writer who understands narrative structure.",
      avatar: "👨‍💼"
    },
    {
      name: "Elena Rodriguez",
      role: "Content Creator",
      content: "The quality of AI-generated content is impressive. It maintains voice and tone while suggesting creative directions I hadn't considered.",
      avatar: "👩‍💻"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2>Trusted by Writing Professionals</h2>
          <p>Join authors, agents, and content creators who use Phantm.ink</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar">{testimonial.avatar}</div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p className="role">{testimonial.role}</p>
                </div>
              </div>
              <blockquote>
                "{testimonial.content}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
