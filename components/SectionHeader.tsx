"use client";

const SectionHeader = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between h-[69px] px-4 lg:px-8 border-b border-border-primary">
      <h1 className="text-2xl font-medium">{title}</h1>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
};

export default SectionHeader;
