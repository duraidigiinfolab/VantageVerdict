import { NextResponse } from 'next/server';

// GET: Fetch comments for a post
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: 'Missing postId' }, { status: 400 });
  }

  // TODO: Implement with Supabase
  return NextResponse.json({ comments: [], total: 0 });
}

// POST: Create a new comment
export async function POST(request: Request) {
  try {
    const { postId, userId, content } = await request.json();

    if (!postId || !userId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: Implement with Supabase
    return NextResponse.json({
      success: true,
      comment: {
        id: 'new-comment',
        post_id: postId,
        user_id: userId,
        content,
        is_approved: false,
        created_at: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
