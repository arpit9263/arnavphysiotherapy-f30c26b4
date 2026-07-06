export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  benefits: string[];
};

export const services: Service[] = [
  {
    slug: "manual-therapy",
    name: "Manual Therapy",
    short: "Hands-on techniques to release pain and restore joint mobility.",
    description:
      "Skilled manual mobilisation and soft-tissue work to relieve stiffness, improve joint play and calm the nervous system — the foundation of every recovery plan at Arnav Physio.",
    image:
      "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=1400&q=80",
    benefits: ["Immediate pain relief", "Restores mobility", "Improves circulation", "Reduces muscle tension"],
  },
  {
    slug: "exercise-therapy",
    name: "Exercise Therapy",
    short: "Guided movement to rebuild strength, flexibility and balance.",
    description:
      "Personalised, progressive exercise programmes designed around your goals — from re-learning basic movement after injury to returning to full sport performance.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=80",
    benefits: ["Rebuilds strength", "Improves posture", "Long-term prevention", "Boosts confidence"],
  },
  {
    slug: "electrotherapy",
    name: "Electrotherapy",
    short: "Modern modalities like TENS, IFT and ultrasound for faster healing.",
    description:
      "Precision electrotherapy — TENS, IFT, ultrasound and muscle stimulation — used alongside hands-on care to reduce pain, calm inflammation and accelerate tissue repair.",
    image:
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1400&q=80",
    benefits: ["Non-invasive relief", "Reduces inflammation", "Speeds recovery", "Pairs with manual therapy"],
  },
  {
    slug: "dry-needling",
    name: "Dry Needling",
    short: "Targeted needling to release stubborn trigger points.",
    description:
      "Thin, sterile needles applied to myofascial trigger points to switch off tight, painful bands of muscle — especially effective for chronic neck, back and shoulder pain.",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1400&q=80",
    benefits: ["Releases trigger points", "Chronic pain relief", "Improves range", "Minimally invasive"],
  },
  {
    slug: "shockwave-therapy",
    name: "Shockwave Therapy",
    short: "Focused acoustic waves for tendon and heel pain.",
    description:
      "Radial shockwave therapy for tendinopathies, plantar fasciitis and stubborn calcifications — stimulating the body's own regenerative response.",
    image:
      "https://images.unsplash.com/photo-1666214279960-27a2f6ada64e?auto=format&fit=crop&w=1400&q=80",
    benefits: ["Tendon healing", "Non-surgical", "Fast sessions", "Long-lasting results"],
  },
  {
    slug: "sports-rehabilitation",
    name: "Sports Rehabilitation",
    short: "Return-to-play programmes led by a sports specialist.",
    description:
      "Led by a MPT (Sports) specialist, our return-to-play pathway blends strength, mobility, and sport-specific drills to get athletes back — stronger than before.",
    image:
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=1400&q=80",
    benefits: ["Sport-specific", "Injury prevention", "Performance gains", "Confidence to return"],
  },
  {
    slug: "cupping-therapy",
    name: "Cupping Therapy",
    short: "Traditional cupping for muscle tension and circulation.",
    description:
      "Dry and sliding cupping techniques to release fascia, improve blood flow and complement modern rehabilitation.",
    image:
      "https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=1400&q=80",
    benefits: ["Releases fascia", "Boosts circulation", "Deep muscle relief", "Complementary care"],
  },
  {
    slug: "pediatric-physiotherapy",
    name: "Pediatric Physiotherapy",
    short: "Gentle, play-based therapy for children and infants.",
    description:
      "Developmental therapy for infants and children — from torticollis and gross-motor delays to post-injury rehab — delivered with a gentle, family-first approach.",
    image:
      "https://images.unsplash.com/photo-1607582544171-89aa3cea3ed7?auto=format&fit=crop&w=1400&q=80",
    benefits: ["Developmental milestones", "Family-guided", "Play-based sessions", "Gentle techniques"],
  },
  {
    slug: "womens-health",
    name: "Women's Health Physiotherapy",
    short: "Pre- and post-natal care and pelvic health.",
    description:
      "Confidential care for pre- and post-natal recovery, pelvic floor rehabilitation and posture support — with dignity and privacy.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80",
    benefits: ["Pre & post natal", "Pelvic floor", "Private setting", "Certified guidance"],
  },
  {
    slug: "neurological-physiotherapy",
    name: "Neurological Physiotherapy",
    short: "Recovery programmes for stroke, Parkinson's and nerve injury.",
    description:
      "Structured neuro-rehabilitation for stroke, Parkinson's, Bell's palsy and peripheral nerve injuries — combining hands-on facilitation, task training and home programmes.",
    image:
      "https://images.unsplash.com/photo-1631815588090-d1bcbe9a8537?auto=format&fit=crop&w=1400&q=80",
    benefits: ["Stroke recovery", "Balance & gait", "Task training", "Home programmes"],
  },
];

export type Condition = {
  slug: string;
  name: string;
  image: string;
  summary: string;
};

export const conditions: Condition[] = [
  { slug: "back-pain", name: "Back Pain",
    image: "https://images.unsplash.com/photo-1616012480717-fd9867f34d99?auto=format&fit=crop&w=600&q=80",
    summary: "Chronic and acute low-back pain, disc issues and postural strain." },
  { slug: "neck-pain", name: "Neck Pain",
    image: "https://images.unsplash.com/photo-1607962776028-c56f9e21afcf?auto=format&fit=crop&w=600&q=80",
    summary: "Cervical spondylosis, tech-neck, whiplash and headaches of cervical origin." },
  { slug: "shoulder-pain", name: "Shoulder Pain",
    image: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=600&q=80",
    summary: "Rotator cuff strain, impingement and post-injury stiffness." },
  { slug: "knee-pain", name: "Knee Pain",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&q=80",
    summary: "Ligament sprains, meniscus injuries, arthritis and post-op knees." },
  { slug: "sciatica", name: "Sciatica",
    image: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=600&q=80",
    summary: "Nerve-root pain radiating down the leg — relieved with a structured plan." },
  { slug: "slip-disc", name: "Slip Disc",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=600&q=80",
    summary: "Prolapsed or herniated discs managed conservatively without surgery." },
  { slug: "frozen-shoulder", name: "Frozen Shoulder",
    image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=600&q=80",
    summary: "Adhesive capsulitis — restore range in stages, painlessly." },
  { slug: "sports-injury", name: "Sports Injury",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80",
    summary: "ACL, hamstring, ankle sprains — return-to-play from a sports specialist." },
  { slug: "arthritis", name: "Arthritis",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80",
    summary: "Osteoarthritis and rheumatoid arthritis — long-term movement plans." },
  { slug: "stroke-rehab", name: "Stroke Rehab",
    image: "https://images.unsplash.com/photo-1666214277657-e21e42b02c8a?auto=format&fit=crop&w=600&q=80",
    summary: "Regain strength, balance and independence after stroke." },
  { slug: "neurological-rehab", name: "Neurological Rehab",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80",
    summary: "Parkinson's, Bell's palsy and peripheral neuropathies." },
  { slug: "post-surgery-rehab", name: "Post-Surgery Rehab",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
    summary: "Structured recovery after orthopaedic or joint replacement surgery." },
];

export type Doctor = {
  slug: string;
  name: string;
  qualification: string;
  role: string;
  experience: string;
  specialization: string;
  image: string;
  bio: string;
};

export const doctors: Doctor[] = [
  {
    slug: "dushyant-singh",
    name: "Dr. Dushyant Singh",
    qualification: "BPT, MPT (Sports)",
    role: "Founder & Chief Physiotherapist",
    experience: "10+ years clinical experience",
    specialization: "Sports Injury, Manual Therapy, Neuro Rehab",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    bio: "Dr. Dushyant Singh serves as a Physiotherapist at the District Hospital, Jhansi and heads Arnav Physiotherapy Centre. With a Master's in Sports Physiotherapy and a decade of clinical practice, he blends evidence-based care with hands-on craftsmanship — helping thousands of patients return to work, sport and everyday life.",
  },
  {
    slug: "associate-therapist",
    name: "Associate Physiotherapist",
    qualification: "BPT",
    role: "Rehabilitation Specialist",
    experience: "5+ years",
    specialization: "Orthopaedic & Post-surgery Rehab",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
    bio: "Supporting the clinic's rehabilitation programmes with a focus on post-operative recovery and long-term joint health.",
  },
  {
    slug: "womens-health-specialist",
    name: "Women's Health Specialist",
    qualification: "BPT, Certified Pelvic Health",
    role: "Women's Health Physiotherapist",
    experience: "6+ years",
    specialization: "Pre & Post Natal, Pelvic Floor",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    bio: "Confidential, dignified care for pre-natal, post-natal and pelvic floor rehabilitation programmes.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Ritika Sharma",
    role: "Recovered from lower back pain",
    quote:
      "I struggled with back pain for two years. In six weeks at Arnav Physio I was back to yoga and long walks — without painkillers.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    name: "Amit Verma",
    role: "Post ACL surgery",
    quote:
      "Dr. Dushyant's sports rehab plan got me back on the football field stronger than before. Every session had a clear purpose.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    name: "Sunita Devi",
    role: "Frozen shoulder",
    quote:
      "I couldn't lift my arm to comb my hair. The team was patient, kind and professional. Today I can move freely again.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    name: "Rahul Yadav",
    role: "Sciatica recovery",
    quote:
      "Honest advice, no shortcuts. The clinic feels calm, modern and completely trustworthy.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "Do I need a doctor's referral to book physiotherapy?",
    a: "No. You can book an appointment directly with us. If you already have a referral or investigation reports, please bring them along.",
  },
  {
    q: "How long does a typical session last?",
    a: "Your first assessment lasts around 45–60 minutes. Follow-up treatment sessions are typically 30–45 minutes depending on the plan.",
  },
  {
    q: "How many sessions will I need?",
    a: "It depends on your condition. Most acute issues respond in 4–8 sessions; chronic and post-surgical cases follow a longer, staged plan we design with you.",
  },
  {
    q: "Do you offer home physiotherapy in Jhansi?",
    a: "Yes. We provide select home visits within Jhansi for post-surgical, elderly and neurological patients. Please call to confirm availability.",
  },
  {
    q: "Is physiotherapy painful?",
    a: "Sessions are designed to reduce pain, not create it. Some techniques may feel intense but should always be within your comfort — we adjust every step.",
  },
  {
    q: "What should I wear to my appointment?",
    a: "Loose, comfortable clothing that allows easy access to the area being treated works best.",
  },
];

export const blogs = [
  {
    slug: "5-desk-exercises-for-back-pain",
    title: "5 Simple Desk Exercises to Beat Back Pain",
    excerpt: "Short, effective movements you can do between meetings to keep your spine happy.",
    image: "https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?auto=format&fit=crop&w=1400&q=80",
    date: "Jun 12, 2026",
    read: "4 min read",
    category: "Back Care",
  },
  {
    slug: "return-to-sport-after-acl",
    title: "Returning to Sport After an ACL Injury",
    excerpt: "A physiotherapist's guide to a safe, staged return-to-play — without setbacks.",
    image: "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=1400&q=80",
    date: "May 28, 2026",
    read: "6 min read",
    category: "Sports Rehab",
  },
  {
    slug: "understanding-frozen-shoulder",
    title: "Understanding Frozen Shoulder — And How to Treat It",
    excerpt: "Why it happens, how long it lasts and what actually helps you regain movement.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1400&q=80",
    date: "May 10, 2026",
    read: "5 min read",
    category: "Shoulder",
  },
  {
    slug: "posture-guide-for-students",
    title: "The Modern Posture Guide for Students",
    excerpt: "Small daily habits that protect your neck, shoulders and back through exam season.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80",
    date: "Apr 22, 2026",
    read: "4 min read",
    category: "Wellness",
  },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1580281658626-ee379f3cce93?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
];
