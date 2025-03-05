import "./Loading.css";

const Loading: React.FC = () => {

  return (
    <div className="fixed inset-0 flex items-center justify-center loading bg-opacity-50 z-50">
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
