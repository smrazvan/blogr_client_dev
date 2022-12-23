import Chip from "@mui/material/Chip";
import TInterest from "../../types/models/TInterest";
import { useNavigate } from "react-router-dom";

type RenderInterests = {
  interests: TInterest[];
};
const RenderInterests = (props: RenderInterests) => {
  const navigate = useNavigate();
  const { interests } = props;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate("/");
  };
  {
    interests.map((interest: TInterest) => {
      return (
        <Chip
          onClick={(e) => handleClick(e)}
          label={interest.name}
          color="primary"
          variant="outlined"
        />
      );
    });
  }
};

export default RenderInterests;
