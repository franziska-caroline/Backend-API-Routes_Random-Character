import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export default function HomePage() {
  const { data, error, isLoading } = useSWR("/api/random-character", fetcher);

  console.log(data);
  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>loading...</p>;

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <>
      <h1>
        {data.firstName} {data.lastName}
      </h1>
      <p>
        {data.age} / {data.profession}
      </p>
    </>
  );
}
