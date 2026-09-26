export const contact = {
  phone: process.env.REACT_APP_PRACTICE_PHONE || '+91 76668 42282',
  emergency: process.env.REACT_APP_EMERGENCY_PHONE || '+91 74003 69817',
  email: process.env.REACT_APP_PRACTICE_EMAIL || 'nimbkaradi17@gmail.com',
  whatsapp: process.env.REACT_APP_WHATSAPP_URL || 'https://wa.me/917666842282',
  calendly: process.env.REACT_APP_CALENDLY_URL || 'https://calendly.com/siddharthgunay/orthopaedic-consultation-dr-siddharth-gunay',
  calendlyEmbed: process.env.REACT_APP_CALENDLY_EMBED_URL || 'https://calendly.com/siddharthgunay/orthopaedic-consultation-dr-siddharth-gunay?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=fcf8f4&text_color=3b2d26&primary_color=a0523f',
  maps: process.env.REACT_APP_MAPS_URL || 'https://maps.google.com/?q=Ova+Fertility+Tieten+Medicity+Kasarvadavali+Thane',
  reviews: process.env.REACT_APP_GOOGLE_REVIEWS_URL || 'https://share.google/1vuK1voWsPZVKwgFV',
  instagram: process.env.REACT_APP_INSTAGRAM_URL || 'https://www.instagram.com',
  facebook: process.env.REACT_APP_FACEBOOK_URL || 'https://www.facebook.com',
  youtube: process.env.REACT_APP_YOUTUBE_URL || 'https://youtube.com/@dradityanimbkar',
  practo: process.env.REACT_APP_PRACTO_URL || 'https://www.practo.com/thane/doctor/aditya-nimbkar-1',
};

export const images = {
  doctor: '/images/dr-aditya-portrait.jpg',
  logo: '/images/dr-aditya-logo.jpg',
  maternity: '/images/maternity.jpg',
  mother: '/images/mother-baby.jpg',
  baby: '/images/first-hello.jpg',
  emergencySurgery: '/images/dr-aditya-emergency-surgery.jpg',
  fetalScanKalyan: '/images/dr-aditya-fetal-scan-kalyan.jpg',
  fetalWorkstationKalyan: '/images/dr-aditya-fetal-kalyan.jpg',
  fetal3dFaceKalyan: '/images/fetal-3d-face-kalyan.jpg',
  fetal3dTwinsKalyan: '/images/fetal-3d-twins-kalyan.jpg',
  fetalThaneClinic: '/images/dr-aditya-thane-clinic.jpg',
  fetalThaneProcedure: '/images/dr-aditya-fetal-thane.jpg',
  caesareanAccreta: '/images/caesarean-hysterectomy-accreta.jpg',
  emergency2am: '/images/emergency-caesarean-2am.jpg',
  cervicalCerclage: '/images/cervical-cerclage-procedure.jpg',
  ivfTwins: '/images/ivf-pgta-era-twins-delivery.jpg',
  placentaPrevia: '/images/placenta-previa-emergency-caesarean.jpg',
  uterineRupture: '/images/uterine-rupture-delivery-surgery.jpg',
  mulundOpd: '/images/dr-aditya-mulund-opd.jpg',
};

export const clinicLocations = {
  Thane: {
    city: 'Thane',
    clinicName: 'Ova Fertility & Women Care',
    type: 'OUR THANE CONSULTATION LOCATION',
    address: '1st Floor, Tieten Medicity Hospital, Kasarvadavali, Ghodbunder Road, Thane West, Maharashtra 400615.',
    schedule: 'By prior appointment.',
    phone: '+91 76668 42282',
    mapsUrl: 'https://maps.google.com/?q=Ova+Fertility+Tieten+Medicity+Kasarvadavali+Thane',
    note: 'Specialised fetal medicine, reproductive care & high-risk pregnancy consultations.',
    image: '/images/dr-aditya-thane-clinic.jpg'
  },
  Mulund: {
    city: 'Mulund',
    clinicName: 'Maher Maternity and Nursing Home',
    type: 'OUR MULUND CONSULTATION LOCATION',
    address: 'Maher Maternity and Nursing Home, Mulund, Mumbai.',
    schedule: 'Available on appointment basis everyday.',
    phone: '+91 76668 42282',
    mapsUrl: 'https://maps.app.goo.gl/LgTfKL1nB8SsF4ED8',
    note: 'Consultations available everyday on appointment basis.',
    image: '/images/dr-aditya-mulund-opd.jpg'
  },
  Kalyan: {
    city: 'Kalyan',
    clinicName: 'Alfi Diagnostics and Smart Clinics',
    type: 'OUR KALYAN CONSULTATION LOCATION',
    address: 'Alfi Diagnostics and Smart Clinics, Kalyan.',
    schedule: 'Tuesday, Thursday & Saturday: 9:00 AM – 2:00 PM (on prior appointment).',
    phone: '+91 76668 42282',
    mapsUrl: 'https://maps.app.goo.gl/JgXJ8RPE1EfqBrPc9?g_st=ac',
    note: 'Specialist consultations on Tuesday, Thursday and Saturday mornings.',
    image: '/images/dr-aditya-fetal-scan-kalyan.jpg'
  }
};

export const fetalClinicalShowcase = {
  kalyan: [
    {
      id: 'kalyan-scan-live',
      title: 'Advanced Fetal Anomaly Ultrasound',
      facility: 'Alfi Diagnostics & Smart Clinics',
      city: 'Kalyan',
      badge: 'Fetal Medicine · Kalyan',
      image: '/images/dr-aditya-fetal-scan-kalyan.jpg',
      caption: 'Dr. Aditya Nimbkar performing an advanced fetal anomaly ultrasound scan at Alfi Diagnostics & Smart Clinics, Kalyan.'
    },
    {
      id: 'kalyan-3d-face',
      title: '3D Facial Profiling in 3rd Trimester',
      facility: 'Alfi Diagnostics & Smart Clinics',
      city: 'Kalyan',
      badge: '3D Imaging · Kalyan',
      image: '/images/fetal-3d-face-kalyan.jpg',
      caption: '3D imaging of face in 3rd trimester to look for proper development of facial features and to ensure parents get their first sighting of their baby'
    },
    {
      id: 'kalyan-3d-twins',
      title: 'High-Definition 3D Fetal Sonography',
      facility: 'Alfi Diagnostics & Smart Clinics',
      city: 'Kalyan',
      badge: '3D Sonography · Kalyan',
      image: '/images/fetal-3d-twins-kalyan.jpg',
      caption: '3D imaging of the baby has unparalleled aesthetic value and is also an ecstatic moment for parents'
    },
    {
      id: 'kalyan-workstation',
      title: 'Diagnostic Workstation & Report Review',
      facility: 'Alfi Diagnostics & Smart Clinics',
      city: 'Kalyan',
      badge: 'Ultrasound Workstation · Kalyan',
      image: '/images/dr-aditya-fetal-kalyan.jpg',
      caption: 'Detailed multi-parametric scan evaluation and clinical reporting performed personally by Dr. Aditya Nimbkar.'
    }
  ],
  thane: [
    {
      id: 'thane-consultation',
      title: 'Fetal Consultation & Counselling Suite',
      facility: 'Ova Fertility & Women Care, Tieten Medicity',
      city: 'Thane',
      badge: 'Fetal Medicine · Thane',
      image: '/images/dr-aditya-thane-clinic.jpg',
      caption: 'Dr. Aditya in the dedicated clinical consultation suite at Ova Fertility & Women Care, Tieten Medicity Hospital, Thane.'
    },
    {
      id: 'thane-procedure',
      title: 'Ultrasound-Guided Fetal Interventions',
      facility: 'Tieten Medicity Hospital OT',
      city: 'Thane',
      badge: 'Specialist Procedure · Thane',
      image: '/images/dr-aditya-fetal-thane.jpg',
      caption: 'Dr. Aditya performing advanced ultrasound-guided fetal interventions and high-precision clinical procedures.'
    }
  ]
};

export const pregnancyEmergencyCase = {
  title: 'Critical Obstetric Surgery & High-Risk Management',
  subtitle: 'Placenta Accreta Spectrum · Salvaging Mother & Twins',
  badge: 'Critical Obstetric Surgery',
  image: '/images/dr-aditya-emergency-surgery.jpg',
  doctorName: 'Dr. Aditya Nimbkar',
  doctorRole: 'Operating Obstetric Surgeon',
  story: 'Obstetric Hysterectomy done for a woman who was referred with torrential bleeding in her 9th month of gestation due to placenta accreta spectrum. The surgery entailed use of 48 instruments, 31 mops, 17 suture materials, 7.5 litres of blood loss and finally ended with successful delivery of twins and mother also being salvaged!',
  stats: [
    { value: '48', label: 'Surgical Instruments' },
    { value: '31', label: 'Surgical Mops' },
    { value: '17', label: 'Suture Materials' },
    { value: '7.5 L', label: 'Blood Loss Managed' },
    { value: '100%', label: 'Mother & Twins Salvaged' }
  ],
  takeaway: 'Placenta accreta spectrum with massive haemorrhage is among the most perilous emergencies in obstetrics. Rapid surgical control, meticulous haemostasis, and coordinated team resuscitation safely delivered the twin babies and preserved the mother’s life.'
};

export const clinicalCasesGallery = [
  {
    id: 'case-accreta-team',
    title: 'Caesarean Hysterectomy in Placenta Accreta Spectrum',
    category: 'High-Risk Obstetrics',
    badge: 'Placenta Accreta Spectrum',
    image: '/images/caesarean-hysterectomy-accreta.jpg',
    caption: 'Another caesarean hysterectomy done for a woman with placenta accreta spectrum',
    outcome: 'Mother stabilized and salvaged through coordinated surgical haemostasis.'
  },
  {
    id: 'case-emergency-2am',
    title: 'Emergency Caesarean Section at 2 AM',
    category: 'Obstetric Emergencies',
    badge: '24/7 Obstetric Care',
    image: '/images/emergency-caesarean-2am.jpg',
    caption: 'Emergency caesarean section at 2 AM - quite a common occurrence in the life of a gynaecologist',
    outcome: 'Immediate surgical delivery safeguarding both mother and neonate.'
  },
  {
    id: 'case-cervical-cerclage',
    title: 'Cervical Cerclage for Cervical Incompetence',
    category: 'Fetal & Maternal Medicine',
    badge: 'Cervical Cerclage',
    image: '/images/cervical-cerclage-procedure.jpg',
    caption: 'Cervical cerclage for a woman with short cervix and multiple abortions - she delivered a healthy 3.2 kg baby successfully later',
    outcome: 'Delivered a healthy 3.2 kg baby successfully at term.'
  },
  {
    id: 'case-ivf-twins',
    title: 'Twin Delivery with IVF, PGT-A & ERA',
    category: 'Reproductive Medicine & IVF',
    badge: 'IVF & Genetics Success',
    image: '/images/ivf-pgta-era-twins-delivery.jpg',
    caption: 'Successful delivery of twins with IVF, PGT A and ERA',
    outcome: 'Healthy twin babies delivered safe with Dr. Aditya Nimbkar.'
  },
  {
    id: 'case-bleeding-previa',
    title: 'Caesarean Delivery for Bleeding Placenta Previa',
    category: 'High-Risk Obstetrics',
    badge: 'Placenta Previa Emergency',
    image: '/images/placenta-previa-emergency-caesarean.jpg',
    caption: 'Caesarean section done for a woman with bleeding placenta previa. Mother and baby successfully salvaged',
    outcome: 'Mother and baby successfully salvaged with urgent intervention.'
  },
  {
    id: 'case-uterine-rupture',
    title: 'Delivery in Ruptured Uterus Post-Myomectomy',
    category: 'High-Risk Obstetrics',
    badge: 'Uterine Rupture Salvage',
    image: '/images/uterine-rupture-delivery-surgery.jpg',
    caption: 'Delivered a baby after a ruptured uterus arrived in a female with history of myomectomy',
    outcome: 'Emergency surgical delivery and uterine repair safeguarding mother and baby.'
  },
  {
    id: 'case-mulund-opd',
    title: 'Early Morning Pregnancy OPD at Mulund',
    category: 'Pregnancy Care · Mulund',
    badge: 'Mulund Antenatal OPD',
    image: '/images/dr-aditya-mulund-opd.jpg',
    caption: 'Early morning pregnancy OPD at Mulund',
    outcome: 'Dedicated antenatal consultation at Maher Maternity and Nursing Home, Mulund.'
  }
];

export const services = [
  {
    id: 'fetal-medicine',
    number: '01',
    title: 'Fetal medicine',
    tag: 'A closer look. A clearer picture.',
    short: 'Understanding your baby’s world, before you meet.',
    icon: 'scan',
    image: 'maternity',
    heading: 'Little details.',
    emphasis: 'Extraordinary importance.',
    intro: 'Thoughtful, detailed assessment of your baby’s growth and development, with findings explained in a way that makes sense to you.',
    items: [
      ['Pregnancy ultrasound', 'NT–NB, detailed anomaly, growth and Doppler scans tailored to your stage of pregnancy.'],
      ['Specialised fetal assessment', 'Fetal 2D echocardiography and neurosonography when a closer assessment is needed.'],
      ['Prenatal diagnosis', 'Counselling and ultrasound-guided procedures including chorionic villus sampling (CVS) and amniocentesis, when clinically indicated.'],
      ['Complex pregnancy counselling', 'Clear discussions about findings, available investigations and options, including selective fetal reduction when appropriate and legally permitted.']
    ],
    expect: [
      'We review your pregnancy history and earlier reports.',
      'Dr Aditya performs the ultrasound and explains the findings.',
      'You leave with a clearer understanding of recommended next steps.'
    ],
    faqs: [
      ['Will the doctor explain the scan to me?', 'Yes. Dr Aditya performs the ultrasound himself and takes time to explain the findings and any recommended further assessment.'],
      ['Does a screening test give a definite diagnosis?', 'No. Screening estimates the chance of certain conditions. Diagnostic tests may provide more definitive information about specific conditions, but also have limitations and potential risks. Your doctor will explain the options.'],
      ['Do I need amniocentesis?', 'Not every pregnancy needs an invasive test. This depends on your history, screening results, scan findings and preferences after counselling. Discuss the benefits, limitations and procedure-related risks with your specialist.']
    ]
  },
  {
    id: 'pregnancy-care',
    number: '02',
    title: 'Pregnancy care',
    tag: 'For you. For your little one.',
    short: 'From your first scan to your baby’s first hello.',
    icon: 'heart',
    image: 'mother',
    heading: 'Every pregnancy is unique.',
    emphasis: 'Your care should be, too.',
    intro: 'From routine check-ups to pregnancies that need closer attention, personalised obstetric care with a calm, considered approach.',
    items: [
      ['Antenatal care', 'Regular pregnancy check-ups, review of investigations and conversations about your changing needs.'],
      ['High-risk obstetrics', 'Individualised care for concerns such as pre-eclampsia, diabetes, heart disease and babies measuring smaller than expected.'],
      ['Planning for birth', 'Shared decision-making around vaginal, assisted vaginal and caesarean birth, based on your clinical needs.'],
      ['Care beyond delivery', 'Postnatal review and guidance to support your recovery and address your concerns after birth.']
    ],
    expect: [
      'A detailed review of your health and pregnancy history.',
      'An individual monitoring plan, with any extra assessments explained.',
      'Ongoing conversations about your wellbeing and birth options.'
    ],
    faqs: [
      ['What does a high-risk pregnancy mean?', 'It means you or your baby may benefit from additional monitoring or specialist input. It does not mean a complication will definitely happen. Your care plan depends on the specific concern.'],
      ['Does Dr Aditya conduct deliveries himself?', 'Dr Aditya conducts vaginal, assisted vaginal and caesarean deliveries. Your delivery arrangements and hospital cover will be discussed with you during care.'],
      ['What if I have an urgent concern?', 'For severe pain, heavy bleeding, difficulty breathing, seizures or reduced fetal movements, seek urgent assessment at the nearest emergency department. Do not wait for a WhatsApp reply.']
    ]
  },
  {
    id: 'fertility-care',
    number: '03',
    title: 'Fertility & IVF',
    tag: 'Your first step, at your pace.',
    short: 'Personalised possibilities. Never a one-size-fits-all plan.',
    icon: 'sprout',
    image: 'baby',
    heading: 'A little hope.',
    emphasis: 'An informed next step.',
    intro: 'A space to be heard, understand your options and move forward together. Fertility care that considers both partners and your individual circumstances.',
    items: [
      ['Fertility evaluation', 'A careful review of both partners’ history and appropriate investigations to understand possible factors affecting conception.'],
      ['Natural conception support', 'Cycle tracking, ovulation induction and timed intercourse where suitable, without assuming everyone needs IVF.'],
      ['Intrauterine insemination (IUI)', 'Assessment and counselling to understand whether IUI is an appropriate option for your situation.'],
      ['In vitro fertilisation (IVF)', 'Individualised assisted reproductive care, with open discussions about the steps, costs, limitations and expected possibilities.']
    ],
    expect: [
      'We listen to your story and review any previous treatments.',
      'Investigations are recommended according to your circumstances.',
      'We discuss suitable options, so you can make an informed choice.'
    ],
    faqs: [
      ['Will I need IVF straight away?', 'Not necessarily. Treatment may include lifestyle guidance, ovulation support, timed intercourse or IUI. IVF is considered according to your evaluation, preferences and clinical needs.'],
      ['Should both partners attend?', 'Where possible, yes. Fertility can involve factors affecting either or both partners, so an assessment of both helps guide an appropriate plan.'],
      ['Is treatment success guaranteed?', 'No fertility treatment can guarantee a pregnancy or live birth. Outcomes vary with age, diagnosis and many other factors. Your doctor can explain what is relevant to your circumstances.']
    ]
  },
  {
    id: 'gynaecology',
    number: '04',
    title: 'Gynaecology',
    tag: 'Every age. Every stage.',
    short: 'Care for your health, beyond pregnancy.',
    icon: 'flower',
    image: 'doctor',
    heading: 'Your health matters.',
    emphasis: 'At every chapter.',
    intro: 'Thoughtful care for menstrual concerns, pelvic health and gynaecological conditions—from adolescence through menopause and beyond.',
    items: [
      ['Menstrual & hormonal concerns', 'Evaluation and management of irregular, heavy or painful periods, with a plan that fits your needs.'],
      ['Fibroids & ovarian cysts', 'Careful assessment and discussion of observation, medical care or surgery where appropriate.'],
      ['Pelvic health & prolapse', 'An individual approach to symptoms that affect your comfort, confidence and everyday quality of life.'],
      ['Minimal access surgery', 'Vaginal and other gynaecological surgery by Dr Aditya. Laparoscopic surgery is performed by Dr Nidhi Shah, with Dr Aditya assisting.']
    ],
    expect: [
      'A private, respectful conversation about your concerns.',
      'Only clinically appropriate examinations and investigations, with consent.',
      'Clear treatment options, including non-surgical care where suitable.'
    ],
    faqs: [
      ['Do all fibroids need surgery?', 'No. Management depends on symptoms, size, location, fertility plans and other factors. Observation or medical care may be appropriate for some people.'],
      ['Who performs laparoscopic surgery?', 'Dr Nidhi Shah performs the laparoscopic surgeries, assisted by Dr Aditya. Dr Aditya performs his caesarean, vaginal and other gynaecological procedures.'],
      ['Can I book for menstrual problems?', 'Yes. Menstrual concerns are part of the practice, including assessment of irregular, heavy or painful periods.']
    ]
  },
];

export const generalFaqs = [
  ['What are the consultation charges?', 'The first consultation is ₹1,000 and follow-up consultations are ₹500. Scans, tests, procedures and hospital charges are separate and vary by location. Please confirm the applicable fees with the team when booking.'],
  ['Where can I consult Dr Aditya?', 'Consultations are available in Thane at Ova Fertility & Women Care (Tieten Medicity Hospital), in Mulund at Maher Maternity and Nursing Home (available everyday on appointment basis), and in Kalyan at Alfi Diagnostics and Smart Clinics (Tues, Thurs & Sat 9:00 AM – 2:00 PM on prior appointment). Please contact +91 76668 42282 to arrange your visit.'],
  ['Will Dr Aditya perform my ultrasound?', 'Yes. Dr Aditya performs pregnancy ultrasounds himself and explains the findings, so your consultation and assessment stay connected.'],
  ['What should I bring to my first appointment?', 'Please bring previous scan reports, test results, prescriptions and a list of current medicines. You are welcome to bring a partner or support person and a list of questions.'],
  ['How do I book an appointment?', 'Choose your preferred service and location using the appointment form. You can review your enquiry and send it through WhatsApp. The team will confirm availability; submitting the enquiry does not confirm an appointment.'],
  ['Can I reach the doctor in an emergency?', 'A practice emergency contact is available at +91 74003 69817. For severe or rapidly worsening symptoms, go directly to the nearest emergency department. Messages may not be seen immediately—never wait for a reply in an emergency.'],
];

export const reviews = [
  { name: 'Sabrin Rehmani', category: 'Pregnancy', quote: 'What I appreciate the most is that he listens carefully, understands even the smallest concerns, and explains everything so clearly and calmly.', detail: 'Throughout my delivery journey, I always felt that I was in safe hands. His calm nature and supportive approach gave me a lot of confidence and comfort.' },
  { name: 'J Lohar', category: 'Pregnancy', quote: 'He takes the time to explain medical terms, reports, and important aspects of the pregnancy clearly, which makes it much easier to understand and feel confident.', detail: 'He is very cooperative, approachable, and makes the patient feel comfortable and heard.' },
  { name: 'Aarohi Khedekar', category: 'Fetal medicine', quote: 'He explained the fetal anomaly scan findings very clearly with so much care and concern.', detail: 'Dr Aditya Nimbkar a very professional and an excellent doctor. Highly recommended. Thankyou!' },
  { name: 'The Little Champ', category: 'Fetal medicine', quote: 'His calm and compassionate approach made a stressful experience much easier.', detail: 'Dr. Aditya was extremely kind and reassuring during my amniocentesis. I was very anxious, and he patiently allowed me to listen to music on my earphones and even arranged for someone to hold my hand during the procedure.' },
  { name: 'Vaibhav Patil', category: 'Consultation', quote: 'He was extremely patient, professional, and took the time to explain every aspect of the condition and treatment in a clear manner.', detail: 'I had a very reassuring experience with Dr. Aditya. I would highly recommend Dr. Aditya to anyone looking for a skilled and approachable gynecologist.' },
  { name: 'Miss Salunke', category: 'Consultation', quote: 'His guidance is reassuring, and he answers every question patiently without making you feel rushed.', detail: 'He is very polite, patient, and professional. He explains everything clearly and takes the time to understand the concern properly.' },
];

export const articles = [
  { id: 'first-visit', category: 'Getting started', title: 'Your first appointment, without the uncertainty.', summary: 'A simple guide to what to bring and what to expect.', image: 'doctor', time: '3 min read', sections: [ ['Bring your story, not just your reports', 'Make a short note of your concerns, relevant medical history and current medicines. If you have previous scans, blood tests or treatment records, bring them along.'], ['Make room for your questions', 'Write down what you would like to understand. A partner or trusted support person may help you remember information and feel more comfortable.'], ['Ask about the next step', 'Before leaving, check which investigations are recommended, how to prepare, how you will receive results and when to follow up. Confirm consultation and procedure fees with the team.'] ] },
  { id: 'anomaly-scan', category: 'Fetal medicine', title: 'What is an anomaly scan really looking for?', summary: 'Understanding a detailed look at your baby’s development.', image: 'maternity', time: '4 min read', sections: [ ['A detailed assessment', 'An anomaly scan looks closely at your baby’s anatomy and development. It also helps assess other aspects of pregnancy such as the placenta and fluid, according to the clinical situation.'], ['Understanding its limits', 'An ultrasound cannot detect every condition. Image quality, pregnancy stage, the baby’s position and the type of condition can affect what can be assessed. A reassuring scan does not guarantee the absence of all problems.'], ['If a closer look is needed', 'Your doctor may recommend a repeat assessment, specialist imaging or counselling about further testing. Ask what the finding means, what is still uncertain and what choices are available.'] ] },
  { id: 'fertility-options', category: 'Fertility', title: 'Fertility care doesn’t always begin with IVF.', summary: 'Your options, explained one step at a time.', image: 'baby', time: '3 min read', sections: [ ['Begin with an assessment', 'Fertility care starts by understanding both partners’ health, pregnancy history and previous investigations. Evaluation is tailored to your circumstances.'], ['Different paths for different people', 'Options may include support for natural conception, ovulation treatment, timed intercourse, IUI or IVF. No one approach is right for everyone, and no treatment guarantees success.'], ['When to seek advice', 'It is commonly appropriate to seek evaluation after 12 months of trying if under 35, or after 6 months if 35 or older. Seek advice sooner with irregular cycles, a known reproductive condition or other concerns; over 40, prompt evaluation may be appropriate.'] ] },
  { id: 'high-risk', category: 'Pregnancy', title: '“High-risk” is a care plan, not a prediction.', summary: 'Why closer monitoring can be part of thoughtful pregnancy care.', image: 'mother', time: '3 min read', sections: [ ['What the term means', 'A high-risk pregnancy may need extra attention because of an existing medical condition, pregnancy complication or findings affecting your baby. It does not predict that something will definitely go wrong.'], ['A personalised plan', 'Depending on your needs, care may include more frequent visits, additional scans, blood pressure or blood sugar monitoring, and input from other specialists.'], ['Know when to seek help', 'Severe pain, heavy bleeding, difficulty breathing, seizures or reduced fetal movements require urgent assessment. Do not rely on online content or wait for a message reply in an emergency.'] ] },
  { id: 'screening-diagnosis', category: 'Fetal medicine', title: 'Screening and diagnosis: knowing the difference.', summary: 'Two different questions. Two different kinds of tests.', image: 'maternity', time: '4 min read', sections: [ ['Screening estimates a chance', 'Screening tests estimate the likelihood of certain conditions. A higher-chance result does not mean your baby definitely has that condition, and a lower-chance result cannot rule out all conditions.'], ['Diagnostic testing investigates further', 'Tests such as CVS or amniocentesis may provide more definitive information about specific conditions. They are not required for every pregnancy and have limitations and procedure-related risks.'], ['An informed choice', 'Discuss what each test can and cannot tell you, the timing, risks, costs and how results may affect your decisions. Testing should follow individual counselling and informed consent.'] ] },
  { id: 'periods', category: 'Women’s health', title: 'You don’t have to “just live with” difficult periods.', summary: 'When changes in your cycle deserve a conversation.', image: 'baby', time: '3 min read', sections: [ ['Pay attention to changes', 'Heavy bleeding, significant pain or a change in your usual cycle can affect daily life. Tracking symptoms may help your doctor understand the pattern.'], ['There can be different causes', 'Hormonal factors, fibroids and other conditions may contribute. A careful history and appropriate investigations help guide care rather than assuming a diagnosis.'], ['When not to wait', 'Seek urgent care for very heavy bleeding with faintness, severe sudden pain, or pain and bleeding when pregnancy is possible. For other concerns, arrange a consultation and bring a record of your symptoms.'] ] },
];