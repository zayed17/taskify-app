const AuthButton: React.FC<{ loading: boolean; text: string }> = ({ loading, text }) => {
  return (
    <button  type="submit" disabled={loading} 
      className={`bg-black text-white border-none rounded-lg w-full py-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {loading ? 'Loading...' : text}
    </button>
  );
};

export default AuthButton;
