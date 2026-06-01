import { NextResponse } from 'next/server';

// OAuth callback handler for Supabase Auth
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    // In production, exchange code for session via Supabase
    // const supabase = await createClient();
    // await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL(next, request.url));
}
