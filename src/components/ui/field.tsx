import { rootStyle } from "./field.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Field: React.FC<Props> = (props) => {
  return <input {...props} className={rootStyle} />;
};
