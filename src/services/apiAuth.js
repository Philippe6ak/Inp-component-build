import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullname, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullname,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

//login logic using supabase auth
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

//check if the user is logged in by checking if there is a session
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

//logout logic using supabase auth
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullname, avatar }) {
  // 1. Update password OR fullname
  let updateData;
  if (password) updateData = { password };
  if (fullname) updateData = { data: { fullname } };
  console.log(updateData);

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload avatar if there is a new one
  const fileName = `avatar-${data.user.id}-${Date.now()}-${avatar.name}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) throw new Error(uploadError.message);

  // 3. Update avatar in the user metadata with the new avatar URL if there is a new one
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError) throw new Error(updateError.message);
  return updatedUser;
}
