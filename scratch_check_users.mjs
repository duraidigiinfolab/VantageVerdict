import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkUsers() {
  const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
  
  if (usersError) {
    console.error('Error fetching users:', usersError);
    return;
  }
  
  console.log('Total users:', users.users.length);
  users.users.forEach(u => {
    console.log(`- ${u.email} (Confirmed: ${!!u.email_confirmed_at})`);
  });
}

checkUsers();
