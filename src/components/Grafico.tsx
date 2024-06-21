import { useState, useCallback, SetStateAction } from "react";
import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts";


interface GraficoProps {
    data:  any;
}

export default function Grafico({ data }: GraficoProps) {

    const [activeIndex, setActiveIndex] = useState(0);
    const handleClick = useCallback((_data: unknown, index: SetStateAction<number>) => {
      setActiveIndex(index);
    }, []);
  
    const activeItem = data[activeIndex];

  return (
    <>
      <div>
        <ResponsiveContainer height={100}>
          <BarChart data={data}>
            <Bar dataKey="uv" onClick={handleClick}>
              {data.map((entry: unknown, index: number) => (
                <Cell
                  cursor="pointer"
                  fill={index === activeIndex ? "#82ca9d" : "#7582ff"}
                  key={`cell-${index}`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p>Avaliacao de <strong>{activeItem?.name}</strong>: <strong>{activeItem?.uv}</strong></p>
      </div>
    </>
  );
}
