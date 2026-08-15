import { NextRequest, NextResponse } from 'next/server';

// Mock data - À remplacer par Supabase/Prisma
const MOCK_PROMPTS = [
  {
    id: 'p1',
    title: 'Sora : Cyber-Douala 2077',
    content: 'Drone shot of Douala port in 2077, flying taxis, neon lights reflecting on Wouri river, ultra-realistic, cinematic lighting, 8K resolution...',
    category: 'Vidéo',
    sector: 'Art',
    tool: 'Sora',
    type: 'Video',
    mediaUrl: 'https://cdn.pixabay.com/video/2023/10/20/185808-876542784_tiny.mp4',
    authorId: 'sophie-martin',
    author: {
      id: 'sophie-martin',
      name: 'Sophie Martin',
      avatar: 'https://picsum.photos/200/200?random=10',
      points: 4500,
      verified: true
    },
    stats: { copies: 1200, likes: 850, comments: 42, views: 15000 },
    tags: ['Cyberpunk', 'Africa', 'Futuristic'],
    variables: [],
    createdAt: new Date('2024-01-15'),
    status: 'published'
  },
  {
    id: 'p2',
    title: 'Analyseur Juridique OHADA',
    content: 'Analyse ce contrat de [Type_Contrat] selon les normes OHADA en vigueur au [Pays]. Identifie les clauses non conformes, propose des corrections et évalue les risques juridiques...',
    category: 'Productivité',
    sector: 'Juridique',
    tool: 'Claude 3.5',
    type: 'Text',
    mediaUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800',
    authorId: 'maitre-ai',
    author: {
      id: 'maitre-ai',
      name: 'Maître AI',
      avatar: 'https://i.pravatar.cc/150?u=10',
      points: 3200,
      verified: true
    },
    stats: { copies: 2100, likes: 940, comments: 56, views: 8000 },
    tags: ['Droit', 'Business', 'OHADA'],
    variables: ['Type_Contrat', 'Pays'],
    createdAt: new Date('2024-01-20'),
    status: 'published'
  },
  {
    id: 'p3',
    title: 'Logo Minimaliste Luxury',
    content: 'Minimalist logo for a [Industrie] brand, vector, symmetrical, golden ratio, white background, professional, elegant, modern design, high contrast...',
    category: 'Image',
    sector: 'Design',
    tool: 'Midjourney',
    type: 'Image',
    mediaUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800',
    authorId: 'king-art',
    author: {
      id: 'king-art',
      name: 'KingArt',
      avatar: 'https://i.pravatar.cc/150?u=3',
      points: 8900,
      verified: true
    },
    stats: { copies: 12400, likes: 5200, comments: 310, views: 45000 },
    tags: ['Logo', 'Minimalist', 'Branding'],
    variables: ['Industrie'],
    createdAt: new Date('2024-01-10'),
    status: 'published'
  },
  {
    id: 'p4',
    title: 'Expert Python Refactor',
    content: 'Optimise cette fonction [Nom_Fonction] pour réduire la complexité de O(n²) à O(log n). Explique les changements, ajoute des tests unitaires et documente le code...',
    category: 'Développement',
    sector: 'Tech',
    tool: 'GPT-4',
    type: 'Code',
    mediaUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800',
    authorId: 'dev-genie',
    author: {
      id: 'dev-genie',
      name: 'DevGénie',
      avatar: 'https://i.pravatar.cc/150?u=15',
      points: 1200,
      verified: false
    },
    stats: { copies: 540, likes: 120, comments: 12, views: 3000 },
    tags: ['Python', 'Algorithms', 'Optimization'],
    variables: ['Nom_Fonction'],
    createdAt: new Date('2024-02-01'),
    status: 'published'
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'Tous';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  let filtered = MOCK_PROMPTS.filter(p => p.status === 'published');

  // Filtrage par recherche
  if (search) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );
  }

  // Filtrage par catégorie
  if (category !== 'Tous') {
    filtered = filtered.filter(p => p.category === category);
  }

  // Pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return NextResponse.json({
    prompts: paginated,
    pagination: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit)
    }
  });
}
