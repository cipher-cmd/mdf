/**
 * Every piece of website text the admin can edit lives here, once.
 * `COPY_DEFAULTS` is today's wording; the database (mdf_site_copy) only stores what the
 * admin changed, so an empty or unreachable database still renders the full site.
 * `COPY_SECTIONS` describes the admin form for each block in plain language.
 */

export const COPY_DEFAULTS = {
  contact: {
    business_name: 'MDF Enterprises',
    phone_display: '+91 70062 52334',
    whatsapp_number: '917006252334',
    email: 'mdfenterprisesjk@gmail.com',
    address_line1: 'SDA Shopping Complex, Opp. Iqbal Park',
    address_line2: 'Srinagar, J&K — 190008',
    maps_link: 'https://maps.google.com/?q=MDF+Enterprises+SDA+Shopping+Complex+Iqbal+Park+Srinagar',
    hours_line1: 'Mon – Sat: 10am – 7pm',
    hours_line2: 'Sunday: Closed',
    open_time: '10:00',
    close_time: '19:00',
    closed_days: ['Sunday'],
    whatsapp_greeting: 'Hi MDF Enterprises, I would like to enquire about your products.',
  },
  header: {
    quote_button: 'Get Quote',
    whatsapp_button: 'WhatsApp',
    floating_whatsapp_tip: 'Need help? Chat with us ↓',
  },
  home_hero: {
    eyebrow: "J&K'S PREMIER EQUIPMENT HUB · EST. 1997",
    heading: 'ONE SUPPLIER.\nEVERY NEED.',
    subtitle:
      'Sports goods, fitness equipment, musical instruments and custom awards — supplied and installed across Jammu & Kashmir for individuals and institutions.',
    button_primary: 'Explore Products',
    button_secondary: 'Get a Quote',
    button_whatsapp: 'WhatsApp Us',
    video_label: 'WATCH THE STORY',
    video_length: 'VIDEO · 00:42',
    place_line1: 'Srinagar',
    place_line2: 'Jammu & Kashmir',
  },
  home_stats: {
    items: [
      { value: 28, label: 'Years of Excellence' },
      { value: 1000, label: 'Institutions Served' },
      { value: 500, label: 'Installations Done' },
      { value: 25, label: 'Trusted Brands' },
    ],
  },
  home_categories: {
    eyebrow: 'Categories We Deal In',
    heading: 'Everything You Need, For Every Purpose.',
    all_link: 'All Products',
    card_button: 'Explore',
    marquee: [
      'Cricket', 'Gymnasiums', 'Football', 'Tabla & Harmonium', 'Badminton', 'Trophies',
      'Volleyball', 'Music Labs', 'Athletics', 'Medals', 'Table Tennis', 'Sports Courts',
    ],
  },
  home_about: {
    eyebrow: 'About MDF Enterprises',
    heading: 'One Supplier.\nEvery Need.',
    text:
      "Founded in 1997 in Srinagar, MDF Enterprises has been J&K's trusted equipment partner for 28+ years — supplying sports goods, fitness equipment, musical instruments, awards and custom solutions across institutions, clubs and communities.",
    button: 'Our Journey',
    pillars: [
      { title: 'Retail & Bulk Orders', desc: 'Individual and institutional supply' },
      { title: 'Expert Installation', desc: 'In-house team for setup' },
      { title: 'GeM & Tender Ready', desc: 'Support for GeM and state tenders' },
      { title: 'J&K-Wide Coverage', desc: 'Serving institutions across J&K' },
      { title: 'Top Brand Dealerships', desc: 'Authorised stock from 25+ leading brands' },
      { title: 'After-Sales Support', desc: 'AMC and service contracts' },
    ],
    founder_label: 'Founded By',
    founder_name: 'Mr. Syed Mumtaz',
    founder_initials: 'SM',
    founder_text:
      "A lifelong passion for sport and education led Mr. Syed Mumtaz to establish MDF Enterprises in 1997 — from a small Srinagar storefront to J&K's most trusted institutional equipment partner, serving 1000+ institutions across the valley and beyond.",
    founded_year: '1997',
  },
  journey: {
    eyebrow: 'Our Journey',
    heading: '28 Years.\nOne Valley.',
    place: 'Srinagar, Jammu & Kashmir',
    image: '/images/dal_lake_about.jpg',
    milestones: [
      { mark: '1997', title: 'A Storefront in Srinagar', text: 'Mr. Syed Mumtaz opens MDF Enterprises at SDA Shopping Complex, opposite Iqbal Park — with a simple promise: the right equipment, honestly supplied.' },
      { mark: 'The Early Years', title: 'Schools, Clubs & Colleges', text: 'Word spreads across the valley. Schools, colleges and sports clubs begin equipping their grounds, gyms and music rooms through MDF.' },
      { mark: 'Partnerships', title: 'Authorised Dealerships', text: 'Dealerships with 25+ leading brands — SG, SS, Yonex, Nivia, Cosco and more — mean genuine stock at fair prices, every time.' },
      { mark: 'Beyond the Counter', title: 'Installation & Service', text: 'An in-house team takes on gym fit-outs, courts and music labs, backed by AMC and after-sales support — 500+ installations and counting.' },
      { mark: 'Public Sector', title: 'GeM Registered · MSME Certified', text: 'Government departments procure directly — J&K Police, CRPF, the University of Kashmir, Youth Services & Sports and many more.' },
      { mark: 'Today', title: '1000+ Institutions Served', text: 'Four departments under one roof, supplying and installing across every district of Jammu & Kashmir.' },
    ],
    button_primary: 'Work With Us',
    button_secondary: 'Visit the Showroom',
  },
  home_brands: {
    eyebrow: 'Our Trusted Brands',
    heading: "Genuine Stock from\nIndia's Leading Brands.",
    text: 'Authorised dealership for 25+ trusted sports, fitness and equipment brands — sourced direct, every time.',
    brands: [
      { name: 'Jonex', logo: '/images/brands/jonexLogo.webp' },
      { name: 'Yonex', logo: '/images/brands/yonexlogo.webp' },
      { name: 'Cosco', logo: '/images/brands/coscoLogo.webp' },
      { name: 'Nivia', logo: '/images/brands/niviaLogo.webp' },
      { name: 'SG', logo: '/images/brands/sglogo.webp' },
      { name: 'Spartan', logo: '/images/brands/spartanlogo.webp' },
      { name: 'SS', logo: '/images/brands/ssLogo.webp' },
      { name: 'Stag Global', logo: '/images/brands/staglogo.webp' },
      { name: 'Netco', logo: '/images/brands/netcoLogo.webp' },
      { name: 'GM', logo: '/images/brands/gmLogo.webp' },
      { name: 'Novas', logo: '/images/brands/novaFitnessLogo.webp' },
      { name: 'BDM Cricket', logo: '/images/brands/bdmlogo.webp' },
    ],
  },
  home_who: {
    eyebrow: 'Who We Serve',
    heading: 'Equipping People,\nPlaces and Communities.',
    text: 'Schools, government departments, clubs and private organisations — the right equipment with expert support, across Jammu & Kashmir.',
    cards: [
      { title: 'For Retail', desc: 'For individuals & enthusiasts.', tags: 'Walk-in showroom, Genuine brands', button: 'Explore Products', link: 'products', image: '/images/custom_sports_gear.jpg' },
      { title: 'For Institutions', desc: 'Schools, colleges, clubs & educational institutions.', tags: 'Bulk pricing, Delivery & setup', button: 'Get a Quote', link: 'contact', image: '/images/heritage_university.jpg' },
      { title: 'For Government', desc: 'Departments & public sector organisations.', tags: 'GeM registered, Tender support', button: 'Enquire Now', link: 'whatsapp', image: '/images/jk_government_building.jpg' },
      { title: 'Installation & Service', desc: 'Setup, training, AMC & after-sales support.', tags: 'In-house team, AMC contracts', button: 'Our Solutions', link: 'contact', image: '/images/gym_installation_service.jpg' },
    ],
  },
  home_process: {
    eyebrow: 'How We Work',
    heading: 'From Enquiry\nto Excellence.',
    text: 'A simple, reliable process — from understanding your needs to complete installation and support.',
    steps: [
      { title: 'Consult', desc: 'We understand your requirements.' },
      { title: 'Source', desc: 'We procure from 25+ trusted brands.' },
      { title: 'Deliver', desc: 'Pan-India delivery with careful packaging.' },
      { title: 'Install & Support', desc: 'In-house installation and ongoing support.' },
    ],
  },
  home_clients: {
    eyebrow: 'Trusted by Institutions & Departments',
    heading: "Serving J&K's\nInstitutions & Communities.",
    text: 'Proud to support the growth of sports, education and community infrastructure across Jammu & Kashmir.',
    clients: [
      { name: 'Department of Youth Services & Sports', sector: 'Government', logo: '/images/clients/dysoLogo.webp' },
      { name: 'University of Kashmir', sector: 'University', logo: '/images/clients/kuLogo.webp' },
      { name: 'J&K Police', sector: 'Police', logo: '/images/clients/jkpLogo.webp' },
      { name: 'CRPF', sector: 'Armed Police', logo: '/images/clients/crpfLogo.webp' },
      { name: 'Govt. Medical College Srinagar', sector: 'Medical College', logo: '/images/clients/gmcLogo.webp' },
      { name: 'DSEK', sector: 'School Education', logo: '/images/clients/dsekLogo.webp' },
      { name: 'SKUAST-Kashmir', sector: 'University', logo: '/images/clients/skaustlogo.webp' },
      { name: 'Cluster University Srinagar', sector: 'University', logo: '/images/clients/clusterUniLogo.webp' },
      { name: 'School Education Department', sector: 'Government', logo: '/images/clients/schoolEduLogo.webp' },
    ],
  },
  home_showroom: {
    eyebrow: 'Our Showroom',
    heading: 'Visit Our Srinagar Showroom',
    text: 'Pick up a bat, test a treadmill, hear an instrument — then get honest advice on what suits your institution, club or game.',
    photo: '/images/showroom_interior.jpg',
    button_directions: 'Get Directions',
    button_whatsapp: 'WhatsApp Us',
  },
  contact_section: {
    eyebrow: "Let's Build a Stronger Tomorrow",
    heading: 'Ready to Equip\nYour Space?',
    text: 'A school sports room, a full gym fit-out or a GeM order — tell us what you need and get expert advice with end-to-end support.',
    whatsapp_line: 'Chat with us now',
    email_line: 'Write to us',
    note_reply: 'Reply within 24 hours',
    note_trust: 'GeM registered · MSME certified',
    form_title: 'Quick Quote',
    options: ['Sports', 'Fitness', 'Music', 'Awards', 'Installation', 'GeM'],
    name_placeholder: 'Your name',
    phone_placeholder: 'Phone (optional)',
    message_placeholder: 'Items, quantity, institution…',
    button: 'Send Enquiry',
    success_title: 'Enquiry ready on WhatsApp',
    success_text: 'Press send in WhatsApp — our team replies within 24 hours.',
    again_link: 'Send another enquiry',
  },
  footer: {
    tagline: 'Sports. Fitness. Music. Awards.\nServing Jammu & Kashmir since 1997.',
    we_serve: ['Government Departments', 'Educational Institutions', 'Sports Clubs & Academies', 'Private Organisations'],
    copyright: 'MDF Enterprises, Srinagar. All rights reserved.',
    bottom_line: 'Sports · Fitness · Music · Awards',
  },
  products_page: {
    eyebrow: 'Equip. Perform. Excel.',
    title: 'Our Products',
    intro: 'Genuine sports goods, fitness equipment, musical instruments and awards — sourced direct from 25+ leading brands for homes, schools and institutions across J&K.',
    button: 'Browse the collection',
    badge: 'Authorised dealer · GeM registered',
    section_eyebrow: 'The Collection',
    section_heading: 'Genuine Gear,\nHand-Picked.',
    section_text: 'A curated selection from our Srinagar showroom. Tap any product for details, or enquire directly for sizes and live pricing.',
    department_intro: 'Genuine [department] from our Srinagar showroom — authorised stock from 25+ brands, with institutional pricing and GeM procurement for schools, clubs and departments.',
    department_empty_title: 'Catalogue coming soon.',
    department_empty_text: 'We carry the full [department] range in store. Message us for live stock, specifications and quotes.',
    empty_title: 'Nothing here — yet.',
    empty_text: "Our showroom stocks far more than we list online. Ask us and we'll check availability for you.",
    enquire_button: 'Enquire on WhatsApp',
    trust_line: 'Genuine stock · GeM & institutional invoicing available',
    seo_title: 'Products — Sports, Fitness, Music & Awards',
    seo_description: 'A complete range of genuine sports goods, fitness equipment, musical instruments, awards and institutional supplies. GeM-registered supplier, MSME-certified. 25+ premium brands across J&K.',
  },
  blog_page: {
    eyebrow: 'Insights. Stories. Impact.',
    title: 'Our Blog',
    intro: 'Buying guides, procurement know-how and stories from the world of sport, fitness and music — written from Srinagar for players, schools and institutions.',
    button: 'Read the latest',
    badge: 'Practical advice since 1997',
    section_eyebrow: 'The Journal',
    section_heading: 'Insights, Guides\n& Stories.',
    section_text: 'Straightforward advice on choosing equipment, equipping institutions and the sporting life of the valley.',
    author: 'MDF Editorial',
    question_link: 'Have a question? Ask our team',
    seo_title: 'Blog — Buying Guides, Procurement & Stories',
    seo_description: 'Buying guides, GeM procurement know-how and stories from the world of sport, fitness and music — from MDF Enterprises, Srinagar.',
  },
  seo: {
    site_title: 'MDF Enterprises | Sports, Fitness, Music & Awards — Srinagar, J&K',
    site_description: "J&K's premier sports equipment supplier since 1997. Cricket gear, fitness equipment, musical instruments & custom awards. GeM-registered, MSME-certified. Serving all districts of Jammu & Kashmir.",
    share_title: 'MDF Enterprises — One Supplier. Every Need.',
    share_description: "J&K's one-stop supplier of sports goods, fitness equipment, musical instruments and custom awards since 1997. GeM-registered, MSME-certified. Serving 1000+ institutions across Jammu & Kashmir.",
  },
}

export type SiteCopy = typeof COPY_DEFAULTS
export type CopyKey = keyof SiteCopy

// ── Admin form description ──────────────────────────────────────────────────

export type CopyField =
  | { key: string; label: string; type: 'text' | 'textarea' | 'image' | 'number' | 'time' | 'tags'; help?: string }
  | { key: string; label: string; type: 'select'; options: { value: string; label: string }[]; help?: string }
  | { key: string; label: string; type: 'list'; itemLabel: string; fields: CopyField[]; min?: number; max?: number; help?: string }

export interface CopySection {
  key: CopyKey
  page: string
  title: string
  description: string
  fields: CopyField[]
}

const LINE_BREAK_HELP = 'Press Enter to start a new line on the website.'
const LINK_OPTIONS = [
  { value: 'products', label: 'Products page' },
  { value: 'contact', label: 'Contact form' },
  { value: 'whatsapp', label: 'WhatsApp chat' },
  { value: 'blog', label: 'Blog page' },
]

export const COPY_PAGES = ['Whole website', 'Home page', 'Products page', 'Blog page'] as const

export const COPY_SECTIONS: CopySection[] = [
  {
    key: 'contact', page: 'Whole website', title: 'Phone, WhatsApp & address',
    description: 'Used everywhere on the website: buttons, footer, showroom and contact sections.',
    fields: [
      { key: 'business_name', label: 'Business name', type: 'text' },
      { key: 'phone_display', label: 'Phone number (as people should see it)', type: 'text' },
      { key: 'whatsapp_number', label: 'WhatsApp number', type: 'text', help: 'Country code and number, digits only. Example: 917006252334' },
      { key: 'email', label: 'Email address', type: 'text' },
      { key: 'address_line1', label: 'Address — first line', type: 'text' },
      { key: 'address_line2', label: 'Address — second line', type: 'text' },
      { key: 'maps_link', label: 'Google Maps link', type: 'text', help: 'Open your shop on Google Maps, tap Share, copy the link and paste it here.' },
      { key: 'hours_line1', label: 'Opening hours — first line', type: 'text' },
      { key: 'hours_line2', label: 'Opening hours — second line', type: 'text' },
      { key: 'open_time', label: 'Shop opens at', type: 'time', help: 'Used for the live "Open now / Closed" badge.' },
      { key: 'close_time', label: 'Shop closes at', type: 'time' },
      { key: 'closed_days', label: 'Days the shop is closed', type: 'tags', help: 'Full day names, e.g. Sunday.' },
      { key: 'whatsapp_greeting', label: 'Message pre-filled when someone taps WhatsApp', type: 'textarea' },
    ],
  },
  {
    key: 'header', page: 'Whole website', title: 'Top menu buttons',
    description: 'The buttons in the menu bar at the top of every page.',
    fields: [
      { key: 'quote_button', label: 'Quote button', type: 'text' },
      { key: 'whatsapp_button', label: 'WhatsApp button', type: 'text' },
      { key: 'floating_whatsapp_tip', label: 'Tip above the round WhatsApp button', type: 'text' },
    ],
  },
  {
    key: 'footer', page: 'Whole website', title: 'Bottom of every page',
    description: 'The footer under every page.',
    fields: [
      { key: 'tagline', label: 'Short line under the logo', type: 'textarea', help: LINE_BREAK_HELP },
      { key: 'we_serve', label: '"We Serve" list', type: 'tags' },
      { key: 'copyright', label: 'Copyright line', type: 'text', help: 'The © sign and current year are added automatically.' },
      { key: 'bottom_line', label: 'Small line at the very bottom', type: 'text' },
    ],
  },
  {
    key: 'seo', page: 'Whole website', title: 'Google & sharing',
    description: 'What Google shows for your website, and what appears when someone shares your link on WhatsApp or Facebook.',
    fields: [
      { key: 'site_title', label: 'Title in Google results', type: 'text', help: 'Keep it under 65 characters.' },
      { key: 'site_description', label: 'Description in Google results', type: 'textarea', help: 'Keep it under 160 characters.' },
      { key: 'share_title', label: 'Title when the link is shared', type: 'text' },
      { key: 'share_description', label: 'Description when the link is shared', type: 'textarea' },
    ],
  },
  {
    key: 'home_hero', page: 'Home page', title: 'Big welcome section',
    description: 'The first thing visitors see on the home page.',
    fields: [
      { key: 'eyebrow', label: 'Small line above the heading', type: 'text' },
      { key: 'heading', label: 'Main heading', type: 'textarea', help: LINE_BREAK_HELP },
      { key: 'subtitle', label: 'Text under the heading', type: 'textarea' },
      { key: 'button_primary', label: 'Gold button', type: 'text' },
      { key: 'button_secondary', label: 'Quote button', type: 'text' },
      { key: 'button_whatsapp', label: 'WhatsApp button', type: 'text' },
      { key: 'video_label', label: 'Video button — title', type: 'text' },
      { key: 'video_length', label: 'Video button — small line', type: 'text' },
      { key: 'place_line1', label: 'Place name (bottom right) — first line', type: 'text' },
      { key: 'place_line2', label: 'Place name (bottom right) — second line', type: 'text' },
    ],
  },
  {
    key: 'home_stats', page: 'Home page', title: 'Numbers strip',
    description: 'The counters under the welcome section, like "28+ Years of Excellence".',
    fields: [
      {
        key: 'items', label: 'Numbers', type: 'list', itemLabel: 'Number', min: 2, max: 4,
        fields: [
          { key: 'value', label: 'Number', type: 'number', help: 'A "+" is added automatically.' },
          { key: 'label', label: 'What it counts', type: 'text' },
        ],
      },
    ],
  },
  {
    key: 'home_categories', page: 'Home page', title: 'Departments showcase',
    description: 'Heading above the department cards. The cards themselves are edited under Departments.',
    fields: [
      { key: 'eyebrow', label: 'Small line above the heading', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'all_link', label: '"All products" link', type: 'text' },
      { key: 'card_button', label: 'Card button word', type: 'text', help: 'The department name is added after it, e.g. "Explore Sports".' },
      { key: 'marquee', label: 'Big moving words', type: 'tags' },
    ],
  },
  {
    key: 'home_about', page: 'Home page', title: 'About us',
    description: 'The About section and the founder introduction.',
    fields: [
      { key: 'eyebrow', label: 'Small line above the heading', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'textarea', help: LINE_BREAK_HELP },
      { key: 'text', label: 'About text', type: 'textarea' },
      { key: 'button', label: 'Journey button', type: 'text' },
      {
        key: 'pillars', label: 'What we offer', type: 'list', itemLabel: 'Point', min: 2, max: 6,
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'desc', label: 'Short description', type: 'text' },
        ],
      },
      { key: 'founder_label', label: 'Founder — small label', type: 'text' },
      { key: 'founder_name', label: 'Founder name', type: 'text' },
      { key: 'founder_initials', label: 'Founder initials (in the circle)', type: 'text' },
      { key: 'founder_text', label: 'Founder story', type: 'textarea' },
      { key: 'founded_year', label: 'Large faded year', type: 'text' },
    ],
  },
  {
    key: 'journey', page: 'Home page', title: 'Our Journey pop-up',
    description: 'The timeline that opens from the "Our Journey" button.',
    fields: [
      { key: 'eyebrow', label: 'Small label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'textarea', help: LINE_BREAK_HELP },
      { key: 'place', label: 'Place line', type: 'text' },
      { key: 'image', label: 'Picture', type: 'image' },
      {
        key: 'milestones', label: 'Timeline', type: 'list', itemLabel: 'Milestone', min: 1, max: 12,
        fields: [
          { key: 'mark', label: 'Year or label', type: 'text' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'text', label: 'Story', type: 'textarea' },
        ],
      },
      { key: 'button_primary', label: 'Gold button', type: 'text' },
      { key: 'button_secondary', label: 'Second button', type: 'text' },
    ],
  },
  {
    key: 'home_brands', page: 'Home page', title: 'Brands we sell',
    description: 'The moving strip of brand logos. Also shown on the Products page.',
    fields: [
      { key: 'eyebrow', label: 'Small line above the heading', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'textarea', help: LINE_BREAK_HELP },
      { key: 'text', label: 'Text', type: 'textarea' },
      {
        key: 'brands', label: 'Brands', type: 'list', itemLabel: 'Brand', min: 3, max: 30,
        fields: [
          { key: 'name', label: 'Brand name', type: 'text' },
          { key: 'logo', label: 'Logo', type: 'image' },
        ],
      },
    ],
  },
  {
    key: 'home_who', page: 'Home page', title: 'Who we serve',
    description: 'The sliding cards for retail, institutions, government and installation.',
    fields: [
      { key: 'eyebrow', label: 'Small line above the heading', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'textarea', help: LINE_BREAK_HELP },
      { key: 'text', label: 'Text', type: 'textarea' },
      {
        key: 'cards', label: 'Cards', type: 'list', itemLabel: 'Card', min: 1, max: 6,
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'desc', label: 'Short description', type: 'text' },
          { key: 'tags', label: 'Small tags', type: 'text', help: 'Separate with commas.' },
          { key: 'button', label: 'Button text', type: 'text' },
          { key: 'link', label: 'Where the card opens', type: 'select', options: LINK_OPTIONS },
          { key: 'image', label: 'Picture', type: 'image' },
        ],
      },
    ],
  },
  {
    key: 'home_process', page: 'Home page', title: 'How we work',
    description: 'The numbered steps.',
    fields: [
      { key: 'eyebrow', label: 'Small line above the heading', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'textarea', help: LINE_BREAK_HELP },
      { key: 'text', label: 'Text', type: 'textarea' },
      {
        key: 'steps', label: 'Steps', type: 'list', itemLabel: 'Step', min: 2, max: 4,
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'desc', label: 'Short description', type: 'text' },
        ],
      },
    ],
  },
  {
    key: 'home_clients', page: 'Home page', title: 'Clients',
    description: 'Institutions and departments that trust you.',
    fields: [
      { key: 'eyebrow', label: 'Small line above the heading', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'textarea', help: LINE_BREAK_HELP },
      { key: 'text', label: 'Text', type: 'textarea' },
      {
        key: 'clients', label: 'Clients', type: 'list', itemLabel: 'Client', min: 1, max: 15,
        fields: [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'sector', label: 'Type (e.g. University)', type: 'text' },
          { key: 'logo', label: 'Logo', type: 'image' },
        ],
      },
    ],
  },
  {
    key: 'home_showroom', page: 'Home page', title: 'Showroom',
    description: 'The showroom invitation. Address and hours come from "Phone, WhatsApp & address".',
    fields: [
      { key: 'eyebrow', label: 'Small line above the heading', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'text', label: 'Text', type: 'textarea' },
      { key: 'photo', label: 'Showroom photo', type: 'image' },
      { key: 'button_directions', label: 'Directions button', type: 'text' },
      { key: 'button_whatsapp', label: 'WhatsApp button', type: 'text' },
    ],
  },
  {
    key: 'contact_section', page: 'Whole website', title: 'Contact & quick quote',
    description: 'The enquiry section at the bottom of the home, products and blog pages.',
    fields: [
      { key: 'eyebrow', label: 'Small line above the heading', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'textarea', help: LINE_BREAK_HELP },
      { key: 'text', label: 'Text', type: 'textarea' },
      { key: 'whatsapp_line', label: 'WhatsApp box text', type: 'text' },
      { key: 'email_line', label: 'Email box text', type: 'text' },
      { key: 'note_reply', label: 'Reply-time note', type: 'text' },
      { key: 'note_trust', label: 'Trust note', type: 'text' },
      { key: 'form_title', label: 'Form title', type: 'text' },
      { key: 'options', label: 'Choices people can tick', type: 'tags' },
      { key: 'name_placeholder', label: 'Name box hint', type: 'text' },
      { key: 'phone_placeholder', label: 'Phone box hint', type: 'text' },
      { key: 'message_placeholder', label: 'Message box hint', type: 'text' },
      { key: 'button', label: 'Send button', type: 'text' },
      { key: 'success_title', label: 'After sending — title', type: 'text' },
      { key: 'success_text', label: 'After sending — text', type: 'text' },
      { key: 'again_link', label: 'After sending — link', type: 'text' },
    ],
  },
  {
    key: 'products_page', page: 'Products page', title: 'Products page text',
    description: 'Headings and messages on the Products page and each department page.',
    fields: [
      { key: 'eyebrow', label: 'Small line above the title', type: 'text' },
      { key: 'title', label: 'Page title', type: 'text' },
      { key: 'intro', label: 'Intro text', type: 'textarea' },
      { key: 'button', label: 'Button', type: 'text' },
      { key: 'badge', label: 'Badge next to the button', type: 'text' },
      { key: 'section_eyebrow', label: 'Collection — small line', type: 'text' },
      { key: 'section_heading', label: 'Collection — heading', type: 'textarea', help: LINE_BREAK_HELP },
      { key: 'section_text', label: 'Collection — text', type: 'textarea' },
      { key: 'department_intro', label: 'Department page intro', type: 'textarea', help: 'Write [department] where the department name should appear.' },
      { key: 'department_empty_title', label: 'Empty department — title', type: 'text' },
      { key: 'department_empty_text', label: 'Empty department — text', type: 'textarea', help: 'Write [department] where the department name should appear.' },
      { key: 'empty_title', label: 'Nothing found — title', type: 'text' },
      { key: 'empty_text', label: 'Nothing found — text', type: 'textarea' },
      { key: 'enquire_button', label: 'Product enquiry button', type: 'text' },
      { key: 'trust_line', label: 'Small line under the enquiry button', type: 'text' },
      { key: 'seo_title', label: 'Title in Google results', type: 'text' },
      { key: 'seo_description', label: 'Description in Google results', type: 'textarea' },
    ],
  },
  {
    key: 'blog_page', page: 'Blog page', title: 'Blog page text',
    description: 'Headings on the Blog page and article pages.',
    fields: [
      { key: 'eyebrow', label: 'Small line above the title', type: 'text' },
      { key: 'title', label: 'Page title', type: 'text' },
      { key: 'intro', label: 'Intro text', type: 'textarea' },
      { key: 'button', label: 'Button', type: 'text' },
      { key: 'badge', label: 'Badge next to the button', type: 'text' },
      { key: 'section_eyebrow', label: 'Articles — small line', type: 'text' },
      { key: 'section_heading', label: 'Articles — heading', type: 'textarea', help: LINE_BREAK_HELP },
      { key: 'section_text', label: 'Articles — text', type: 'textarea' },
      { key: 'author', label: 'Author name shown on articles', type: 'text' },
      { key: 'question_link', label: 'Question link under each article', type: 'text' },
      { key: 'seo_title', label: 'Title in Google results', type: 'text' },
      { key: 'seo_description', label: 'Description in Google results', type: 'textarea' },
    ],
  },
]

/** Overlay saved edits on the defaults, ignoring anything whose shape no longer matches. */
export function mergeCopy(saved: Record<string, unknown>): SiteCopy {
  const out: Record<string, any> = {}
  for (const [key, defaults] of Object.entries(COPY_DEFAULTS)) {
    const stored = saved[key]
    const section: Record<string, any> = { ...defaults }
    if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
      for (const [field, value] of Object.entries(stored as Record<string, unknown>)) {
        const fallback = (defaults as Record<string, unknown>)[field]
        if (fallback === undefined) continue
        if (Array.isArray(fallback) ? Array.isArray(value) : typeof value === typeof fallback) section[field] = value
      }
    }
    out[key] = section
  }
  return out as SiteCopy
}

// ── Helpers shared by the website components ────────────────────────────────

export const waHref = (number: string, text?: string) =>
  `https://wa.me/${number.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const telHref = (display: string) => `tel:+${display.replace(/\D/g, '')}`

export const lines = (text: string) => text.split('\n')

/** "Open now" status for the showroom, in Srinagar time. */
export function shopStatus(contact: SiteCopy['contact'], now = new Date()) {
  const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const closed = new Set(contact.closed_days.map(d => d.trim().toLowerCase()))
  const toHours = (t: string) => { const [h, m] = t.split(':').map(Number); return (h || 0) + (m || 0) / 60 }
  const openAt = toHours(contact.open_time)
  const closeAt = toHours(contact.close_time)
  const fmt = (t: string) => {
    const [h, m] = t.split(':').map(Number)
    const suffix = h >= 12 ? 'pm' : 'am'
    const hour = h % 12 || 12
    return m ? `${hour}:${String(m).padStart(2, '0')}${suffix}` : `${hour}${suffix}`
  }
  const hour = ist.getHours() + ist.getMinutes() / 60
  const today = ist.getDay()
  const open = !closed.has(days[today]) && hour >= openAt && hour < closeAt
  if (open) return { open, label: `Open now · until ${fmt(contact.close_time)}` }
  if (!closed.has(days[today]) && hour < openAt) return { open, label: `Closed · opens ${fmt(contact.open_time)}` }
  for (let i = 1; i <= 7; i++) {
    const d = (today + i) % 7
    if (closed.has(days[d])) continue
    const name = i === 1 ? 'tomorrow' : days[d].slice(0, 1).toUpperCase() + days[d].slice(1, 3)
    return { open, label: i === 1 ? `Closed · opens ${fmt(contact.open_time)} tomorrow` : `Closed · opens ${name} ${fmt(contact.open_time)}` }
  }
  return { open, label: 'Closed' }
}
