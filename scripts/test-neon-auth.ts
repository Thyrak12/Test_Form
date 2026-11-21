import { createAuthClient } from "@neon/auth";

async function main() {
  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  console.log("Using NEON_AUTH_BASE_URL:", !!baseUrl);

  const client = createAuthClient(baseUrl!, {
    fetchOptions: {
      headers: {
        Origin: "http://localhost:3000",
      },
    },
  });

  const testEmail = `admin_test_${Date.now()}@example.com`;
  const testPassword = `Pass_${Date.now()}!Aa`;
  const testName = "Admin User";

  console.log("Signing up user:", testEmail);
  const { data: signUpData, error: signUpError } = await client.signUp.email({
    email: testEmail,
    password: testPassword,
    name: testName,
  });

  if (signUpError) {
    console.error("Sign up error:", signUpError);
    process.exit(1);
  }

  console.log("Sign up successful! Created user:", {
    id: signUpData?.user?.id,
    email: signUpData?.user?.email,
    name: signUpData?.user?.name,
  });

  console.log("Signing in to verify session and user read-back...");
  const { data: signInData, error: signInError } = await client.signIn.email({
    email: testEmail,
    password: testPassword,
  });

  if (signInError) {
    console.error("Sign in error:", signInError);
    process.exit(1);
  }

  console.log("Sign in successful! Read user back:", {
    id: signInData?.user?.id,
    email: signInData?.user?.email,
    name: signInData?.user?.name,
  });

  console.log("\nALL AUTH CHECKS PASSED WITH REAL NEON USER! 🎉");
}

main().catch(console.error);
