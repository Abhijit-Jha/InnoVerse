import React from "react";
interface InputTypes {
  label: string;
  type: string;
  placeholder: string;
  onChange : (e:React.ChangeEvent<HTMLInputElement>)=>void;
  error? : string,
  value? : string
}
const Input = ({ label, type, placeholder,onChange,error,value }: InputTypes) => {
  return (
    <div className="mb-6">
      <label htmlFor={label}>{label}</label>
        <br/>
      <input type={type} placeholder={placeholder ?? ""} id={label} value={value} className="w-full h-12 p-4 border-slate-500 border-2 rounded-md" onChange={onChange} ></input>
      <p className="text-red-600">{error}</p>
    </div>
  );
};

export default Input;
