import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // TODO: Vérifier l'authentification
    // const session = await getServerSession();
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // TODO: Toggle like/unlike
    // const existing = await prisma.like.findUnique({
    //   where: { userId_promptId: { userId: session.user.id, promptId: id } }
    // });

    // if (existing) {
    //   await prisma.like.delete({ where: { id: existing.id } });
    //   await prisma.prompt.update({
    //     where: { id },
    //     data: { likes: { decrement: 1 } }
    //   });
    //   return NextResponse.json({ liked: false });
    // } else {
    //   await prisma.like.create({
    //     data: { userId: session.user.id, promptId: id }
    //   });
    //   await prisma.prompt.update({
    //     where: { id },
    //     data: { likes: { increment: 1 } }
    //   });
    //   return NextResponse.json({ liked: true });
    // }

    return NextResponse.json({ 
      success: true,
      liked: true 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors du like' },
      { status: 500 }
    );
  }
}
