import { CalendarDays } from 'lucide-react';
import { Disciplina, Serie, Bimestre } from '@/lib/dados';

interface Props {
  disciplina: Disciplina;
  serie: Serie;
  bimestre: Bimestre;
}

export default function CronogramaSemanal({ disciplina, serie, bimestre }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <CalendarDays className="w-6 h-6 text-brand-medium" />
        <h3 className="text-xl font-bold text-brand-dark">
          Cronograma Semanal
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-brand-dark text-white">
              <th className="px-4 py-3 text-left font-semibold rounded-tl-lg">Semana</th>
              <th className="px-4 py-3 text-left font-semibold">Período</th>
              <th className="px-4 py-3 text-left font-semibold">Tema</th>
              <th className="px-4 py-3 text-left font-semibold rounded-tr-lg">Materiais</th>
            </tr>
          </thead>
          <tbody>
            {bimestre.semanas.map((semana, idx) => (
              <tr key={semana.numero} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-3 font-bold text-brand-medium">
                  {semana.numero}ª
                </td>
                <td className="px-4 py-3 text-gray-600">{semana.periodo}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{semana.titulo}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 bg-brand-light/10 text-brand-medium px-3 py-1 rounded-full text-xs font-semibold">
                    {semana.materiais.length} {semana.materiais.length === 1 ? 'material' : 'materiais'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
