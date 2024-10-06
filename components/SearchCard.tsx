import Link from "next/link";

const SearchCard = ({
  id,
  subject,
  reference,
  priority,
}: {
  id: string;
  subject: string;
  reference: string;
  priority: string;
}) => {
  return (
    <Link href={`/inbox/${id}`} passHref>
      <div className="cursor-pointer bg-transparent border border-border-primary rounded-md space-y-3 p-4 max-w-md hover:shadow transition-shadow duration-200">
        <h3 className="text-lg font-medium text-dark-primary">{subject}</h3>
        <p className="text-sm text-dark-secondary ">{reference}</p>
        <p className="text-sm text-dark-secondary ">{priority}</p>
      </div>
    </Link>
  );
};

export default SearchCard;
