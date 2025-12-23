import { createContext, useState, ReactNode } from "react";

interface FormDataContextType {
  faculty: number;
  setFaculty: (value: number) => void;
  major: number
  setMajor: (value: number) => void;
  year: number;
  setYear: (value: number) => void;
  uni:number;
  setUni:(value:number)=>void;
  slot:string;
  setSlot:(value:string)=>void

}

export const FormDataContext = createContext<FormDataContextType>({
  faculty:0,
  setFaculty: () => {},
  major: 0,
  setMajor: () => {},
  year: 0,
  setYear: () => {},
  uni:0,
  setUni:()=>{},
  slot:'',
  setSlot:()=>{}

});

export function FormDataProvider({ children }: { children: ReactNode }) {
  const [faculty, setFaculty] = useState(0);
  const [major, setMajor] = useState(0);
  const [year, setYear] = useState(0);
  const [uni,setUni]=useState(0);
  const[slot,setSlot]=useState('');

  return (
    <FormDataContext.Provider
      value={{ faculty, setFaculty
        , major, setMajor
        , year, setYear,
        uni,setUni,slot,setSlot
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
}
