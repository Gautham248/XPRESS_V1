interface ButtonProps {
  onClick: () => void;
  text: string;
}
 
const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 text-sm hover:bg-gray-300 transition-colors"
    >
      {text}
    </button>
  );
};
 
export default Button;