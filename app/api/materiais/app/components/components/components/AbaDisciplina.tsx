import { FileText, Video, File, ExternalLink } from 'lucide-react';
import { Disciplina, Serie, Bimestre } from '@/lib/dados';

interface Props {
  disciplina: Disciplina;
  serie: Serie;
  bimestre: Bimestre;
  search: string;
}

export default function AbaDisciplina({ disciplina, serie, bimestre, search }: Props) {
  const semanasFiltradas = bimestre.semanas.filter(semana => {
    if (!search) return true;
    const termo = search.toLowerCase();
    return (
      semana.titulo.toLowerCase().includes(termo) ||
      semana.materiais.some(m => m.nome.toLowerCase().includes(termo))
    );
  });

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'pdf': return <FileText className="w-4 h-4 text-red-500" />;
      case 'video': return <Video className="w-4 h-4 text-blue-500" />;
      case 'doc': return <File className="w-4 h-4 text-green-500" />;
      default: return <ExternalLink className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-brand-dark">
          {disciplina.nome} — {serie.nome}
        </h2>
        <span className="bg-brand-light text-white px-4 py-1 rounded-full text-sm font-semibold">
          {bimestre.nome}
        </span>
      </div>

      {semanasFiltradas.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">Nenhum material encontrado para esta busca.</p>
        </div>
      ) : (
        semanasFiltradas.map(semana => (
          <div key={semana.numero} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-brand-dark text-white px-6 py-3 flex items-center justify-between">
              <h3 className="font-bold">Semana {semana.numero}</h3>
              <span className="text-sm text-brand-light">{semana.periodo}</span>
            </div>
            <div className="p-6">
              <h4 className="font-semibold text-brand-dark mb-4">{semana.titulo}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {semana.materiais.map((material, idx) => (
                  <a
                    key={idx}
                    href={material.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-brand-medium hover:bg-gray-50 transition-all group"
                  >
                    {getIcon(material.tipo)}
                    <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-brand-dark">
                      {material.nome}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-brand-medium" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
