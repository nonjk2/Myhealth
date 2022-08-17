import {useState} from 'react';

const useSnackbar = (
  initialValue: boolean
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [toggle, setToggle] = useState<boolean>(initialValue);

  return [toggle, setToggle];
};
export default useSnackbar;
