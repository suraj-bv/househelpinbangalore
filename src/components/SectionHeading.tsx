interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => (
  <div className="mb-10 text-center">
    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
    {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
  </div>
);

export default SectionHeading;
