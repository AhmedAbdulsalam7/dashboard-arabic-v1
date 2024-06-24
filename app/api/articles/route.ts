// // pages/api/articles/index.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    console.log('error in authintication');
  } else {
    console.log('is authorized...');
  }
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: true,
      },
    });
    // return NextResponse.json(articles);
        return new NextResponse(JSON.stringify(articles), {
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from all origins
        'Access-Control-Allow-Methods': 'GET, OPTIONS', // Allow GET and OPTIONS methods
      }})
  } catch (error) {
    console.error('Error fetching articles:', error);
    return new NextResponse('Error fetching articles', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
    if (!session?.user) {
      console.log('error in authintication');
    }
  try {
    const { title, content, authorId } = await req.json();
    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    return new NextResponse(JSON.stringify(article), { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return new NextResponse('Error creating article', { status: 500 });
  }
}

// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';
// import { auth } from '@/auth';

// export async function GET(req: NextRequest) {
//   const session = await auth();
//   if (!session?.user) {
//     console.log('error in authentication');
//     return new NextResponse('Unauthorized', { status: 401 });
//   } else {
//     console.log('is authorized...');
//   }

//   try {
//     const articles = await prisma.article.findMany({
//       include: {
//         author: true,
//       },
//     });
//     return new NextResponse(JSON.stringify(articles), {
//       headers: {
//         'Access-Control-Allow-Origin': '*', // Allow requests from all origins
//         'Access-Control-Allow-Methods': 'GET, OPTIONS', // Allow GET and OPTIONS methods
//       },
//     });
//   } catch (error) {
//     console.error('Error fetching articles:', error);
//     return new NextResponse('Error fetching articles', { status: 500 });
//   }
// }

// export async function POST(req: NextRequest) {
//   const session = await auth();
//   if (!session?.user) {
//     console.log('error in authentication');
//     return new NextResponse('Unauthorized', { status: 401 });
//   }

//   try {
//     const { title, content, authorId } = await req.json();
//     const article = await prisma.article.create({
//       data: {
//         title,
//         content,
//         authorId,
//       },
//     });
//     return new NextResponse(JSON.stringify(article), {
//       status: 201,
//       headers: {
//         'Access-Control-Allow-Origin': '*', // Allow requests from all origins
//         'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allow POST and OPTIONS methods
//       },
//     });
//   } catch (error) {
//     console.error('Error creating article:', error);
//     return new NextResponse('Error creating article', { status: 500 });
//   }
// }

