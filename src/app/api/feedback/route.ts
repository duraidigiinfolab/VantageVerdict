import { NextResponse } from 'next/server';

// POST: Submit feedback
export async function POST(request: Request) {
  try {
    const { subject, message, category, userId } = await request.json();

    if (!subject || !message) {
      return NextResponse.json({ error: 'Subject and message are required' }, { status: 400 });
    }

    // TODO: Implement with Supabase
    // Also create an in-app notification for admins
    return NextResponse.json({
      success: true,
      feedback: {
        id: 'new-feedback',
        subject,
        message,
        category: category || 'general',
        user_id: userId || null,
        status: 'new',
        created_at: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
