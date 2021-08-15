import Loader from 'react-loader-spinner';

export default function LoadingPage() {
  return (
    <div className="spinner">
      <Loader
        type="Oval"
        color="#1875f0"
        height={60}
        width={60}
      />
      <style jsx>{`
          .spinner {
            display: flex;
            justify-content: center;
            margin-top: 3em;
          }
        `}</style>
    </div>
  )
}
