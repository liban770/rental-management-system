import { Property, RentCollectionTransaction } from '../types';

export const FX_RATE_USD_TO_SLSH = 8500;

export function formatCurrency(amountUsd: number, currency: 'USD' | 'SLSH'): string {
  if (currency === 'SLSH') {
    const slsh = amountUsd * FX_RATE_USD_TO_SLSH;
    return `${slsh.toLocaleString()} SL Sh`;
  }
  return `$${amountUsd.toLocaleString()}`;
}

export const PROPERTIES: Property[] = [
  {
    id: 'the-palms-luxury-villa',
    title: 'The Palms Luxury Villa',
    tagline: 'Modern 4-Bedroom Gated Compound',
    location: 'Jigjiga Yar, Near Ambassador Hotel Road',
    district: 'Jigjiga Yar',
    city: 'Hargeisa',
    priceUsd: 1400,
    beds: 4,
    baths: 3.5,
    areaM2: 340,
    parking: 2,
    yearBuilt: 2023,
    category: 'villa',
    deedNumber: 'SLD-9942',
    isVerified: true,
    isFeatured: true,
    isAvailableNow: true,
    furnishing: 'Fully Furnished',
    rating: 4.96,
    reviewCount: 18,
    images: {
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtyrpITUSzDFTD5UsfgYt42JXOH8LpJM8L5Pv7GZAqM1G9es1QLr_9bn7rqNCjz5hOTBdGrCH6EbDzIIpjzLgrKyMDm6MX2DuwpjLYvvuB8A09mYy4XZ2IMWWgbBaozVRYyfXaKK77eATrJUQPgC3MVgwdXkVHn7uMvbTHhuJOr063yn1Jz3WOLTA81bFny6nHnZPWTR0RRoKtfcVTtFIFuuatnyyM8rxTPW8ESQJzraLA385WRv5T',
      master: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8kIInGIv47BnAJ2PzC6LlTL7Icq_XJXGqgTCDsIw8-gVq_Dg5z-bBbmFeiA6zXZ50pkmfuiPF8XwEjpXFyon158TD_mbcntctPX21Kqje5Q1eMXsv8ix_18AEZDe08F3hmzdYsen71R_wP8ilneg9W2rdGKZPbSD4oDE1YM9FZl06BoypDwqNqbb-gUJQh57cPI-GITJy2hB5TX08mPyCjWONo8NKp_DpQnV95bZlyh0jYJXKTljf',
      kitchen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVL2AMrip7YQbxVBYSYW_MaCAMreU6kvnwitKQ5gCKZZ5FdI9Pnzxxo86bDb8apQMLhDqtULogP7XImfw7yHvuCvf1H7-gaanYE_ZWsXKmhJMluUgF_firfbi65lO1W0XrUB539aORHG5s62xQMiJ2CPNv28xxQ_O42CqhbL0FQ_KxsHw-YZrYjKvsYVOT9ITtT7bJFopbXGH8UFJffkm9XUZZzA9XYZ-904luY9CLqSkaqTZ5Adln',
      courtyard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR1QbHBQ_YA5KiLAVhhKX675V2hGHEhMDDWktqf3tI7u1AM6YvsTMB3nLajsXe_83jVbZ1Ax8lgirWsl1oNXLeWdwOtdsLqjLZDn-Jzb2-YAXMDcP5NlGNUYHrUZqBxYZuqexCL7HhVNc26F2Cl62GzUW8ESJ-GZYJGuC8ztEZXPzEWMVfXf5cVXm2n_0cbHXDqvbSmYk_Bw_v2FMB6oMkTv1-K8wU1T8pLvbRV2AND8U-DjimhLeH',
      aerial: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZhXNIfcPk9MluIg26RIVJcx40QwCXn7Ql4O_JygoulOqy_KgK7xF4LAJnkV8sPfLZ8T_zYzXQAnyXbHV4hAU3hZf3Rw4QgG4-oaAQECUxYFqkRnKv8Dind1ol_8PamnBHFbzxvUluHsuHEbJOujoVAdehoK_9jroN0NzZbQi5r1YuDPwAR2uzQqC9OqbpAsddZXKpLA7tlS4fo60ZJSAgmB5S4CbFrfkzOPAkm-SWKsQ0npWi3pmh',
      gallery: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC2RSfN_V3_0P0nmUBiWwJhItXJMN-ee8jy1G3w741hPej1t_ME6Cv-yjf8p0YRWoNlbRS9-zCBSyg3MGEwFHw8K26gfU-lEuvXhb82-U4xtKf8H1nSigJ4vW9GEQQcRnBGuaonoxuexUPqFlCCkl2OL46_AP5eKzFv5amplr1qXhBmBUMqH_2W2UkNDzOCB5IxnD4lPTfgLZ1EVdsROkr27s4x89QUDqyeifFnxbdtv88rjGpkbuyL',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD5ly6zxwjIwW-Jj8QLukD69jR1f7nFt_9ziQOh0bR1ztu53d4zq0VaJmNauNS5Gg87X_m2_IrVBe_LP99qshw6od1_m8EXy351R6KY6-rg9lGsKfm2EHVX0Umi7xLBpWl-bJNfxZKzaF66psETTqK0C3O-Aw5Btt8VRkLK2BOrrnKWMifJG9MxfxV7jpA0hFu6h1zjWkg9jQss8ypzOjA68GD-T1ECBYcaz-IPLAS7X0tNdgY_aVBX',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB2BqpU2eiM7HdeZ9NjKUBw8arJf3n9EIZA_KjSTqnaLoAgSo9B_j75StMi2V1puNwjqxc_VC-lqxnFNlkg6hZKfk-XAxGBFScngxrW35omx0g-QReb3v5d26YIAPZbmD84rvVMckDXa2fbTMcv0WVCni8RpuLJBMM3GcGocKFxdZSgq7r9tyrlf-VWcEPgQlLOXFd1BxI4yPeaDoG3V_0yWkz9ohqrH2lcx5p2g38q28ZjmS4OKO_w',
      ]
    },
    amenities: [
      'Backup Solar System (10kVA hybrid + Li-ion)',
      'Borehole Supply (Continuous city + ground water)',
      'Electric Perimeter (3.5m stone wall + pulse wires)',
      'Guard Quarters (Self-contained gatehouse)',
      'Master A/C Climate (Dual inverter units)',
      'Italian Porcelain (120x60 calibrated tiles)',
      'Fitted Kitchen (Bosch hob & oven ready)',
      'Laundry Facility (Washer hookup & utility sink)',
      'Swimming Pool',
      'High Speed Fiber Ready (Telesom)',
      'Covered Parking',
      'Solar Backup'
    ],
    description: `Situated in Hargeisa's most sought-after diplomatic and executive corridor, The Palms Luxury Villa provides an unmatched balance of architectural presence, resilient infrastructure, and tranquil residential living. Built to European engineering standards in late 2023, the property was meticulously drafted for expatriate families, international agency directors, or prominent diaspora returns seeking uninterrupted comfort.

The residence features autonomous utility ecosystems designed specifically for regional independence: an integrated 10kVA Hybrid Solar Inverter system backed by tier-1 lithium storage, an automated pressurized subterranean 20,000-liter freshwater reservoir, and dual-source borehole connectivity.

Interior spaces are distinguished by 3.2m coffered ceilings, imported Italian porcelain slabs, Grohe German sanitary fixtures, and floor-to-ceiling double-glazed thermal acoustic windows that frame panoramic sunsets over Naasa Hablood peaks.`,
    financialTerms: {
      monthlyRentUsd: 1400,
      depositUsd: 1400,
      minLeaseMonths: 12,
      paymentMethods: ['Zaad Service (Telesom)', 'e-Dahab (Somtel)', 'Dahabshiil Bank Wire', 'Premier Bank Swift']
    },
    proximity: {
      airportMin: 14,
      cityCenterMin: 8,
      hospitalMin: 6,
      unHubMin: 9,
      coordinates: '9.5621° N, 44.0652° E'
    },
    landlord: {
      name: 'Mustafe Duale',
      role: 'Certified Agent #104',
      agency: 'Premier Property Group',
      isKycVerified: true,
      rating: 4.98,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrgL1n2mvtSuKZYGX0VTuXU-BEreJ3_4B4lPuf32eYjKWeqB8ITpSmOYhLwYGhFMzZ60d2v8mpSSoqGQwzzPS1Xj4YBlFWxXbL-SVMixsWhhDFmSjPkC9HbnDHz5Qdpj8IxGyxQLvcllCk8wygC94jEyHVSSVhF2Mg9ynDO5asEkAx2zVpDg3wYP9QJhg3Y0WjLnA_h2G4Z533x8Ykt0Vdw9vjSni3WxOaX2vZHPnB7fn98GIze4iH',
      phone: '+252 63 442 8110',
      whatsapp: '252634000000'
    }
  },
  {
    id: 'red-sea-breeze-residence',
    title: 'Red Sea Breeze Residence',
    location: 'Coastal District, Port Maritime Area',
    district: 'Port Maritime',
    city: 'Berbera',
    priceUsd: 950,
    beds: 3,
    baths: 2,
    areaM2: 210,
    parking: 2,
    yearBuilt: 2024,
    category: 'villa',
    deedNumber: 'BER-8819',
    isVerified: true,
    isAvailableNow: true,
    furnishing: 'Fully Furnished',
    rating: 4.92,
    reviewCount: 14,
    images: {
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQaFGJL2-sMJ5fe73LQu71e8TaeBS44FYG2aAZLxLHicOqMQ-iT8j39wS-G3vQTwKMdYyDWj3Cr1RIDGUQcnf3ozHle9VfLqk7_konly9-7r6fIq78lz32mqKh-4NfGdFoZMKT_Ha3w8pBC1pYNdv8rmCFWMeimqITMN1g2M4O_quHtI-G3HEdI5mobO3R2C8ZdmZyUb1dvQ0k66SuXGHJt4Z1UhK2BknK4nKtmw-TDsDjO3Rja0RL',
      aerial: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNEG3GEzwUQvmZFbo5uYFWcIiyIlWtSlDeTVmhINBVbZ4v1W2PEqsrUuV9QDaEtHIbeOXGLmnW78e9o6wwiRAiuu96MuZ9hyGg_91Qlo22FaRipFZ-qUxXTclvsaclc3PeRZkCeRG-7bynRYss_JBNyQmagCi_ca9e3XFizXZHpazUciYRjv_yQLJrZ-vIrFTuOHClS7mYZbWLP6rwp4AeDyRijUnnkIoJiSTWMS_hJCtR0Q2hb1Wy'
    },
    amenities: [
      'Ocean View Panoramic Balcony',
      'Central AC Throughout',
      'Desalinated Water Filtration System',
      'Solar Rooftop Array',
      'Private Garage',
      'Security Gatehouse'
    ],
    description: `Contemporary coastal villa situated along the azure shores of Berbera's developing maritime quarter. Designed with white thermal plaster, sun-deflecting louvers, and direct views of Gulf of Aden shipping corridors.`,
    financialTerms: {
      monthlyRentUsd: 950,
      depositUsd: 950,
      minLeaseMonths: 12,
      paymentMethods: ['Zaad', 'e-Dahab', 'Premier Wire']
    },
    proximity: {
      airportMin: 18,
      cityCenterMin: 5,
      hospitalMin: 8,
      unHubMin: 12,
      coordinates: '10.4320° N, 45.0125° E'
    },
    landlord: {
      name: 'Ismail Farah',
      role: 'Berbera Regional Asset Manager',
      agency: 'Maritime Land Partners',
      isKycVerified: true,
      rating: 4.90,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLR8EXSNluWJN0Evk93gY-7toQyFVoA-wwwCCecCyTdJgorWHX5VQQr1ezMTUHOylH_ZMrh-jwvVZM0oLQWItzK_DHMoWsNziIWWcXfp8TgUxoLfQ06t8svPcYKIcg0eyo0L0-aZepk2J52FPKcqrI9Zkd3Sbqb_RnDw7vZ9t-JaZ0fG4LTL3LHBBtoxAasTyyeQLUXBPS7gnRln9UnZIsQ01Vv6BD8Mzeu3a03h2e2OP0aDwYAIXK',
      phone: '+252 63 331 4455',
      whatsapp: '252633314455'
    }
  },
  {
    id: 'al-noor-diplomatic-heights',
    title: 'Al-Noor Diplomatic Heights',
    location: 'Shacabka, Presidential & Embassies Corridor',
    district: 'Shacabka',
    city: 'Hargeisa',
    priceUsd: 2200,
    beds: 5,
    baths: 5,
    areaM2: 450,
    parking: 4,
    yearBuilt: 2023,
    category: 'villa',
    deedNumber: 'SLD-7102',
    isVerified: true,
    isFeatured: true,
    furnishing: 'Fully Furnished',
    rating: 4.98,
    reviewCount: 22,
    images: {
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArAmogti3WFkoMN56Wehd9WYLj6sGl4XgZJXcV-j_ykVZmX-vgFThO0tqkPyCrE0P77qjZBQvzc5QiU2vSThD1t-a2yOoWSi_hMK-kjVZijFJQ1E3p_fJ2XAouuSexxpZkM14jPXyYQUJQN0_N25Gx2YIVTS6SmrXjZxXy4dN46iCO2r8daZgWioXHHmNWJhxOa4uq-fRpz0HT8czEycVKWA_n68lOnMUHR_Ix7vmSOauEA_5bcQHr',
    },
    amenities: [
      'Reinforced Gated Guard Post',
      'Dual Cummins Diesel Generators',
      'Staff Servant Quarters (2 rooms)',
      'Security Camera Array (16 CCTV)',
      'Deep Borehole Water Reservoir',
      'Diplomatic Motorcade Driveway'
    ],
    description: `A fortress of luxury tailored specifically for foreign missions, international aid directors, and multinational executives in the prestigious Shacabka government sector.`,
    financialTerms: {
      monthlyRentUsd: 2200,
      depositUsd: 2200,
      minLeaseMonths: 24,
      paymentMethods: ['USD Wire', 'Zaad', 'e-Dahab']
    },
    proximity: {
      airportMin: 12,
      cityCenterMin: 4,
      hospitalMin: 5,
      unHubMin: 3,
      coordinates: '9.5580° N, 44.0590° E'
    },
    landlord: {
      name: 'Ahmed Mohamed Duale',
      role: 'Owner & Diplomatic Landlord',
      agency: 'Duale Horizon Estates',
      isKycVerified: true,
      rating: 4.97,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwSGCCnwcpbJXrpzQKI3Oe2jGSYufZmfgC2OdtRkTZxwokqrBgukYt1lOuqbY4ZmUxVSQDzlDuIQdyzE_9itvYRchjag5zAxbWvSovb5lNRQBnM5gl_PHsOXmWbbXpDlP8MujftgaiLZCsq5XUIJmWpgbGGcQFkfgyA3WrweHnpmoRG2yk2HNT3afuXV29lvaJnIeVurMKTpvfbPjbl6140hXi8rW63jHEangYPzL_DAYgR9mEWwRH',
      phone: '+252 63 442 8110',
      whatsapp: '252634428110'
    }
  },
  {
    id: 'galgacyo-modern-townhouse',
    title: 'Galgacyo Modern Townhouse',
    location: 'Ibrahim Koodbuur District',
    district: 'Ibrahim Koodbuur',
    city: 'Hargeisa',
    priceUsd: 650,
    beds: 2,
    baths: 2,
    areaM2: 140,
    parking: 1,
    yearBuilt: 2024,
    category: 'apartment',
    deedNumber: 'HRG-4521',
    isVerified: true,
    isAvailableNow: true,
    furnishing: 'Semi-Furnished',
    rating: 4.88,
    reviewCount: 9,
    images: {
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0SoUA9EH7msQ6af5rp7-byQDVZTq60L33GtUcRjittA8embs-TesGCRP-UiVZQ4xGw6CK4uRo7V-4e-FqaC5TbarQZgpJ39-G3qkDSj_YhgjI2Pn4voMaYSvJsMB5j7zFFKMXzGUT8bFsMj7GOv5gHnlyJgkDx7DEfD_ukLPEOHprNrIF3Ym03FG_ercUQESoz4gEuXWngmWioxxwExJZyeV1Fi8ZcK0JWPZLXr50J8gE-Ve31lTi',
    },
    amenities: [
      'High Speed Fiber Internet',
      'Covered Garage',
      'Municipal Water Connection',
      'Inverter Battery Backup',
      'Modern Modular Kitchen'
    ],
    description: `A brand-new architectural townhouse combining clean minimalist lines with durable Somaliland stonework. Ideal for couples, young professionals, or diaspora returning on remote work assignments.`,
    financialTerms: {
      monthlyRentUsd: 650,
      depositUsd: 650,
      minLeaseMonths: 12,
      paymentMethods: ['Zaad', 'e-Dahab']
    },
    proximity: {
      airportMin: 16,
      cityCenterMin: 10,
      hospitalMin: 8,
      unHubMin: 12,
      coordinates: '9.5710° N, 44.0720° E'
    },
    landlord: {
      name: 'Sahra Hassan',
      role: 'Private Owner',
      agency: 'Direct Listing',
      isKycVerified: true,
      rating: 4.91,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6g7MlIjpvcg93Mn1gyV2hofFjWBEZvv775cKdhRCrRaIDafDJjQztpqZkhS6Ht1ziDmJ6bVpt8nSAKS_ybhCVtUxjcUAj59S8HTif4CCUBmlbsETjrdUGesf-tNol0rPi11V4anlaEV7Kj94pR06C6d6NMLXG0nfZTZ-xFEOlG_mj2IX2elxyd6CsD7ojtb0oHmj4nnWfzgAQkr4ydzs9MclOgfSk5y4SdzxAncitWpOgvqOw2MSY',
      phone: '+252 63 779 1234',
      whatsapp: '252637791234'
    }
  },
  {
    id: 'gollis-foothills-duplex',
    title: 'Gollis Foothills Duplex',
    location: 'Borama Central, Amoud Valley Road',
    district: 'Amoud Valley',
    city: 'Borama',
    priceUsd: 550,
    beds: 3,
    baths: 2,
    areaM2: 180,
    parking: 2,
    yearBuilt: 2023,
    category: 'duplex',
    deedNumber: 'BOR-1904',
    isVerified: true,
    furnishing: 'Unfurnished',
    rating: 4.85,
    reviewCount: 11,
    images: {
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn1F3PZ4rao9lXnZfs9kKN6AfKm9bQMdn8ksw3KDpRTDLHm_XEoPIUTgx-_rpXCx62Hti4BWUYrG41-HQUtK_-9Pelhua60KX-TpxoH0tn_nrtuYt4nR39G-mCBErCNyCStgYC535r7CywTgwezZM5x0_Tk137qyrWo7L0CpW4CbEHmJuFYuOMUnDPOmUvF2_wGgsZ4_mcAgBdmM4d57zy3_Jh6RONvpkrj1WjfhP27KkIMC40TFIp',
    },
    amenities: [
      'Natural Cool Mountain Air',
      'Private Terraced Garden',
      'Solar Water Heating Panels',
      'Gated Compound',
      'Borehole Water System'
    ],
    description: `Nestled in the lush hills of Borama near the Amoud University campus. Offers serene cooler climate, stone masonry lower level, and expansive green views.`,
    financialTerms: {
      monthlyRentUsd: 550,
      depositUsd: 550,
      minLeaseMonths: 12,
      paymentMethods: ['Zaad', 'e-Dahab']
    },
    proximity: {
      airportMin: 45,
      cityCenterMin: 6,
      hospitalMin: 5,
      unHubMin: 10,
      coordinates: '9.9360° N, 43.1840° E'
    },
    landlord: {
      name: 'Mohamed Warsame',
      role: 'Property Guardian',
      agency: 'Awdal Estates',
      isKycVerified: true,
      rating: 4.90,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwSGCCnwcpbJXrpzQKI3Oe2jGSYufZmfgC2OdtRkTZxwokqrBgukYt1lOuqbY4ZmUxVSQDzlDuIQdyzE_9itvYRchjag5zAxbWvSovb5lNRQBnM5gl_PHsOXmWbbXpDlP8MujftgaiLZCsq5XUIJmWpgbGGcQFkfgyA3WrweHnpmoRG2yk2HNT3afuXV29lvaJnIeVurMKTpvfbPjbl6140hXi8rW63jHEangYPzL_DAYgR9mEWwRH',
      phone: '+252 63 711 4092',
      whatsapp: '252637114092'
    }
  },
  {
    id: 'somali-star-executive-flat',
    title: 'Somali Star Executive Flat',
    location: '26 June District, Downtown Fringe',
    district: '26 June',
    city: 'Hargeisa',
    priceUsd: 800,
    beds: 2,
    baths: 2,
    areaM2: 160,
    parking: 1,
    yearBuilt: 2024,
    category: 'apartment',
    deedNumber: 'SLD-4901',
    isVerified: true,
    isAvailableNow: true,
    furnishing: 'Fully Furnished',
    rating: 4.94,
    reviewCount: 16,
    images: {
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf9idgRc_O5kJIxkcP6TpfqH8poBKwimWDYC-pblOnsRXU_1GAYUgWwAmrV2jvr3Q54-kJhA-rLXstnJVc2PUc19_U2wx6SCzKLUMZj2hRmmCVjJ7Nw-ajizrzKlK-7G-jzckcWkhpj3r5KRbx_cSrEi8JwLHtn87LaM24k8-p9twSFYC_MyuhPY3UMJLacGzujXmsiM2xZa_6IfI2B1SUTqtkgiNRv7aENTjJ53v0bn9yDErL2ShW',
    },
    amenities: [
      'Modern High-Speed Elevator',
      '24/7 Monitored CCTV',
      'Underground Secure Parking',
      'Prepaid Sompower Smart Meter',
      'Concierge Desk'
    ],
    description: `High-floor executive apartment overlooking the bustling central spine of Hargeisa with modern imported fittings, secure elevator keycard access, and rooftop terrace.`,
    financialTerms: {
      monthlyRentUsd: 800,
      depositUsd: 800,
      minLeaseMonths: 6,
      paymentMethods: ['Zaad', 'e-Dahab', 'Premier Wire']
    },
    proximity: {
      airportMin: 10,
      cityCenterMin: 3,
      hospitalMin: 4,
      unHubMin: 6,
      coordinates: '9.5640° N, 44.0620° E'
    },
    landlord: {
      name: 'Mustafe Duale',
      role: 'Certified Agent #104',
      agency: 'Premier Property Group',
      isKycVerified: true,
      rating: 4.98,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrgL1n2mvtSuKZYGX0VTuXU-BEreJ3_4B4lPuf32eYjKWeqB8ITpSmOYhLwYGhFMzZ60d2v8mpSSoqGQwzzPS1Xj4YBlFWxXbL-SVMixsWhhDFmSjPkC9HbnDHz5Qdpj8IxGyxQLvcllCk8wygC94jEyHVSSVhF2Mg9ynDO5asEkAx2zVpDg3wYP9QJhg3Y0WjLnA_h2G4Z533x8Ykt0Vdw9vjSni3WxOaX2vZHPnB7fn98GIze4iH',
      phone: '+252 63 442 8110',
      whatsapp: '252634000000'
    }
  },
  {
    id: 'the-obsidian-horizon-villa',
    title: 'The Obsidian Horizon Villa',
    location: 'Jigjiga Yar, Diplomatic Quarter',
    district: 'Jigjiga Yar',
    city: 'Hargeisa',
    priceUsd: 1850,
    beds: 5,
    baths: 6,
    areaM2: 480,
    parking: 3,
    yearBuilt: 2024,
    category: 'villa',
    deedNumber: 'SLD-8820',
    isVerified: true,
    isFeatured: true,
    furnishing: 'Fully Furnished',
    rating: 4.97,
    reviewCount: 15,
    images: {
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBShRiLlSEZ142pFa2ry5bUtzN9oKp92aixXlilvyyrlZwR7BDNtRnzVPcR8eq5ZXw4im4YhM0gBdU9_JEGLAEs_5KUYzHrKRkkH4RiGC2kwL-MS1yZbpKoSR7DSFCiQMZaIYdyaRCE6QBP7_s21nQWd9Hs5GziROfdBlsS2eJqxpwF53qhW2J9xRj2TxPAUCJOMaLsg-N6FMIdycKyCTvwLMOLcZOTj3_MCCRl1V9OOWYiYjeJ6cE2',
    },
    amenities: [
      'Private 15kW Solar Inverter Array',
      'Dual Generator Redundancy',
      'Dedicated Perimeter Security Post',
      'Lush Desert Courtyard Garden',
      'Master Jacuzzi & Steam Enclosure'
    ],
    description: `Executive freestanding residence in the heart of Jigjiga Yar diplomatic zone. Equipped with independent microgrid energy resilience and European standard fittings.`,
    financialTerms: {
      monthlyRentUsd: 1850,
      depositUsd: 1850,
      minLeaseMonths: 12,
      paymentMethods: ['Zaad', 'USD Wire', 'e-Dahab']
    },
    proximity: {
      airportMin: 13,
      cityCenterMin: 7,
      hospitalMin: 5,
      unHubMin: 8,
      coordinates: '9.5630° N, 44.0670° E'
    },
    landlord: {
      name: 'Ahmed Mohamed Duale',
      role: 'Owner',
      agency: 'Direct Landlord',
      isKycVerified: true,
      rating: 4.97,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwSGCCnwcpbJXrpzQKI3Oe2jGSYufZmfgC2OdtRkTZxwokqrBgukYt1lOuqbY4ZmUxVSQDzlDuIQdyzE_9itvYRchjag5zAxbWvSovb5lNRQBnM5gl_PHsOXmWbbXpDlP8MujftgaiLZCsq5XUIJmWpgbGGcQFkfgyA3WrweHnpmoRG2yk2HNT3afuXV29lvaJnIeVurMKTpvfbPjbl6140hXi8rW63jHEangYPzL_DAYgR9mEWwRH',
      phone: '+252 63 442 8110',
      whatsapp: '252634428110'
    }
  },
  {
    id: 'marina-heights-seafront-penthouse',
    title: 'Marina Heights Seafront Penthouse',
    location: 'Marina Waterfront, Berbera Free Zone',
    district: 'Port Maritime',
    city: 'Berbera',
    priceUsd: 2400,
    beds: 3,
    baths: 3,
    areaM2: 260,
    parking: 2,
    yearBuilt: 2024,
    category: 'apartment',
    deedNumber: 'BER-9021',
    isVerified: true,
    isFeatured: true,
    furnishing: 'Fully Furnished',
    rating: 4.99,
    reviewCount: 8,
    images: {
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNEG3GEzwUQvmZFbo5uYFWcIiyIlWtSlDeTVmhINBVbZ4v1W2PEqsrUuV9QDaEtHIbeOXGLmnW78e9o6wwiRAiuu96MuZ9hyGg_91Qlo22FaRipFZ-qUxXTclvsaclc3PeRZkCeRG-7bynRYss_JBNyQmagCi_ca9e3XFizXZHpazUciYRjv_yQLJrZ-vIrFTuOHClS7mYZbWLP6rwp4AeDyRijUnnkIoJiSTWMS_hJCtR0Q2hb1Wy',
    },
    amenities: [
      'Uninterrupted Gulf of Aden Views',
      'High-Efficiency Central VRF Cooling',
      'High-Speed Dedicated Fiber Uplink',
      '24/7 Facility Concierge & Port Pass Desk',
      'Infinity Jacuzzi Terrace'
    ],
    description: `Corporate lease ready penthouse built for port executives, maritime consultants, and logistics directors overseeing DP World Berbera port operations.`,
    financialTerms: {
      monthlyRentUsd: 2400,
      depositUsd: 2400,
      minLeaseMonths: 12,
      paymentMethods: ['USD Wire', 'Premier Swift', 'Zaad']
    },
    proximity: {
      airportMin: 15,
      cityCenterMin: 3,
      hospitalMin: 6,
      unHubMin: 8,
      coordinates: '10.4350° N, 45.0180° E'
    },
    landlord: {
      name: 'Mustafe Duale',
      role: 'Certified Agent #104',
      agency: 'Premier Property Group',
      isKycVerified: true,
      rating: 4.98,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrgL1n2mvtSuKZYGX0VTuXU-BEreJ3_4B4lPuf32eYjKWeqB8ITpSmOYhLwYGhFMzZ60d2v8mpSSoqGQwzzPS1Xj4YBlFWxXbL-SVMixsWhhDFmSjPkC9HbnDHz5Qdpj8IxGyxQLvcllCk8wygC94jEyHVSSVhF2Mg9ynDO5asEkAx2zVpDg3wYP9QJhg3Y0WjLnA_h2G4Z533x8Ykt0Vdw9vjSni3WxOaX2vZHPnB7fn98GIze4iH',
      phone: '+252 63 442 8110',
      whatsapp: '252634000000'
    }
  },
  {
    id: 'shacabka-regency-garden-residence',
    title: 'Shacabka Regency Garden Residence',
    location: 'Shacabka Hill, Presidential District',
    district: 'Shacabka',
    city: 'Hargeisa',
    priceUsd: 1200,
    beds: 4,
    baths: 4,
    areaM2: 320,
    parking: 2,
    yearBuilt: 2023,
    category: 'villa',
    deedNumber: 'SLD-6540',
    isVerified: true,
    isAvailableNow: true,
    furnishing: 'Fully Furnished',
    rating: 4.93,
    reviewCount: 12,
    images: {
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSgLMq8GY6r6A4Jq5Pt1N7PhN8QEZWKZCg71B74QvNo3o55fDnzWib49Ec18ohs9Qc-pcGY7d9AgOxwSiaK2OOAQFw_l4LowRdml3NBYvbcSw20BHlqsw0aiMhrY1js19Kif31ByOoztP9WMkan4wBQnyOLLhG8VDNtxGDSBJ7kt99fvvt4ACqYu4a864ynrvv9Ndc4l5w7em1bMb1nEgyglLxLvJ08XcLKJEuBzJykf4BwQivirMG',
    },
    amenities: [
      'Quiet Gated Enclave for Family Privacy',
      'Modern Modular German Kitchen',
      'Municipal Water Filtration Sump (15kL)',
      'Solar Backup Grid',
      'Cobblestone Courtyard'
    ],
    description: `Quiet gated enclave designed for family privacy and diplomats. Situated close to embassies with lush landscaping, reliable utilities, and peaceful surroundings.`,
    financialTerms: {
      monthlyRentUsd: 1200,
      depositUsd: 1200,
      minLeaseMonths: 12,
      paymentMethods: ['Zaad', 'e-Dahab', 'Premier Wire']
    },
    proximity: {
      airportMin: 11,
      cityCenterMin: 4,
      hospitalMin: 6,
      unHubMin: 5,
      coordinates: '9.5595° N, 44.0570° E'
    },
    landlord: {
      name: 'Ahmed Mohamed Duale',
      role: 'Owner',
      agency: 'Duale Horizon Estates',
      isKycVerified: true,
      rating: 4.97,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwSGCCnwcpbJXrpzQKI3Oe2jGSYufZmfgC2OdtRkTZxwokqrBgukYt1lOuqbY4ZmUxVSQDzlDuIQdyzE_9itvYRchjag5zAxbWvSovb5lNRQBnM5gl_PHsOXmWbbXpDlP8MujftgaiLZCsq5XUIJmWpgbGGcQFkfgyA3WrweHnpmoRG2yk2HNT3afuXV29lvaJnIeVurMKTpvfbPjbl6140hXi8rW63jHEangYPzL_DAYgR9mEWwRH',
      phone: '+252 63 442 8110',
      whatsapp: '252634428110'
    }
  }
];

export const RECENT_COLLECTIONS: RentCollectionTransaction[] = [
  {
    id: 'tx-1',
    tenantName: 'Liban Warsame',
    tenantPhone: '+252 63 442****',
    tenantInitials: 'LW',
    propertyName: 'Jigjiga Heights',
    unit: 'Unit 4A • 3-Bed Penthouse',
    amountUsd: 1400.00,
    paymentMethod: 'Zaad #TX-9821',
    dateStr: 'Today, 10:14',
    status: 'Paid'
  },
  {
    id: 'tx-2',
    tenantName: 'Fadumo Jama',
    tenantPhone: '+252 65 918****',
    tenantInitials: 'FJ',
    propertyName: 'Mansoor Vista Suites',
    unit: 'Apt 202 • 2-Bed Luxury',
    amountUsd: 850.00,
    paymentMethod: 'e-Dahab #ED-4412',
    dateStr: 'Yesterday, 16:40',
    status: 'Paid'
  },
  {
    id: 'tx-3',
    tenantName: 'Ismail Farah',
    tenantPhone: '+252 63 331****',
    tenantInitials: 'IF',
    propertyName: 'Red Sea Logistics Yard',
    unit: 'Unit B2 • Berbera Port Rd',
    amountUsd: 650.00,
    paymentMethod: 'Premier Bank Wire',
    dateStr: 'Oct 12, 09:10',
    status: 'Processing'
  },
  {
    id: 'tx-4',
    tenantName: 'Sahra Hassan',
    tenantPhone: '+252 63 779****',
    tenantInitials: 'SH',
    propertyName: 'Shacab Corporate Plaza',
    unit: 'Office 301 • Commercial',
    amountUsd: 2100.00,
    paymentMethod: 'Zaad #TX-8742',
    dateStr: 'Oct 11, 14:22',
    status: 'Paid'
  }
];
