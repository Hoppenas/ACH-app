export interface IInput {
  value: string | undefined;
  title: string;
  type: string;
  handleChange: (value: string) => void;
}

const Input: React.FC<IInput> = ({ value, title, type, handleChange }) => {
  return (
    <div>
      <p>{title}</p>
      <input
        value={value}
        name={title}
        type={type}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
