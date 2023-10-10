import ClipLoader from "react-spinners/ClipLoader";

export default function Loader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <ClipLoader
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
