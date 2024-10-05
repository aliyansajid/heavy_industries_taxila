import AuthForm from "@/components/forms/AuthForm";

const Login = () => {
  return (
    <main className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/2 flex items-center justify-center">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Heavy Industries Taxila
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Heavy Industries Taxila has played a pivotal role in
                strengthening the defense capabilities of Pakistan, ensuring
                reliability and innovation in every product delivered.&rdquo;
              </p>
              <footer className="text-sm">
                General Headquarters, Pakistan Army
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto py-20 px-8">
          <AuthForm />
        </div>
      </div>
    </main>
  );
};

export default Login;
