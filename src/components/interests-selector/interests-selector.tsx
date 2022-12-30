import Select from "react-select";
import { useGetInterestsQuery } from "../../features/api/interestsApiSlice";
import { useEffect, useState } from "react";
import TInterest from "../../types/models/TInterest";

const options: TSelectInterest[] = [
  { value: 1, label: "cook" },
  { value: 2, label: "programming" },
];
type TSelectInterest = {
  value: number;
  label: string;
};
const InterestsSelector = ({ ...field }) => {
  const { data, isLoading, isSuccess } = useGetInterestsQuery();

  const [options, setOptions] = useState<TSelectInterest[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const options = data.map((interest: TInterest) => {
        return {
          value: interest.id,
          label: interest.name.toLowerCase(),
        };
      });
      setOptions(options);
    }
  }, [data]);
  return (
    <Select
      options={options}
      isMulti
      className="basic-multi-select"
      classNamePrefix="select"
      {...field}
    />
  );
};
export default InterestsSelector;
