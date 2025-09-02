export default function Heading({ text, className }) {
  return (
    <div>
      <h2
        className={`text-4xl font-extrabold text-primary text-center leading-none ${className}`}
      >
        {text}
      </h2>
    </div>
  );
}
