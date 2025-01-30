interface CardProps {
  title: string;
  transparentBackground?: boolean;
  values: string[];
}

export function Card({
  values,
  transparentBackground = false,
  title,
}: CardProps) {
  return (
    <div className="relative p-[2px] rounded-2xl w-full">
      {/* Camada de borda gradient */}
      <div
        className={`
          absolute inset-0 rounded-2xl bg-gradient-to-b from-azul-start to-azul-end transition-all duration-300
          pointer-events-none
        `}
      />

      {/* Conteúdo interno */}
      <div
        className={`
          relative 
          ${transparentBackground ? " bg-white/90" : "bg-white"} 
          rounded-2xl 
          p-4 
          flex
          flex-col
          w-full
          items-center 
          gap-4 
          border-2 
          border-transparent
          transition-all duration-300
        `}
      >
        {/* Título responsivo */}
        <h2
          className="text-xl sm:text-2xl lg:text-3xl font-montserrat font-semibold leading-7 sm:leading-8 lg:leading-9 text-black text-center"
        >
          {title}
        </h2>

        {/* Lista de valores */}
        <ul className="flex flex-col items-center justify-center gap-3 sm:gap-4 list-none">
          {values.map((value) => (
            <li
              key={value}
              className="flex items-center text-center gap-2 font-montserrat text-secondary text-sm sm:text-base lg:text-lg"
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
