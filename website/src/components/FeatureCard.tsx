interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h3 className="text-lg font-bold text-header">{title}</h3>
      <p className="text-sm text-body mt-2">{description}</p>
    </div>
  );
}
