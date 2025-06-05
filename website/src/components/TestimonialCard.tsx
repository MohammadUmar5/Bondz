interface TestimonialCardProps {
  name: string;
  quote: string;
  avatar: string;
}

export default function TestimonialCard({
  name,
  quote,
  avatar,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 text-center">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full mx-auto" />
      <p className="text-body italic mt-2">"{quote}"</p>
      <h4 className="mt-2 font-bold text-header">{name}</h4>
    </div>
  );
}
