import Loader from 'react-loader-spinner';

export default function LoadingPage() {
  return (
    <div className="spinner">
      <Loader
        type="Oval"
        color="#71869a"
        height={60}
        width={60}
      />
      <style jsx>{`
          .spinner {
            display: flex;
                align-items: center;
                justify-content: center;
                min-height: 180px;
                margin-top: 1em;
          }
        `}</style>
    </div>
  )
}
