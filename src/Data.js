const response = await fetch('https://dummyjson.com/users');
const animales = await response.json();
// const  skillIcon={
//   action:<svg viewBox="0 0 24 24"  width="24px" height="24px" fill="#ffff" stroke="#0b8585" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#0cbb78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>,
//   url:<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="24px"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.05025 1.53553C8.03344 0.552348 9.36692 0 10.7574 0C13.6528 0 16 2.34721 16 5.24264C16 6.63308 15.4477 7.96656 14.4645 8.94975L12.4142 11L11 9.58579L13.0503 7.53553C13.6584 6.92742 14 6.10264 14 5.24264C14 3.45178 12.5482 2 10.7574 2C9.89736 2 9.07258 2.34163 8.46447 2.94975L6.41421 5L5 3.58579L7.05025 1.53553Z" fill="#ffffff"></path> <path d="M7.53553 13.0503L9.58579 11L11 12.4142L8.94975 14.4645C7.96656 15.4477 6.63308 16 5.24264 16C2.34721 16 0 13.6528 0 10.7574C0 9.36693 0.552347 8.03344 1.53553 7.05025L3.58579 5L5 6.41421L2.94975 8.46447C2.34163 9.07258 2 9.89736 2 10.7574C2 12.5482 3.45178 14 5.24264 14C6.10264 14 6.92742 13.6584 7.53553 13.0503Z" fill="#ffffff"></path> <path d="M5.70711 11.7071L11.7071 5.70711L10.2929 4.29289L4.29289 10.2929L5.70711 11.7071Z" fill="#ffffff"></path> </g></svg>,
// }
    import { faHeart,faStethoscope,faSyringe,faMicroscope,faTooth  } from '@fortawesome/free-solid-svg-icons'

const portada = [
  {
    id: 1,
    title: 'Cuidamos la salud de tu mejor amigo',
    nombre:"Cuidamos la salud de tu mejor amigo",
    description:"Brindamos atención veterinaria integral con profesionales altamente capacitados, tecnología moderna y un trato lleno de amor. Desde consultas preventivas hasta tratamientos especializados, tu mascota está en las mejores manos.",
    estado:'Surgery',
    type:'cats',
    raza:'Siamese cat',
    sexo:'M',
    button:[
    {
      title:'Book Appointment',
      type:"url",
      link:"/services/surgery"
    }
  ],
    imagen:
      './src/assets/slider.png',
  },
  {
    id: 4,
    title: 'Dale un Hogar, Gana un Mejor Amigo',
    nombre:'Candi',
    sexo:'F',
    estado:'Healthy',
    type:'dogs',
    raza:'Golden Retriever',
    description:"Cada mascota merece una segunda oportunidad.       ",
    button:[
    {
      title:'Adoptar Ahora',
      type:"url",
      link:"/adoption"
    }
  ],
    imagen:
      './src/assets/sliderfamily.png'
  },
 
];
const animals=[
  {
    id: 0,
    nombre: "Max",
    especie: "dog",
    raza: "Golden Retriever",
    edad: "4 years old",
    peso: "32 kg",
    registro: "#8823",
    genero: "Male",
    estado: "Healthy",
    counterLike:300,
    color: "Golden / Cream",
    nacimiento: "12 Oct 2025",
    microchip: "985-120-334-11",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkTa12X_OQVcDrQig9qaCFNJNDD8Cu18LA1QbeVZNSITNJ8b7Laml2SwEYQhW_ACJ_h3XR5YzvXR5BSvno6ZzGbhaNGSMLRgo7ZR865dxAmtndSRHB4dxMvYGI30q3Gfybh8cbV7vntsIyUUkX709RjQLMJKIcsqm3VCZcApcs3ryBKft-_vMQ1-lOl7QzGO6dypTix3gqwfn-jb4is10wAT5ksFQZoItQJXqV7YbS7lfQx3zhN0xB6H4RC4N0l9gtNP-jw8fURz6x",
    owner: {
      nombre: "Sarah Johnson",
      telefono: "(555) 123-4567"
    }
  },
  {
    id: 1,
    nombre: "Bella",
    especie: "dog",
    raza: "Golden Retriever",
    genero: "female",
    edad: "2  Years",
    counterLike:120,
     nacimiento: "12 Oct 2019",
     fechaInyecion:"12 Oct 2025",
    peso: "24kg",
    owner: {
      nombre: "Sarah Johnson",
      telefono: "(555) 123-4567"
    },
    estado:  "Healthy",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXyoTL0WtRzx_2-MAQ1vRz3RdEnk0CUDVULZi2ug-W21MVvDM-bFU5nvAp_XSzPb8spmmS7T9tSdPOjfcf548QxYp0cWyWHK5TV-Uc25x-jYUs8-vrQ4NXo6oW1ko_fF1WgxQpdqSrHuqjnd4MIBz9pwuzpbEJEAtck7cW-0DzVsNxD5K14XNgzfvijkT4qRT80jmzuk0HP5l3M0f64C_IIu2-pt_QQ48CDCQHpbIAfNdbNBAo2M0Gsre7qO_8Ld27SLxuUXZjGz9w",
  },

  {
    id: 2,
    nombre: "Max",
    especie: "cat",
    raza: "Siamese cat",
    genero: "male",
    nacimiento: "12 Oct 2025",
    edad: "5  Years",
    peso: "4.5kg",
    counterLike:20,
     owner: {
      nombre: "Mike T.",
      telefono: "(555) 123-4567"
    },
    estado: "Check-up Due",
      
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDd1b_TC8jAYg5q_qrRHCOueakKPrR8E3apYv2_xdiIq6S_PEiYYKK7T3KhEWsB5Jr35CV8IprMvaTwVTE0QJKJgi7z5AyyYFQ_hjN2IpqjoCz6y-vEOGt9_6Xcs_s3Q1kPsb7x3LYATKb61Nzg_q0icYJr9sLbVVjhaWFFaisRybfrcTpJ8NQUIzcF_pfQj04g7inoZi5wXcl6iB_ohhWl48BDX7sVu1QdlbZb23jfCnDhTpt4piC3ejANnRxhV2ZXwfQVgNvM02bs",
  },

  {
    id: 3,
    nombre: "Snowball",
    especie: "Rabbit",
    raza: "Angora Rabbit",
    counterLike:1,
    genero: "female",
    edad: "1 Yr",
     nacimiento: "12 Oct 2025",
    peso: "1.2kg",
    
    owner: {
      nombre: "Lisa K.",
      telefono: "(555) 123-4567"
    },
    estado:  "Healthy",
      
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ3N77x9z7GkE-Gr9k8vFzLwzBaIbx2OxRjKr5cqJ7MbADk5y0TXt_aE5Yg0FWB_GALX2PSXe0oxWNFjBcM3jQNd_Jx74DAf8Z82t9jefG1PkiCj5wbfMbJehIn8Mqb4kYOKD_PQSyTtEOIaUZ97Hqxi54P0JG6D5hZnxUzq-4Dps-wnNbZX_yBxcAuogCB4CLWYwwYTUl_r4IckEgMUI3qSq8ZytfC8_-0b8xrk_by730Sz4GkVccAEta8r3P6qunfdiLSLt5OeCd",
  },

  {
    id: 4,
    nombre: "Rocky",
    especie: "dog",
    raza: "French Bulldog",
    counterLike:1000,
    genero: "male",
    edad: "4  Years",
     nacimiento: "12 Oct 2025",
    peso: "11kg",
    owner: {
      nombre: "Tom B.",
      telefono: "(555) 123-4567"
    },
    estado:  "Surgery",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZR1yEy0CtRVO1LdxagMOO_RSnQ-rJBovG61wlu-hOe7mGyzhTLaSG-9C1tEMTIk8tx7y5lvoZDJeM5C7DZ7B7XdhSj65WanjobDYot7s1KGb0r8rRjmkwk0GNLzQFxAIAC-yAQf5q562iWNQtLgmrhn43vzlmwaVg66JM0v9EKSfg8TR5Ctr7UK-terJ0Kjr3T6r1pCIZkbSQ0WVo-W_j00pNRetwo7gs1DB33JoN0muLLcQHfWo2hsQ_4RyQIV8ajhSuEhIrlnG_",
  },

  {
    id: 5,
    nombre: "Luna",
    especie: "cat",
    counterLike:10,
    raza: "Domestic Shorthair",
    genero: "female",
    edad: "3  Years",
     nacimiento: "12 Oct 2025",
    peso: "4.1kg",
    owner: {
      nombre: "John D.",
      telefono: "(555) 123-4567"
    },
    estado:  "Healthy",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBanNTjVUIPQeUPa6CeBfTN7lw-KQZrmYflB2jhNyUsQz8zOIJy6LpAdQ_ScD-lBvfFwG49yflHeWYgYBOSghQY9L01mcdrq0jNpddY5m2csCw8aiK5bFTPuh_Mzt33jIjsOgVGz8b7UveppsL5loASxkRMpEDfYeK5y8ts9XIeJ3C_SbzronpHy9FYS7JqNP922xO3O_HMM7stQBGE0V8usVTQDIrD88hdWz__6yerxMDqLJ-5vjfZoJGOX5vn8U9fE3qG64rFCLz7",
  },

  {
    id: 6,
    nombre: "Charlie",
    counterLike:100,
    especie: "bird",
    raza: "Macaw",
    genero: "male",
    edad: "15  Years",
    nacimiento: "May 15, 2022",
    peso: "1.0kg",
     owner: {
      nombre: "Peter L.",
      telefono: "(555) 123-4567"
    },
    estado: "Healthy",
      
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAgRIx5Rc481YXLBr1W1L_0FCKg0nIvSsnb5dd7vi9QvZOzQ6sVuv6Uc2qgf8Uvit5H-YcRR3wWrGaIhxvFmGqSKnVH54e_qpqNrl8mgmi-1fj1RMj1eSFmO85uU2QzR5QmKSrVxeU4GsDOEP4QH4aZ4QYSqKx7DC9b3ve6Ea4teiA3E840OP2fjL1gTl3C-0WD5Cuo8Mlriai9wZXsmz6fMoj0WhABdeNp_BMflPoy46tHlwFCpAaiqNZpg0FtH_LAPa6keym6Q60W",
  },

  {
    id: 7,
    nombre: "Zeus",
    especie: "dog",
    raza: "Siberian Husky",
    genero: "male",
    edad: "5  Years",
    counterLike:150,
     nacimiento: "12 Oct 2025",
    peso: "27kg",
    owner: {
      nombre: "Anna M.",
      telefono: "(555) 123-4567"
    },
    estado:  "Vaccine Due",
     
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLIVrf7NxI27eGtuVStYCuK4v-Ittg2L8innuq-c-WG5pzA6WN6-bhhNjuDsmTqa6Xfo318kdp6RGwlsjCPVlOwI78tigPlsMJzsaQlV2V-QP3VRbTPhHkoUSm0Wy6yuGdUubDlqxwkPiooKuUQh3yIbfC4-Hi4VzHqfrzwZe5G1AC70v4rJOsW82ormVqPH3RhlMSmTNmZv3nQ4O72z6CQcOZMeZ7UZphcIsVxkhcR7mc5DLCAAdI669Ombzc0Z3DBr7t1lkutxDi",
  },

  {
    id: 8,
    nombre: "Peanut",
    especie: "others",
    raza: "Syrian Hamster",
    genero: "female",
    counterLike:3000,
    edad: "8  Months",
    fechaInyecion:"12 Oct 2025",
     nacimiento: "12 Oct 2025",
    peso: "120g",
    owner: {
      nombre: "Kid A.",
      telefono: "(555) 123-4567"
    },
    estado: "Healthy",
      
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBdyuEPRv91RspGkfpm6bAVM2qPqxyIPzv9wednD9v3t2a2Zl3ufKmn9bnJPt7j9cSRGcOnTje68Ght_5lVoOwObS5ARwNPlpHffmGOBWLm3NYeipiZ_M5TM16WQPeT1piInDfLfsjiORd2feTMDtmwwGg6D_oUs5mwk5K77_IiJNKOqQIRpVtiFncI8D-hAIC9Grky8JhalRjELzmn5Dwk5GRpAipc-3wxuK2jJZjMKzQvTSqB8Hi2V7VqoTneVvllyh3Q-pCrV8Du",
  },
]
const diseases = [
  {
    id:1,
    title: "Canine Parvovirus",
    description: "A retrovirus that weakens the immune system. Regular testing and vaccination are essential.",
    content:'La infección por parvovirus canino es una enfermedad altamente contagiosa causada por el parvovirus canino tipo 2 (CPV-2). Existen varias cepas de CPV-2 y todas producen síntomas similares. La enfermedad que causan se conoce comúnmente como "parvo". El virus ataca los glóbulos blancos y el tracto gastrointestinal de perros y otros cánidos como coyotes, lobos y zorros. En los cachorros, el virus también puede dañar el músculo cardíaco. Todos los perros son susceptibles al parvovirus canino, aunque algunos tienen mayor riesgo que otros. Entre ellos se incluyen los cachorros de entre 6 y 20 semanas de edad, los perros sin vacunar o con vacunación incompleta.',
    raza:['Rottweilers',
          'Doberman pinschers',
          'razas de bull terrier',
          'pastores alemanes',
          ,'Springer spaniels ingleses'
        ],
    sintoma:['Letargo',
            'Pérdida de apetito',
            'Vómitos',
            'Diarrea grave, a menudo con sangre',
            'Dolor abdominal y distensión abdominal',
            'Fiebre o temperatura corporal baja (hipotermia)'],
    transition:[
      {
      id:[nombre=>"Alta contagiosidad:",content=>"Se propaga con facilidad entre perros."]},
      { id:[nombre=>"Vías de transmisión",
            content=>["Contacto directo con perros infectados.","Contacto con heces contaminadas.","Contacto con superficies u objetos contaminados (perreras, platos, correas, ropa y manos humanas)."]]},
{ id:[nombre=>"Amplio rango de contagio",content=>["Puede transmitirse entre perros domésticos, asilvestrados y cánidos salvajes."]]},
{  id:[nombre=>"Gran resistencia ambiental",content=>["Resiste calor, frío, humedad y sequedad.","Puede sobrevivir mucho tiempo en el ambiente."]]},
{ id:[nombre=>"Alta carga viral",content=>["Pequeñas cantidades de heces pueden causar infección."]]},
{ id:[nombre=>"Necesidad de desinfección estricta:",content=>[" Requiere productos específicos capaces de eliminar el virus."]]},
{ id:[nombre=>"Medidas de control:",content=>["Aislamiento inmediato de perros sospechosos o infectados.","Limpieza y desinfección profunda de las áreas contaminadas."]]},
{ id:[nombre=>"Asesoría veterinaria esencial:", content=>["El veterinario indica las medidas adecuadas para evitar la propagación en el hogar y otros entornos."]]},
    ],
    type: "Viral",
    color: "bg-rose-500",
    action: "Learn Prevention",
    image: "🦠",
  },
  {
    id:2,
    title: "Lyme Disease",
    description: "Transmitted by ticks, this can affect both dogs and cats. Watch for fever, swelling, and loss of appetit",
    type: "Bacterial",
    color: "bg-amber-500",
    action: "View Symptoms",
    image: "🔬",
  },
  {
    id:3,
    title: "Feline Diabetes",
    description: "Common in older, overweight cats. Signs include increased thirst, frequent urination, and weight loss.",
    type: "Chronic",
    color: "bg-blue-500",
    action: "Read Management",
    image: "💉",
  },
  {
    id:4,
    title: "Kennel Cough",
    description: "Infectious bronchitis causing a persistent, forceful cough. Highly contagious in close quarters.",
    type: "Respiratory",
    color: "bg-emerald-500",
    action: "Treatment Options",
    image: "🫁",
  },
  {
    id:5,
    title: "Kennel Cough",
    description: "Infectious bronchitis causing a persistent, forceful cough. Highly contagious in close quarters.",
    type: "Respiratory",
    color: "bg-emerald-500",
    action: "Treatment Options",
    image: "🫁",
  },
  {
    id:6,
    title: "Canine Parvovirus",
    description: "A retrovirus that weakens the immune system. Regular testing and vaccination are essential.",
    type: "Viral",
    color: "bg-rose-500",
    action: "Learn Prevention",
    image: "🦠",
  },
  {
    id:7,
    title: "Lyme Disease",
    description: "Transmitted by ticks, this can affect both dogs and cats. Watch for fever, swelling, and loss of appetit",
    type: "Bacterial",
    color: "bg-amber-500",
    action: "View Symptoms",
    image: "🔬",
  },
  {
    id:8,
    title: "Feline Diabetes",
    description: "Common in older, overweight cats. Signs include increased thirst, frequent urination, and weight loss.",
    type: "Chronic",
    color: "bg-blue-500",
    action: "Read Management",
    image: "💉",
  },
] 
const services = [
  {
    title: 'Adoption',
    description:
      'Find your ideal companion among our rescued pets looking for a loving home.',
    icon: faHeart,
    link: 'adoption',
    bg: 'bg-terracotta-light',
    color: 'text-accent',
  },
  {
    title: 'General Consultation',
    description:
      "Complete evaluation of your pet's health with our specialized veterinarians.",
    icon: faStethoscope,
    link: '/services',
    bg: 'bg-sage-light',
    color: 'text-primary',
    procesos:['Complete physical examination','Clinical history','Treatment plan','Follow-up']
  },
  {
    title: 'Vaccination',
    description:
      'Complete vaccination program to protect your pet from diseases.',
    icon: faSyringe,
    link: '/services',
    bg: 'bg-sky/10',
    procesos:['Vaccines for dogs','Vaccines for cats','Personalized calendar','Certification'],
    color: 'text-sky',
  },
  {
    title: '24h Emergencies',
    description:
      'Emergency care 24 hours a day, 7 days a week.',
    icon: '',
    link: '/contacto',
    bg: 'bg-terracotta-light',
    color: 'text-coral',
    procesos:['24/7 availability','Specialized team','Rapid diagnosis','Intensive care'],
  },
  {
    title: 'Surgery',
    description:
      'Surgical procedures with safe anesthesia and constant monitoring.',
    icon: faMicroscope,
    link: '/services',
    bg: 'bg-sage-light',
    color: 'text-primary',
    procesos:['Sterilization','Soft tissue surgery','Traumatology','Post-operative']
  },
  {
    title: 'Laboratory',
    description:
      'Clinical analyzes with fast and accurate results for accurate diagnoses.',
    icon: faMicroscope,
    link: '/services',
    bg: 'bg-sage-light',
    color: 'text-primary',
    procesos:['Hemograms','Blood chemistry','Urinalysis','Quick results']
  },
    {
    title: 'Deworming',
    description:'Internal and external antiparasitic treatments to keep your pet free of parasites.',
    icon: faMicroscope,
    link: '/services',
    bg: 'bg-sage-light',
    color: 'text-primary',
    procesos:['Internal parasites','External parasites','Quality products','Periodic control']
  },
  {
    title: 'Veterinary Dentistry',
    description:
      'Professional dental cleaning and treatments for optimal oral health.',
    icon: faTooth,
    link: '/services',
    bg: 'bg-terracotta-light',
    color: 'text-accent',
    procesos:['Teeth cleaning','Extractions','Gum treatment']
  },
  {
    title: 'Preventive medicine',
    description:
      'Preventive health plans to keep your pet healthy throughout their life.',
    icon: faTooth,
    link: '/services',
    bg: 'bg-terracotta-light',
    color: 'text-accent',
    procesos:['Annual checkups','Nutrition','Weight control','General well-being']
  },
]
const doctors= [
  {
    id: 1,
    name: 'Dr. Laura Martínez',
    specialty: ['General Consultation', 'Preventive medicine'],
     avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApt8_b4fUQYwS8prThyy-yPwh_H7W1fy9Kvj8iBVBcwRtJrgwynMNJw4tuWwqjoveKAe0rAlZ9QCMFSqGDB3hKzMzLcQpyH68XzrtsbQ2xCQG2eC0dCKcMi-Hdued46WGkDVcRwbiZAk3XzT4lputQePSj7EkAp4diRHPeSMMb1f9eorqo06CXH6qaxbtfM22EvsTLBXrt0EVomGwJydGRpEXhZ_Hs6lt1J14F2Ame1Wc5ATKH0aSRMXibHJrcF2K_ojC2eqRFeKkr',
    processes:[{title:'Soft Tissue Repair',price:1000},{title:"Endoscopy",price:1500},{title:'Biopsy',price:2000}],

    phone: '+1 809-555-1234',
    schedule: [{ day:'Lunes', hour: null},{ day:"Martes",hour:'10-6'},{day:'Miercoles', hour:'10-6'},{day:'Jueves',hour:'9-4'},{day:'Viernes',hour:'10-6'},{day:'Sabados',hour:'9-2'},{day:'Domingos',hour:null }]
  },
  {
    id: 2,
    name: 'Dr. Carlos Gómez',
     avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApt8_b4fUQYwS8prThyy-yPwh_H7W1fy9Kvj8iBVBcwRtJrgwynMNJw4tuWwqjoveKAe0rAlZ9QCMFSqGDB3hKzMzLcQpyH68XzrtsbQ2xCQG2eC0dCKcMi-Hdued46WGkDVcRwbiZAk3XzT4lputQePSj7EkAp4diRHPeSMMb1f9eorqo06CXH6qaxbtfM22EvsTLBXrt0EVomGwJydGRpEXhZ_Hs6lt1J14F2Ame1Wc5ATKH0aSRMXibHJrcF2K_ojC2eqRFeKkr',
    specialty: ['Surgery', '24h Emergencies','Preventive medicine'],
    processes:[{title:'Soft Tissue Repair',price:1000},{title:"Endoscopy",price:1500},{title:'Biopsy',price:2000}],

    phone: '+1 809-555-5678',
    schedule: [{ day:'Lunes', hour: null},{ day:"Martes",hour:'10-6'},{day:'Miercoles', hour:'10-6'},{day:'jueves',hour:null},{day:'Viernes',hour:'10-6'},{day:'Sabados',hour:'9-2'},{day:'Domingos',hour:"10-6" }]
  },
  {
    id: 3,
    name: 'Dr. Ana Pérez',
    specialty: ['Laboratory', 'Vaccination', 'Deworming'],
     avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApt8_b4fUQYwS8prThyy-yPwh_H7W1fy9Kvj8iBVBcwRtJrgwynMNJw4tuWwqjoveKAe0rAlZ9QCMFSqGDB3hKzMzLcQpyH68XzrtsbQ2xCQG2eC0dCKcMi-Hdued46WGkDVcRwbiZAk3XzT4lputQePSj7EkAp4diRHPeSMMb1f9eorqo06CXH6qaxbtfM22EvsTLBXrt0EVomGwJydGRpEXhZ_Hs6lt1J14F2Ame1Wc5ATKH0aSRMXibHJrcF2K_ojC2eqRFeKkr',
       processes:[{title:'Soft Tissue Repair',price:1000},{title:"Endoscopy",price:1500},{title:'Biopsy',price:2000}],

    phone: '+1 809-555-9012',
    schedule: [{ day:'Lunes', hour: null},{ day:"Martes",hour:'10-6'},{day:'Miercoles', hour:'10-6'},{day:'jueves',hour:null},{day:'Viernes',hour:'10-6'},{day:'Sabados',hour:'9-2'},{day:'Domingos',hour:null }]
  },
  {
    id: 4,
    name: 'Dr. Miguel Santos',
    specialty: ['Veterinary Dentistry'],
     avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApt8_b4fUQYwS8prThyy-yPwh_H7W1fy9Kvj8iBVBcwRtJrgwynMNJw4tuWwqjoveKAe0rAlZ9QCMFSqGDB3hKzMzLcQpyH68XzrtsbQ2xCQG2eC0dCKcMi-Hdued46WGkDVcRwbiZAk3XzT4lputQePSj7EkAp4diRHPeSMMb1f9eorqo06CXH6qaxbtfM22EvsTLBXrt0EVomGwJydGRpEXhZ_Hs6lt1J14F2Ame1Wc5ATKH0aSRMXibHJrcF2K_ojC2eqRFeKkr',
     processes:[{title:'Soft Tissue Repair',price:1000},{title:"Endoscopy",price:1500},{title:'Biopsy',price:2000}],
    phone: '+1 809-555-3344',
    schedule: [{ day:'Lunes', hour: null},{ day:"Martes",hour:'10-6'},{day:'Miercoles', hour:'10-6'},{day:'jueves',hour:null},{day:'Viernes',hour:'10-6'},{day:'Sabados',hour:'9-2'},{day:'Domingos',hour:null }]
  }
]

export default {
  nombre: 'Data',
  value: [portada,animals,diseases,services,doctors],
};
