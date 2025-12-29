import React from 'react'

function PricingCards({ type = 'fiction' }) {
  const fictionPricing = [
    {
      title: '👻 FREE SAMPLE',
      price: '$0.00',
      features: ['3-5 pages', 'Full AI creativity', 'Try before you die']
    },
    {
      title: '📖 NOVELLA',
      price: '$9.99',
      features: ['20-40K words', 'Complete story arc', 'PDF & TXT formats']
    },
    {
      title: '📚 FULL NOVEL',
      price: '$19.99',
      features: ['60-100K words', 'Epic storytelling', 'All formats']
    },
    {
      title: '♾️ UNLIMITED',
      price: '$29.99/mo',
      features: ['Unlimited stories', 'Priority generation', 'Cancel anytime']
    }
  ]

  const bioPricing = [
    {
      title: '👻 FREE SAMPLE',
      price: '$0.00',
      features: ['5-10 pages', 'Life overview', 'Test the waters']
    },
    {
      title: '📝 SHORT MEMOIR',
      price: '$9.99',
      features: ['10-20K words', 'Focused period', 'Personal story']
    },
    {
      title: '📖 STANDARD BIO',
      price: '$14.99',
      features: ['30-50K words', 'Complete life story', 'Professional quality']
    },
    {
      title: '📚 COMPREHENSIVE',
      price: '$24.99',
      features: ['60-100K words', 'Deep detail', 'Legacy documentation']
    }
  ]

  const pricing = type === 'fiction' ? fictionPricing : bioPricing

  return (
    <section className="pricing-section">
      <h2 className="section-title">💀 PRICING FROM THE VOID 💀</h2>
      <div className="pricing-grid">
        {pricing.map((card, idx) => (
          <div key={idx} className={`pricing-card card-${idx}`}>
            <h3>{card.title}</h3>
            <p className="price">{card.price}</p>
            <ul>
              {card.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PricingCards