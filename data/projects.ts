import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "proj-1",
    slug: "chronos-the-last-horizon",
    title: "BEST YEAR BEHIND A LENS: FIREGUY",
    client: "A24 / Film4",
    category: "AI Video",
    year: 2024,
    duration: "00:27",
    aspectRatio: "2.39:1",
    role: "Director of Photography",
    tagline:
      "A speculative journey across the silence of deep space and human memory.",
    synopsis:
      "Set in the dying atmosphere of an orbital outpost, an atmospheric engineer discovers an uncatalogued frequency echoing the voices of earth before the great silence.",
    story:
      "Shot in dramatic volcanic landscapes and practical studio builds, 'Chronos' required custom anamorphic optics and an organic, tactile lighting palette. We chose large format to render the deep textural details of rock and cosmic dust while preserving an intimate vulnerability in human close-ups.",
    heroVideo: "/videos/video-one.mp4",
    previewVideo: "/videos/video-one.mp4",
    posterImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop",
    featured: true,
    featuredOrder: 1,
    specs: {
      camera: "ARRI Alexa 65 & Alexa Mini LF",
      lenses: "ARRI DNA 65 Large Format Anamorphic (40mm, 60mm, 80mm)",
      aspectRatio: "2.39:1 Anamorphic",
      format: "6.5K Open Gate ARRIRAW",
      colorist: "Damien Vandercruyssen (Company 3)",
      location: "Iceland & Shepperton Studios",
      fps: "24 fps (Select sequences at 48 fps)",
      shutter: "180°",
      iso: "800 EI / 1600 EI Base",
    },
    credits: [
      { role: "Director", name: "Marc Sorenson" },
      { role: "Director of Photography", name: "Kamso Nondi" },
      { role: "Gaffer", name: "Lars Lindström" },
      { role: "Key Grip", name: "Marcus Thorne" },
      { role: "Production Designer", name: "Elena Rostova" },
      { role: "Costume Designer", name: "Julian Vane" },
      { role: "Colorist", name: "Damien Vandercruyssen" },
      { role: "Sound Designer", name: "Gareth John" },
    ],
    stills: [],
  },
  {
    id: "proj-2",
    slug: "porsche-transcend-speed",
    title: "PORSCHE: TRANSCEND SPEED",
    client: "Porsche AG",
    category: "Branded",
    year: 2024,
    duration: "00:18",
    aspectRatio: "2.39:1",
    role: "Director & Cinematographer",
    tagline: "The intersection of raw kinetic energy and aerodynamic mastery.",
    synopsis:
      "A cinematic exploration of precision engineering tracking the Porsche GT3 RS across alpine switchbacks at dawn.",
    story:
      "We aimed to capture the visceral sensory atmosphere of driver focus. By employing an electric camera tracking vehicle rigged with a remote gimbal and vintage Cooke Anamorphic /i lenses, we rendered the mountain dawn with painterly flares and organic motion blur.",
    heroVideo: "/videos/video-two.mp4",
    previewVideo: "/videos/video-two.mp4",
    posterImage:
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000&auto=format&fit=crop",
    featured: true,
    featuredOrder: 2,
    specs: {
      camera: "ARRI Alexa 35 & RED V-Raptor XL",
      lenses: "Cooke Anamorphic /i Full Frame Plus (32mm, 50mm, 85mm)",
      aspectRatio: "2.39:1",
      format: "4.6K ARRIRAW & 8K REDCODE",
      colorist: "Tom Poole (Company 3)",
      location: "Grossglockner Alpine Pass, Austria",
      fps: "24 fps / 72 fps High Speed",
      shutter: "90° / 180°",
      iso: "800 EI Base",
    },
    credits: [
      { role: "Director & DP", name: "Kamso Nondi" },
      { role: "Agency", name: "Grabarz & Partner" },
      { role: "Precision Driver", name: "Stefan Mücke" },
      { role: "Tracking Vehicle Op", name: "Klaus Baumgartner" },
      { role: "Grip", name: "Matthias Huber" },
      { role: "Colorist", name: "Tom Poole" },
    ],
    stills: [],
  },
  {
    id: "proj-3",
    slug: "vogue-noir-silent-drift",
    title: "A MOMENT IN TIME: US",
    client: "Vogue / Saint Laurent",
    category: "Fashion",
    year: 2023,
    duration: "00:21",
    aspectRatio: "2.39:1",
    role: "Director & Cinematographer",
    tagline:
      "A dreamscape of nocturnal elegance, light refractions, and fluid form.",
    synopsis:
      "A high-fashion nocturnal study captured on deserted city streets following torrential rain, showcasing Saint Laurent Haute Couture through high-contrast sculptural lighting.",
    story:
      "Shot exclusively during twilight and night, we used tungsten Fresnel units diffused through heavy sailcloth and vintage 1970s Canon K35 primes. The 4:3 aspect ratio forces verticality and geometric tension into every couture silhouette.",
    heroVideo: "/videos/video-three.mp4",
    previewVideo: "/videos/video-three.mp4",
    posterImage:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop",
    featured: true,
    featuredOrder: 3,
    specs: {
      camera: "ARRI Alexa Mini LF",
      lenses: "Canon K35 Primes (24mm, 35mm, 55mm T1.5)",
      aspectRatio: "4:3 Classic Academy",
      format: "4.5K Open Gate ProRes 4444 XQ",
      colorist: "Mick Vincent (The Mill)",
      location: "Place Vendôme, Paris",
      fps: "24 fps",
      shutter: "180°",
      iso: "1280 EI",
    },
    credits: [
      { role: "Director & DP", name: "Kamso Nondi" },
      { role: "Stylist", name: "Camille Seydoux" },
      { role: "Model", name: "Sora Choi" },
      { role: "Gaffer", name: "Jean-Luc Moreau" },
      { role: "Colorist", name: "Mick Vincent" },
    ],
    stills: [],
  },
  {
    id: "proj-4",
    slug: "echoes-of-reverie",
    title: "ECHOES OF REVERIE",
    client: "Sony Music / ODESZA",
    category: "AI Video",
    extraCategories: ["Social"],
    year: 2024,
    duration: "00:27",
    aspectRatio: "16:9",
    role: "Director & Cinematographer",
    tagline:
      "A synesthetic dreamscape translating rhythmic pulse into luminous desert storms.",
    synopsis:
      "An ethereal narrative music video following two wanderers in an infinite white gypsum desert as electromagnetic phenomena materialize sound into kinetic luminescence.",
    story:
      "We photographed the music video on 16mm Kodak Vision3 film stock pushed one stop in development. Combining analog chemical grain with contemporary computer-controlled LED matrix lighting allowed us to produce an unrepeatable hybrid aesthetic of vintage softness and hyper-modern precision.",
    heroVideo: "/videos/video-one.mp4",
    previewVideo: "/videos/video-one.mp4",
    posterImage: "/images/video-four.jpeg",
    featured: false,
    specs: {
      camera: "ARRIFLEX 416 16mm & ARRI Alexa Mini LF",
      lenses: "Zeiss Super Speed Mk III 16mm primes",
      aspectRatio: "16:9",
      format: "Super 16mm Kodak Vision3 250D (7207)",
      colorist: "Ricky Gausis (TRAFIK)",
      location: "White Sands, New Mexico",
      fps: "24 fps / 48 fps",
      shutter: "180° / 45°",
      iso: "250 / 500",
    },
    credits: [
      { role: "Director & DP", name: "Kamso Nondi" },
      { role: "Label Exec", name: "Sarah Lin" },
      { role: "Lead Choreographer", name: "Talia Favia" },
      { role: "Colorist", name: "Ricky Gausis" },
    ],
    stills: [],
  },
  {
    id: "proj-5",
    slug: "nike-unbreakable-will",
    title: "NIKE: UNBREAKABLE WILL",
    client: "Nike Global / W&K",
    category: "Branded",
    extraCategories: ["Social"],
    year: 2023,
    duration: "01:00",
    aspectRatio: "16:9",
    role: "Director of Photography",
    tagline:
      "Every millisecond of suffering transformed into pure kinetic triumph.",
    synopsis:
      "A raw, visceral celebration of elite marathon runners conditioning in extreme high-altitude climates across the Great Rift Valley.",
    story:
      "To honor the unrelenting power of human endurance, we shot with high-speed cameras recording 1,000 frames per second alongside ultra-lightweight gimbal rigs sprinting with the athletes.",
    heroVideo: "/videos/video-two.mp4",
    previewVideo: "/videos/video-two.mp4",
    posterImage:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000&auto=format&fit=crop",
    featured: false,
    specs: {
      camera: "ARRI Alexa Mini LF & Phantom Flex4K",
      lenses: "Leitz SUMMILUX-C Primes (18mm, 25mm, 40mm, 75mm)",
      aspectRatio: "16:9",
      format: "4K RAW & 4K Phantom RAW",
      colorist: "Sofie Borup (Company 3)",
      location: "Rift Valley, Kenya",
      fps: "24 fps / 1000 fps High Speed",
      shutter: "180° / 45°",
      iso: "800 EI / 1000 EI",
    },
    credits: [
      { role: "Director", name: "Kip O'Donnell" },
      { role: "Director of Photography", name: "Kamso Nondi" },
      { role: "Colorist", name: "Sofie Borup" },
    ],
    stills: [
      {
        url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600&auto=format&fit=crop",
        caption:
          "1,000 fps Phantom Flex capture of dust dispersion on athlete footstrike.",
      },
    ],
  },
  {
    id: "proj-6",
    slug: "solitude-in-tokyo",
    title: "SOLITUDE IN TOKYO",
    client: "Independent / NHK",
    category: "Documentary",
    year: 2023,
    duration: "18:50",
    aspectRatio: "2.39:1",
    role: "Director & Cinematographer",
    tagline:
      "An intimate contemplation of isolation amidst the densest metropolis on Earth.",
    synopsis:
      "A lyrical documentary exploring the quiet lives of night-shift workers, subway conductors, and ramen masters who inhabit Tokyo between 1 AM and sunrise.",
    story:
      "Shot with low-light sensors and vintage Hawk V-Lite anamorphic lenses, 'Solitude in Tokyo' relies entirely on ambient neon signage and headlights.",
    heroVideo: "/videos/video-three.mp4",
    previewVideo: "/videos/video-three.mp4",
    posterImage:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2000&auto=format&fit=crop",
    featured: false,
    specs: {
      camera: "Sony Venice 2 (8.6K Sensor)",
      lenses: "Hawk V-Lite 1.3x Anamorphic (35mm, 55mm, 110mm)",
      aspectRatio: "2.39:1 Anamorphic",
      format: "8.6K 16-bit X-OCN XT",
      colorist: "Kamso Nondi & Yuta Tanaka",
      location: "Shinjuku & Shibuya, Tokyo, Japan",
      fps: "24 fps",
      shutter: "180°",
      iso: "3200 Dual Base ISO",
    },
    credits: [
      { role: "Director & Cinematographer", name: "Kamso Nondi" },
      { role: "Fixer", name: "Aoi Takahashi" },
      { role: "Colorist", name: "Yuta Tanaka" },
    ],
    stills: [
      {
        url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1600&auto=format&fit=crop",
        caption:
          "Late-night Tokyo street reflection captured on Sony Venice 2.",
      },
    ],
  },
  {
    id: "proj-7",
    slug: "apple-shadow-and-reflection",
    title: "APPLE: SHADOW & REFLECTION",
    client: "Apple / TBWA",
    category: "Branded",
    year: 2024,
    duration: "01:15",
    aspectRatio: "16:9",
    role: "Director of Photography",
    tagline:
      "Exploring architectural minimalism and organic light interaction.",
    synopsis:
      "A visual showcase of hardware design set in an iconic brutalist concrete pavilion overlooking the Pacific ocean.",
    story:
      "We utilized motorized motion control rigs combined with custom glass beam splitters to weave seamless reflections of natural sunlight.",
    heroVideo: "/videos/video-one.mp4",
    previewVideo: "/videos/video-one.mp4",
    posterImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    featured: false,
    specs: {
      camera: "ARRI Alexa Mini LF",
      lenses: "ARRI Master Macro 100mm & Tribe7 Blackwing7",
      aspectRatio: "16:9",
      format: "4.5K ARRIRAW",
      colorist: "Dave Hussey (Company 3)",
      location: "Big Sur, California",
      fps: "24 fps / 60 fps",
      shutter: "180°",
      iso: "800 EI",
    },
    credits: [
      { role: "Director", name: "Sebastian Edwards" },
      { role: "Director of Photography", name: "Kamso Nondi" },
      { role: "Colorist", name: "Dave Hussey" },
    ],
    stills: [
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
        caption: "Concrete architecture shadow transition.",
      },
    ],
  },
  {
    id: "proj-8",
    slug: "balenciaga-genesis-01",
    title: "BALENCIAGA: GENESIS 01",
    client: "Balenciaga Paris",
    category: "Fashion",
    year: 2023,
    duration: "02:40",
    aspectRatio: "2.39:1",
    role: "Director & Cinematographer",
    tagline: "Post-apocalyptic brutalism meets avant-garde tailoring.",
    synopsis:
      "A conceptual runway film staging models within a decommissioned industrial tower flooded with shallow black water.",
    story:
      "Captured on 35mm motion picture film using 500 ASA tungsten stock exposed under monolithic stadium lighting banks.",
    heroVideo: "/videos/video-two.mp4",
    previewVideo: "/videos/video-two.mp4",
    posterImage:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop",
    featured: false,
    specs: {
      camera: "Arricam ST 35mm 4-Perf",
      lenses: "Cooke Anamorphic /i Special Flare (40mm, 75mm, 100mm)",
      aspectRatio: "2.39:1 Anamorphic",
      format: "35mm Kodak Vision3 500T (5219)",
      colorist: "Mathieu Caplanne",
      location: "Charleroi, Belgium",
      fps: "24 fps",
      shutter: "180°",
      iso: "500 ASA",
    },
    credits: [
      { role: "Director & Cinematographer", name: "Kamso Nondi" },
      { role: "Colorist", name: "Mathieu Caplanne" },
    ],
    stills: [
      {
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop",
        caption: "Volumetric fog illuminated by overhead crane array.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99));
}

export function getNextProject(currentSlug: string): Project {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === projects.length - 1) {
    return projects[0];
  }
  return projects[currentIndex + 1];
}
