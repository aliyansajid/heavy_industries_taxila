import React from "react";

type SearchCardProps = {
  id: string;
  subject: string;
  reference: string;
  onClick?: () => void;
};

const SearchCard: React.FC<SearchCardProps> = ({
  id,
  subject,
  reference,
  onClick,
}) => {
  return (
    <div className="border p-4 rounded" onClick={onClick}>
      <h3 className="font-bold">{subject}</h3>
      <p>Reference: {reference}</p>
    </div>
  );
};

export default SearchCard;
