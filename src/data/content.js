// Centralized content for Victoria Alabaster International Women Ministry
// Edit here to update copy across the site.

import imgGallery1 from '../assets/gallery1.jpg'
import imgGallery2 from '../assets/gallery2.jpg'
import imgGallery3 from '../assets/gallery3.jpg'
import imgGallery4 from '../assets/gallery4.jpg'
import imgGallery5 from '../assets/gallery5.jpg'
import imgNeedFood from '../assets/need_food_supplies.png'
import imgNeedClothing from '../assets/need_clothing.png'
import imgNeedEssentials from '../assets/need_essentials.png'

export const siteInfo = {
  name: 'Victoria Alabaster International Women Ministry',
  shortName: 'Victoria Alabaster',
  tagline: 'Empowering Women, Transforming Communities',
  founded: 2014,
}

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Our Needs', path: '/needs' },
  { name: 'Projects', path: '/projects' },
  { name: 'Media', path: '/media' },
  { name: 'Contact', path: '/contact' },
]

export const supportAreas = [
  {
    icon: 'FaGraduationCap',
    title: 'School Fees Support',
    description: 'Covering tuition, books, and uniforms so no child is sent home for lack of funds.',
  },
  {
    icon: 'FaBowlFood',
    title: 'Food Assistance',
    description: 'Monthly food packages reaching families who would otherwise go without.',
  },
  {
    icon: 'FaHandsHolding',
    title: 'Widow Empowerment',
    description: 'Skills training and start-up grants that help widows rebuild stable, dignified livelihoods.',
  },
  {
    icon: 'FaPersonBreastfeeding',
    title: 'Single Mother Support',
    description: 'Counseling, childcare support, and income-generating training for single mothers.',
  },
  {
    icon: 'FaSeedling',
    title: 'Youth Empowerment',
    description: 'Mentorship, vocational training, and scholarships that open doors for young people.',
  },
]

export const projects = [
  {
    id: 'office-location',
    title: 'Permanent Office Location',
    image: 'office',
    summary: 'A dedicated home base in Accra to coordinate programs, host trainings, and welcome the families we serve.',
    description:
      'For years, our team has operated from temporary spaces and borrowed rooms. This project will establish a permanent administrative office and community center — a stable address where widows can collect support, youth can attend trainings, and our growing staff can coordinate outreach efficiently across all program areas.',
    goals: [
      'Secure a long-term facility in a central, accessible location',
      'Create dedicated rooms for counseling, training, and storage of relief items',
      'Provide a consistent, dignified space for beneficiaries to receive support',
    ],
    impact: 'A permanent office reduces overhead costs spent on temporary venues, allowing more resources to flow directly to families. It also builds community trust through visible, lasting presence.',
    progress: 45,
  },
  {
    id: 'shelter',
    title: 'Domestic Violence Shelter',
    image: 'shelter',
    summary: 'A safe, confidential refuge for women and children fleeing abuse — combining housing with counseling and legal support.',
    description:
      'Too many women in our communities have nowhere safe to go when violence enters their homes. This shelter will provide temporary housing, trauma counseling, legal aid referrals, and a pathway to independence for survivors and their children, in a secure and confidential environment.',
    goals: [
      'Construct or renovate a secure facility with private living quarters',
      'Partner with counselors and legal aid organizations for holistic support',
      'Establish a 24-hour intake and crisis response protocol',
    ],
    impact: 'Survivors gain immediate safety, professional support, and the practical resources needed to rebuild independent lives — breaking cycles of abuse for the next generation.',
    progress: 25,
  },
]

export const futureInitiatives = [
  {
    title: 'Vocational Training Center',
    description: 'A hands-on training hub teaching tailoring, catering, and digital skills to women and youth.',
  },
  {
    title: 'Mobile Health Outreach',
    description: 'Periodic free health screenings and maternal care clinics in underserved communities.',
  },
  {
    title: 'Microloan Cooperative',
    description: 'Small, interest-free loans to help widows and single mothers launch sustainable businesses.',
  },
]

export const needsCategories = {
  education: [
    { title: 'School Fees', description: 'Tuition and registration costs for primary, secondary, and vocational students.' },
    { title: 'Educational Materials', description: 'Textbooks, uniforms, bags, and stationery for the new school term.' },
  ],
  community: [
    { title: 'Food Supplies', description: 'Staple food packages — rice, beans, oil, and grains — for vulnerable households.', image: imgNeedFood },
    { title: 'Clothing', description: 'Seasonal clothing donations for children, widows, and displaced families.', image: imgNeedClothing },
    { title: 'Essential Needs', description: 'Hygiene kits, bedding, and household basics for families starting over.', image: imgNeedEssentials },
  ],
  empowerment: [
    { title: 'Widows', description: 'Skills training and small grants to start sustainable, income-generating work.' },
    { title: 'Single Mothers', description: 'Childcare support and vocational training to build financial independence.' },
    { title: 'Youths', description: 'Mentorship, scholarships, and career-readiness programs for young people.' },
  ],
}

export const donationImpact = [
  { title: 'Education', description: 'Keeps children in school and learning, term after term.' },
  { title: 'Feeding Programs', description: 'Puts consistent, nutritious meals on family tables.' },
  { title: 'Community Support', description: 'Provides clothing, hygiene kits, and essentials to those in need.' },
  { title: 'Shelter Projects', description: 'Builds safe housing for survivors and displaced families.' },
  { title: 'Women Empowerment', description: 'Funds training and grants that create lasting independence.' },
]

export const donationOptions = [
  {
    title: 'One-Time Donation',
    description: 'Make an immediate impact with a single gift toward our most urgent needs.',
    icon: 'FaHandHoldingHeart',
  },
  {
    title: 'Monthly Donation',
    description: 'Become a sustaining partner with a recurring gift that funds ongoing programs.',
    icon: 'FaCalendarCheck',
  },
  {
    title: 'Sponsorship Opportunities',
    description: 'Sponsor a child\'s education, a widow\'s training, or a full program area.',
    icon: 'FaHandshakeAngle',
  },
]

export const team = {
  founder: {
    name: 'Dr. Victoria Alabaster-Eze',
    role: 'Founder & Executive Director',
    bio: 'Dr. Victoria Alabaster-Eze founded the ministry after two decades of grassroots community work, driven by a conviction that every woman deserves dignity, opportunity, and a community that believes in her future.',
    message: '"I have seen what happens when a widow is given not charity, but a chance. She does not just survive — she builds, she leads, she lifts others. That is the work we are committed to, one family at a time."',
  },
  admin: [
    { name: 'Grace Adeyemi', role: 'Programs Director' },
    { name: 'Patricia Mensah', role: 'Finance & Operations Manager' },
    { name: 'Esther Williams', role: 'Community Outreach Coordinator' },
  ],
  board: [
    { name: 'Rev. Daniel Okafor', role: 'Board Chairman' },
    { name: 'Dr. Linda Brown', role: 'Board Secretary' },
    { name: 'Michael Johnson', role: 'Board Treasurer' },
    { name: 'Pastor Ruth Adebayo', role: 'Board Member' },
  ],
}

export const offices = [
  {
    country: 'Nigeria Office',
    address: ' Akure Lagos, Nigeria',
    phone: '+234 80 XXXXXXXXX',
    email: 'info@placeholder.com',
  },
  {
    country: 'USA Office',
    address: 'XXXXXXXXXX, USA',
    phone: '+1 XXXXXXXXX',
    email: 'info@placeholder.com',
  },
]

export const galleryCategories = ['All', 'Events', 'Outreach Activities', 'Programs', 'Community Impact']

export const galleryItems = [
  { id: 1, category: 'Outreach Activities', title: 'Food & Supply Distribution', color: 'from-purple-400 to-purple-600', image: imgGallery1 },
  { id: 2, category: 'Programs', title: 'Empowering Small Businesses', color: 'from-gold-300 to-gold-500', image: imgGallery2 },
  { id: 3, category: 'Community Impact', title: 'Educational Support Program', color: 'from-purple-300 to-purple-500', image: imgGallery3 },
  { id: 4, category: 'Outreach Activities', title: 'School Children Assistance', color: 'from-gold-200 to-gold-400', image: imgGallery4 },
  { id: 5, category: 'Community Impact', title: 'Nurturing Future Generations', color: 'from-purple-500 to-purple-700', image: imgGallery5 },
]

export const testimonials = [
  {
    quote: 'Through the widow empowerment program, I started my tailoring business. Today I support my three children on my own.',
    name: 'Chidinma O.',
    role: 'Program Beneficiary',
  },
  {
    quote: 'My daughter never missed a single term because of this ministry. I finally felt like someone saw us.',
    name: 'Funmilayo A.',
    role: 'Single Mother, Program Beneficiary',
  },
]
