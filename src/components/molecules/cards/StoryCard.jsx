/**
 * StoryCard Molecule - Card de história/galeria
 */
const StoryCard = ({
  id,
  title,
  category,
  image,
  icon: Icon,
  color,
  isWide = false,
  selectedId,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`
        group cursor-pointer relative rounded-2xl overflow-hidden 
        hover-lift bg-white shadow-sm border border-stone-100
        ${isWide ? 'md:col-span-2 lg:col-span-2' : ''}
        ${className}
      `}
      onClick={() => onClick(id)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{
            viewTransitionName: selectedId === null ? `story-img-${id}` : ''
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        <div className="absolute bottom-4 left-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-1">
            {Icon && <Icon size={16} className="text-gold-light" />}
            <span className="text-xs font-medium uppercase tracking-wider text-gold-light">
              {category}
            </span>
          </div>
          <h3 className="text-xl font-serif font-medium">{title}</h3>
        </div>
      </div>
    </div>
  )
}

export default StoryCard
