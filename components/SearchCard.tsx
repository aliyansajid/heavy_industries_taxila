type SearchCardProps = {
  id: string;
  subject: string;
  reference: string;
  onClick?: () => void;
};

const SearchCard = ({ id, subject, reference, onClick }: SearchCardProps) => {
  return (
    <div className="border p-4 rounded hover:cursor-pointer" onClick={onClick}>
      <p className="text-dark-secondary">
        <span className="text-dark-primary font-medium">Subject:</span>{" "}
        {subject}
      </p>
      <p className="text-dark-secondary">
        <span className="text-dark-primary font-medium">Reference:</span>{" "}
        {reference}
      </p>
    </div>
  );
};

export default SearchCard;
