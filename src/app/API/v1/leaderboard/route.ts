import { NextResponse } from 'next/server';

const MOCK_LEADERBOARD = [
  {
    id: 'king-art',
    name: 'KingArt',
    avatar: 'https://i.pravatar.cc/150?u=3',
    points: 8900,
    verified: true,
    _count: {
      prompts: 45,
      trainings: 12,
      workflows: 8,
      followers: 3420
    }
  },
  {
    id: 'sophie-martin',
    name: 'Sophie Martin',
    avatar: 'https://picsum.photos/200/200?random=10',
    points: 4500,
    verified: true,
    _count: {
      prompts: 24,
      trainings: 8,
      workflows: 15,
      followers: 1850
    }
  },
  {
    id: 'maitre-ai',
    name: 'Maître AI',
    avatar: 'https://i.pravatar.cc/150?u=10',
    points: 3200,
    verified: true,
    _count: {
      prompts: 18,
      trainings: 6,
      workflows: 4,
      followers: 980
    }
  },
  {
    id: 'dev-genie',
    name: 'DevGénie',
    avatar: 'https://i.pravatar.cc/150?u=15',
    points: 1200,
    verified: false,
    _count: {
      prompts: 8,
      trainings: 2,
      workflows: 3,
      followers: 340
    }
  }
];

export async function GET() {
  // TODO: Fetch from database
  // const topCreators = await prisma.user.findMany({
  //   where: { role: 'contributor' },
  //   orderBy: { points: 'desc' },
  //   take: 10,
  //   include: {
  //     _count: {
  //       select: { prompts: true, trainings: true, workflows: true, followers: true }
  //     }
  //   }
  // });

  return NextResponse.json({ 
    leaderboard: MOCK_LEADERBOARD 
  });
}
