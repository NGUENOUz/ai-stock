import { NextRequest, NextResponse } from 'next/server';

// Mock comments
const MOCK_COMMENTS = [
  {
    id: 'c1',
    promptId: 'p1',
    content: 'Excellent prompt ! Les résultats sont incroyables avec Sora.',
    author: {
      id: 'user-1',
      name: 'Marie Dupont',
      avatar: 'https://i.pravatar.cc/150?u=20'
    },
    createdAt: new Date('2024-02-10')
  },
  {
    id: 'c2',
    promptId: 'p1',
    content: 'Quelqu\'un a testé avec une autre ville ?',
    author: {
      id: 'user-2',
      name: 'Jean Martin',
      avatar: 'https://i.pravatar.cc/150?u=21'
    },
    createdAt: new Date('2024-02-11')
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // TODO: Fetch from database
  // const comments = await prisma.comment.findMany({
  //   where: { promptId: id },
  //   include: { author: true },
  //   orderBy: { createdAt: 'desc' }
  // });

  const comments = MOCK_COMMENTS.filter(c => c.promptId === id);
  
  return NextResponse.json({ comments });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { content } = await request.json();

    // TODO: Vérifier l'authentification
    // const session = await getServerSession();
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // TODO: Créer le commentaire
    // const comment = await prisma.comment.create({
    //   data: {
    //     content,
    //     promptId: id,
    //     authorId: session.user.id
    //   },
    //   include: { author: true }
    // });

    // TODO: Incrémenter le compteur de commentaires
    // await prisma.prompt.update({
    //   where: { id },
    //   data: { comments: { increment: 1 } }
    // });

    const mockComment = {
      id: `c-${Date.now()}`,
      promptId: id,
      content,
      author: {
        id: 'mock-user',
        name: 'Utilisateur Test',
        avatar: 'https://i.pravatar.cc/150?u=99'
      },
      createdAt: new Date()
    };

    return NextResponse.json({ 
      success: true,
      comment: mockComment 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout du commentaire' },
      { status: 500 }
    );
  }
}
