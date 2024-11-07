interface ErrorProps {
  error: string;
}

export default function Error({ error }: ErrorProps) {
  return <p className="text-center text-3xl text-red-600">{error}</p>;
}
