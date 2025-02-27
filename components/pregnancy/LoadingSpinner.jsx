export default function LoadingSpinner({ font }) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${font}`}>
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }