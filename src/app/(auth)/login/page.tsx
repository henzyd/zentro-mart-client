import { LoginForm } from "~/components/widgets/auth/login";

interface Props {
  searchParams: Promise<{ origin?: string }>;
}

export default async function Login({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const { origin } = resolvedParams;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-1">
        <h1 className="largeMobile:text-lg text-xl">Welcome</h1>
        <small className="largeMobile:text-xs text-center">
          Please enter your login details to continue
        </small>
      </div>
      <LoginForm origin={origin} />
    </div>
  );
}
