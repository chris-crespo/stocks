type Props = {
  name: string;
  description: string | null;
}

const WatchlistHeader = ({ name, description }: Props) => (
  <div className="mb-12">
    <h3 className="text-2xl mb-4">{name}</h3>
    {description ? (
      <p>{description}</p>
    ) : (
      <p className="text-gray-400">There's no description.</p>
    )}
  </div>
)

export default WatchlistHeader
